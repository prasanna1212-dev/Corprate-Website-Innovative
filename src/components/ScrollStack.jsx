import { useLayoutEffect, useRef, useCallback, useState } from 'react';
import Lenis from 'lenis';
import '../styles/ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance      = 100,
  itemScale         = 0.03,
  itemStackDistance = 30,
  stackPosition     = '20%',
  scaleEndPosition  = '10%',
  baseScale         = 0.85,
  scaleDuration     = 0.5,
  rotationAmount    = 0,
  blurAmount        = 0,
  useWindowScroll   = false,
  onStackComplete,
}) => {
  const scrollerRef        = useRef(null);
  const stackCompletedRef  = useRef(false);
  const animFrameRef       = useRef(null);
  const lenisRef           = useRef(null);
  const cardsRef           = useRef([]);
  const lastTransformsRef  = useRef(new Map());
  const isUpdatingRef      = useRef(false);

  /* ── track whether stack is done so wheel/touch can escape ── */
  const [stackDone, setStackDone] = useState(false);
  const stackDoneRef = useRef(false);

  const markDone = useCallback(() => {
    if (!stackDoneRef.current) {
      stackDoneRef.current = true;
      setStackDone(true);
      onStackComplete?.();
    }
  }, [onStackComplete]);

  const markUndone = useCallback(() => {
    if (stackDoneRef.current) {
      stackDoneRef.current = false;
      setStackDone(false);
    }
  }, []);

  /* ── helpers ── */
  const calcProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end)   return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePct = useCallback((val, h) =>
    typeof val === 'string' && val.includes('%')
      ? (parseFloat(val) / 100) * h
      : parseFloat(val),
  []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) return {
      scrollTop: window.scrollY,
      containerHeight: window.innerHeight,
    };
    const s = scrollerRef.current;
    return { scrollTop: s.scrollTop, containerHeight: s.clientHeight };
  }, [useWindowScroll]);

  const getOffset = useCallback(el => {
    if (useWindowScroll) return el.getBoundingClientRect().top + window.scrollY;
    return el.offsetTop;
  }, [useWindowScroll]);

  /* ── core transform ── */
  const updateCards = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPx    = parsePct(stackPosition,    containerHeight);
    const scaleEndPx = parsePct(scaleEndPosition, containerHeight);

    const endEl = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');
    const endTop = endEl ? getOffset(endEl) : 0;

    let topCardIndex = 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardTop    = getOffset(card);
      const trigStart  = cardTop - stackPx    - itemStackDistance * i;
      const trigEnd    = cardTop - scaleEndPx;
      const pinStart   = trigStart;
      const pinEnd     = endTop - containerHeight / 2;

      const scaleP  = calcProgress(scrollTop, trigStart, trigEnd);
      const tgtScale = baseScale + i * itemScale;
      const scale    = 1 - scaleP * (1 - tgtScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleP : 0;

      if (scrollTop >= pinStart) topCardIndex = i;

      let blur = 0;
      if (blurAmount && i < topCardIndex) {
        blur = Math.max(0, (topCardIndex - i) * blurAmount);
      }

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd  - cardTop + stackPx + itemStackDistance * i;
      }

      const nT = {
        translateY: Math.round(translateY * 100) / 100,
        scale:      Math.round(scale      * 1000) / 1000,
        rotation:   Math.round(rotation   * 100) / 100,
        blur:       Math.round(blur       * 100) / 100,
      };
      const lT = lastTransformsRef.current.get(i);
      const changed = !lT
        || Math.abs(lT.translateY - nT.translateY) > 0.1
        || Math.abs(lT.scale      - nT.scale)      > 0.001
        || Math.abs(lT.rotation   - nT.rotation)   > 0.1
        || Math.abs(lT.blur       - nT.blur)        > 0.1;

      if (changed) {
        card.style.transform = `translate3d(0,${nT.translateY}px,0) scale(${nT.scale}) rotate(${nT.rotation}deg)`;
        card.style.filter    = nT.blur > 0 ? `blur(${nT.blur}px)` : '';
        lastTransformsRef.current.set(i, nT);
      }

      /* last card — detect stack complete / incomplete */
      if (i === cardsRef.current.length - 1) {
        const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (inView)  markDone();
        else         markUndone();
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale, itemStackDistance, stackPosition, scaleEndPosition,
    baseScale, rotationAmount, blurAmount, useWindowScroll,
    calcProgress, parsePct, getScrollData, getOffset,
    markDone, markUndone,
  ]);

  /* ── wheel handler: pass-through when stack is done ── */
  const onWheel = useCallback((e) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
    const atTop    = scroller.scrollTop <= 0;
    const goingDown = e.deltaY > 0;
    const goingUp   = e.deltaY < 0;

    /* If stack is fully stacked AND user scrolls down → pass to window */
    if (stackDoneRef.current && goingDown) {
      e.preventDefault();
      window.scrollBy({ top: e.deltaY, behavior: 'auto' });
      return;
    }

    /* If at top of inner scroller AND user scrolls up → pass to window */
    if (atTop && goingUp) {
      e.preventDefault();
      window.scrollBy({ top: e.deltaY, behavior: 'auto' });
      return;
    }

    /* Otherwise let Lenis handle it */
    if (lenisRef.current) {
      lenisRef.current.scrollTo(
        scroller.scrollTop + e.deltaY * (lenisRef.current.options.wheelMultiplier || 1),
        { immediate: false }
      );
    }
    e.preventDefault();
  }, []);

  /* ── touch pass-through ── */
  const touchStartY = useRef(0);
  const onTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchMove = useCallback((e) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const dy       = touchStartY.current - e.touches[0].clientY;
    const atTop    = scroller.scrollTop <= 0;
    const goingUp  = dy < 0;
    const goingDown = dy > 0;

    if (stackDoneRef.current && goingDown) {
      e.preventDefault();
      window.scrollBy({ top: dy, behavior: 'auto' });
      return;
    }
    if (atTop && goingUp) {
      e.preventDefault();
      window.scrollBy({ top: dy, behavior: 'auto' });
    }
  }, []);

  /* ── Lenis setup (container-only, NOT window) ── */
  const setupLenis = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || useWindowScroll) return;

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector('.scroll-stack-inner'),
      duration:         1.2,
      easing:           t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel:      false, /* we handle wheel ourselves */
      touchMultiplier:  2,
      infinite:         false,
      lerp:             0.1,
      syncTouch:        true,
      syncTouchLerp:    0.075,
    });

    lenis.on('scroll', updateCards);

    const raf = t => { lenis.raf(t); animFrameRef.current = requestAnimationFrame(raf); };
    animFrameRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;
  }, [useWindowScroll, updateCards]);

  /* ── mount ── */
  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange         = 'transform, filter';
      card.style.transformOrigin    = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform          = 'translateZ(0)';
      card.style.perspective        = '1000px';
    });

    setupLenis();
    updateCards();

    /* Attach wheel & touch with { passive: false } so preventDefault works */
    scroller.addEventListener('wheel',      onWheel,      { passive: false });
    scroller.addEventListener('touchstart', onTouchStart, { passive: true  });
    scroller.addEventListener('touchmove',  onTouchMove,  { passive: false });

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      lenisRef.current?.destroy();
      scroller.removeEventListener('wheel',      onWheel);
      scroller.removeEventListener('touchstart', onTouchStart);
      scroller.removeEventListener('touchmove',  onTouchMove);
      stackCompletedRef.current = false;
      cardsRef.current          = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current     = false;
    };
  }, [
    itemDistance, itemScale, itemStackDistance, stackPosition,
    scaleEndPosition, baseScale, scaleDuration, rotationAmount,
    blurAmount, useWindowScroll, onStackComplete,
    setupLenis, updateCards, onWheel, onTouchStart, onTouchMove,
  ]);

  return (
    <div
      className={`scroll-stack-scroller ${stackDone ? 'stack-done' : ''} ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;