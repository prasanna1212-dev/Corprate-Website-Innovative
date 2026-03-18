import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";
import "../styles/ServicesSection.css";

import networkingImg from "../assets/services(1).png";
import wirelessImg from "../assets/services(2).png";
import firewallImg from "../assets/services(3).png";

/* -------------------- CardSwap (inline) -------------------- */

const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`card ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
  />
));
Card.displayName = "Card";

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
}) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);

  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    const total = refs.length;

    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(
          r.current,
          makeSlot(i, cardDistance, verticalDistance, total),
          skewAmount
        );
      }
    });

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front]?.current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);

      rest.forEach((idx, i) => {
        const el = refs[idx]?.current;
        if (!el) return;

        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);

        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length
      );

      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return"
      );

      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;

      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };

      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };

      node?.addEventListener("mouseenter", pause);
      node?.addEventListener("mouseleave", resume);

      return () => {
        node?.removeEventListener("mouseenter", pause);
        node?.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }

    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, refs]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          },
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

/* -------------------- Services Section -------------------- */

function ServicesSection() {
  const services = [
    {
      id: "01",
      title: "Computer Networking",
      shortTitle: "Networking",
      image: networkingImg,
      description:
        "In today’s digital world, computer networking has become an essential part of everyday life. Networking is the practice of connecting two or more computing devices so they can share data and resources efficiently. This does not always require internet access. We help connect your computers so they can work together seamlessly, perform daily tasks, and store important data in a central location. Whether it is computer-to-computer or computer-to-server communication, we troubleshoot connectivity issues and ensure every machine communicates reliably.",
    },
    {
      id: "02",
      title: "Wireless Solutions",
      shortTitle: "Wireless",
      image: wirelessImg,
      description:
        "WiFi connectivity is one of the most widely used forms of networking today. Smartphones, tablets, laptops, gaming systems, and smart devices depend on wireless networks for internet access, communication, streaming, and productivity. We troubleshoot and configure your WiFi setup to ensure your wireless devices connect smoothly and consistently. From improving signal coverage to optimizing performance for online gaming and streaming, we make your wireless experience stable, fast, and dependable.",
    },
    {
      id: "03",
      title: "Firewall & Network Security",
      shortTitle: "Security",
      image: firewallImg,
      description:
        "A firewall is a critical layer of protection for every network. Positioned between your network and the outside world, it blocks unauthorized access attempts and helps protect sensitive information from threats. If intruders gain access, private data such as emails, customer information, and internal business records may be compromised. We configure firewall protection using best practices so your infrastructure stays secure while maintaining strong network performance.",
    },
  ];

  return (
    <section className="services-page">
      <div className="services-shell">
        <div className="services-hero">
          <div className="services-hero-copy">
            <span className="services-badge">Networking Services</span>

            <h1>
              Reliable connectivity.
              <span> Stronger wireless. Smarter security.</span>
            </h1>

            <p>
              We provide complete networking solutions that keep your devices
              connected, your WiFi performing smoothly, and your systems
              protected with best-practice firewall security.
            </p>

            <div className="services-points">
              <div className="point-card">
                <strong>Centralized data sharing</strong>
                <span>Connect devices and streamline everyday operations</span>
              </div>

              <div className="point-card">
                <strong>Optimized WiFi setup</strong>
                <span>Better coverage, speed, and device connectivity</span>
              </div>

              <div className="point-card">
                <strong>Protected infrastructure</strong>
                <span>Firewall-backed defense for safer networking</span>
              </div>
            </div>
          </div>

          <div className="services-hero-visual">
            <div className="services-card-stack">
                <CardSwap
                    width={330}
                    height={410}
                    cardDistance={34}
                    verticalDistance={42}
                    delay={4000}
                    pauseOnHover={false}
                    skewAmount={4}
                    easing="elastic"
                >
                {services.map((service) => (
                  <Card key={service.id} customClass="service-swap-card">
                    <div className="service-swap-image-wrap">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="service-swap-image"
                      />
                      <div className="service-swap-overlay" />
                    </div>

                    <div className="service-swap-content">
                      <span className="service-swap-id">{service.id}</span>
                      <h3>{service.title}</h3>
                      <p>{service.shortTitle}</p>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article key={service.id} className="service-info-card">
              <div className="service-info-header">
                <span>{service.id}</span>
                <h2>{service.title}</h2>
              </div>
              <p>{service.description}</p>
            </article>
          ))}
        </div>

        <div className="services-summary">
          <h3>Complete networking support that performs at its peak</h3>
          <p>
            To sum it up, we deliver networks that perform efficiently while
            providing strong WiFi coverage, reliable connectivity, and secure
            infrastructure protection. Our goal is to configure every essential
            component for the best speeds available while ensuring your firewall
            setup delivers maximum protection.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;