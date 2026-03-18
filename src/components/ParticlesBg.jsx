import { useEffect, useRef } from "react";

const PALETTE = ["#e11d48", "#9ccedd", "#ffc5a8", "#d8ba75"];
const SHAPES  = ["circle", "triangle", "square"];

function rand(a, b) { return a + Math.random() * (b - a); }

function build(count, w, h) {
  return Array.from({ length: count }, () => ({
    x:          Math.random() * w,
    y:          Math.random() * h,
    size:       rand(2, 5),
    color:      PALETTE[Math.floor(Math.random() * PALETTE.length)],
    shape:      SHAPES[Math.floor(Math.random() * SHAPES.length)],
    vx:         rand(-0.4, 0.4),
    vy:         rand(-0.4, 0.4),
    alpha:      rand(0.35, 0.60),
    shapeTimer: Math.floor(rand(180, 420)),
    nextShape:  SHAPES[Math.floor(Math.random() * SHAPES.length)],
  }));
}

function drawShape(ctx, p) {
  ctx.globalAlpha = p.alpha;
  ctx.fillStyle   = p.color;

  switch (p.shape) {
    case "circle":
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      break;

    case "triangle": {
      const s = p.size * 1.8;
      ctx.beginPath();
      ctx.moveTo(p.x,     p.y - s);
      ctx.lineTo(p.x - s, p.y + s);
      ctx.lineTo(p.x + s, p.y + s);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case "square":
      ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
      break;
  }
}

export default function ParticlesBg({ count = 15 }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const stateRef  = useRef({ particles: [], w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width  = w;
      canvas.height = h;
      stateRef.current.w = w;
      stateRef.current.h = h;
      stateRef.current.particles = build(count, w, h);
    };

    const tick = () => {
      const { particles, w, h } = stateRef.current;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        // ── move ──
        p.x += p.vx;
        p.y += p.vy;

        // ── wrap edges ──
        if (p.x < -20)    p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20)    p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // ── shape rotation ──
        p.shapeTimer--;
        if (p.shapeTimer <= 0) {
          p.shape      = p.nextShape;
          p.nextShape  = SHAPES.filter(s => s !== p.shape)[Math.floor(Math.random() * 2)];
          p.shapeTimer = Math.floor(rand(180, 420));
        }

        // ── draw ──
        drawShape(ctx, p);
      });

      ctx.globalAlpha = 1;
      rafRef.current  = requestAnimationFrame(tick);
    };

    resize();
    tick();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [count]);

  return <canvas ref={canvasRef} className="particles-bg-canvas" />;
}