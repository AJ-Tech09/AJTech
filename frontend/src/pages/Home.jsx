import { useEffect, useMemo, useRef, useState } from "react";
// import { useMemo, useState } from "react"

import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaCode,
  FaMobileAlt,
  FaServer,
  FaGlobe,
} from "react-icons/fa";

const GOLD = "#d4af37";
const BLACK = "#050505";

function usePrefersReducedMotion() {

  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function useScrollReveal() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;

    // If reduced motion is enabled, show everything immediately.
    if (reducedMotion) {
      els.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reducedMotion]);
}


function revealStyle(index) {
  const delay = Math.min(index * 80, 520);
  return { animationDelay: `${delay}ms` };
}


function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const services = [
  {
    title: "Website Development from Scratch",
    desc: "Pixel-precise builds with modern React/Vite workflows.",
    icon: <FaGlobe size={38} />,
  },
  {
    title: "Mobile App Development from Scratch",
    desc: "Scalable mobile experiences designed for performance.",
    icon: <FaMobileAlt size={38} />,
  },
  {
    title: "Selling Mobile Applications",
    desc: "Monetize your apps with distribution-ready digital setups.",
    icon: <FaMobileAlt size={38} />,
  },
  {
    title: "Selling Website Applications",
    desc: "Launch ready web apps with deployment and maintenance.",
    icon: <FaGlobe size={38} />,
  },
  {
    title: "Backend Programming",
    desc: "Secure APIs, databases, and production-grade architecture.",
    icon: <FaServer size={38} />,
  },
  {
    title: "Frontend Programming",
    desc: "Premium UI engineering with clean components and motion.",
    icon: <FaCode size={38} />,
  },
  {
    title: "UI/UX Design",
    desc: "Futuristic layouts crafted for conversion and clarity.",
    icon: <FaCode size={38} />,
  },
  {
    title: "Web Hosting & DevOps",
    desc: "Reliable hosting, CI/CD, and smooth production operations.",
    icon: <FaServer size={38} />,
  },
];

export default function Home() {
  useScrollReveal();

  const rootRef = useRef(null);

  const socialLinks = useMemo(
    () => [

      {
        label: "Facebook",
        icon: <FaFacebook size={26} />,
        href: "https://www.facebook.com/profile.php?id=61591453822677",
      },
      {
        label: "WhatsApp",
        icon: <FaWhatsapp size={26} />,
        href: "https://wa.me/349069260318",
      },
      {
        label: "Instagram",
        icon: <FaInstagram size={26} />,
        href: "https://www.instagram.com/ajtechlimited/",
      },
      {
        label: "TikTok",
        icon: <FaTiktok size={26} />,
        href: "https://www.tiktok.com/@ajtechlimited?_r=1&_t=ZS-97RfYykw2Mf",
      },
    ],
    []
  );

  useEffect(() => {
    // Enable anchor navigation without full reload.
    const onHash = () => {
      const id = window.location.hash?.slice(1);
      if (id) scrollToId(id);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div ref={rootRef} style={{ background: BLACK, color: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        .aj-root, .aj-root * { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }

        .aj-hero {
          position: relative;
          min-height: 100svh;
          padding: 88px 24px 54px;
          overflow: hidden;
          background: radial-gradient(1200px 700px at 20% 15%, rgba(212,175,55,0.16), transparent 55%),
                      radial-gradient(900px 600px at 80% 30%, rgba(212,175,55,0.10), transparent 50%),
                      linear-gradient(180deg, #060606 0%, #050505 50%, #050505 100%);
        }

        .aj-hero:before {
          content: '';
          position: absolute;
          inset: -2px;
          background:
            radial-gradient(800px 320px at 50% 0%, rgba(212,175,55,0.13), transparent 60%),
            radial-gradient(600px 260px at 10% 70%, rgba(212,175,55,0.08), transparent 55%),
            radial-gradient(600px 260px at 90% 70%, rgba(212,175,55,0.08), transparent 55%);
          filter: blur(0px);
          pointer-events: none;
        }

        .aj-grid {
          position: absolute;
          inset: 0;
          opacity: 0.18;
          background-image:
            linear-gradient(to right, rgba(212,175,55,0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(212,175,55,0.10) 1px, transparent 1px);
          background-size: 64px 64px;
          transform: translateZ(0);
          pointer-events: none;
          mask-image: radial-gradient(circle at 50% 30%, rgba(0,0,0,1), rgba(0,0,0,0));
        }

        .aj-shape {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 999px;
          background: radial-gradient(circle at 30% 30%, rgba(212,175,55,0.34), rgba(212,175,55,0.06) 40%, transparent 70%);
          filter: blur(0px);
          opacity: 0.7;
          pointer-events: none;
        }

        .aj-shape.s1 { top: -220px; left: -140px; animation: float1 9s ease-in-out infinite; }
        .aj-shape.s2 { top: 60px; right: -190px; width: 520px; height: 520px; opacity: 0.55; animation: float2 11s ease-in-out infinite; }
        .aj-shape.s3 { bottom: -260px; left: 20%; width: 620px; height: 620px; opacity: 0.35; animation: float3 13s ease-in-out infinite; }

        @keyframes float1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,60px) scale(1.02);} }
        @keyframes float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-30px,40px) scale(1.02);} }
        @keyframes float3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-40px) scale(1.01);} }

        .aj-heroInner {
          position: relative;
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 28px;
          align-items: center;
        }

        .aj-badge {
          display: inline-flex;
          gap: 10px;
          align-items: center;
          padding: 9px 14px;
          border-radius: 999px;
          border: 1px solid rgba(212,175,55,0.35);
          background: rgba(212,175,55,0.08);
          color: ${GOLD};
          font-weight: 500;
          letter-spacing: 0.2px;
          margin-bottom: 14px;
          backdrop-filter: blur(6px);
        }

        .aj-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: ${GOLD};
          box-shadow: 0 0 22px rgba(212,175,55,0.55);
        }

        .aj-h1 {
          font-size: clamp(38px, 5.2vw, 72px);
          line-height: 1.02;
          letter-spacing: -1.2px;
          margin: 0 0 14px;
          font-weight: 600;
        }

        .aj-h1 .aj-glowText {
          color: #fff;
          text-shadow:
            0 0 28px rgba(212,175,55,0.22),
            0 0 10px rgba(212,175,55,0.25);
        }

        .aj-sub {
          color: rgba(255,255,255,0.76);
          font-size: clamp(16px, 1.55vw, 20px);
          line-height: 1.6;
          margin-bottom: 26px;
          max-width: 52ch;
        }

        .aj-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          align-items: center;
        }

        .aj-btn {
          border: 1px solid rgba(212,175,55,0.35);
          border-radius: 14px;
          padding: 14px 18px;
          font-weight: 600;
          letter-spacing: 0.2px;
          background: rgba(212,175,55,0.08);
          color: #fff;
          cursor: pointer;
          transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease, background 240ms ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-width: 180px;
          text-decoration: none;
        }

        .aj-btnPrimary {
          background: linear-gradient(180deg, rgba(212,175,55,0.22), rgba(212,175,55,0.08));
          box-shadow: 0 10px 35px rgba(212,175,55,0.10);
        }

        .aj-btn:hover {
          transform: translateY(-3px) scale(1.01);
          border-color: rgba(212,175,55,0.72);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.12), 0 16px 48px rgba(212,175,55,0.18);
        }

        .aj-micro {
          color: rgba(255,255,255,0.65);
          font-size: 13px;
          margin-top: 10px;
        }

        .aj-heroCard {
          position: relative;
          border-radius: 20px;
          border: 1px solid rgba(212,175,55,0.22);
          background: rgba(10,10,10,0.55);
          padding: 22px;
          overflow: hidden;
          backdrop-filter: blur(10px);
          box-shadow: 0 30px 90px rgba(0,0,0,0.55);
        }

        .aj-heroCard:after {
          content: '';
          position: absolute;
          inset: -50px;
          background: radial-gradient(circle at 30% 30%, rgba(212,175,55,0.25), transparent 45%),
                      radial-gradient(circle at 70% 70%, rgba(255,255,255,0.08), transparent 52%);
          transform: rotate(12deg);
          opacity: 0.9;
          pointer-events: none;
        }

        .aj-console {
          position: relative;
          border-radius: 16px;
          border: 1px solid rgba(212,175,55,0.18);
          background: rgba(0,0,0,0.35);
          padding: 14px 14px 8px;
        }

        .aj-consoleTop {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .aj-pill {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(212,175,55,0.35);
          box-shadow: 0 0 18px rgba(212,175,55,0.18);
        }

        .aj-consoleLine {
          height: 10px;
          border-radius: 8px;
          background: linear-gradient(90deg, rgba(212,175,55,0.35), rgba(212,175,55,0.05));
          margin: 10px 0;
          animation: shimmer 2.8s ease-in-out infinite;
        }
        .aj-consoleLine:nth-child(2){ width: 92%; }
        .aj-consoleLine:nth-child(3){ width: 78%; animation-delay: .25s; }
        .aj-consoleLine:nth-child(4){ width: 88%; animation-delay: .45s; }

        @keyframes shimmer {
          0%,100% { filter: brightness(1); transform: translateX(0); opacity: 0.8; }
          50% { filter: brightness(1.25); transform: translateX(10px); opacity: 1; }
        }

        .aj-statRow {
          display: grid;
          grid-template-columns: repeat(2, minmax(0,1fr));
          gap: 12px;
          margin-top: 16px;
          position: relative;
          z-index: 1;
        }

        .aj-stat {
          border-radius: 14px;
          border: 1px solid rgba(212,175,55,0.18);
          background: rgba(255,255,255,0.03);
          padding: 12px;
        }

        .aj-stat b {
          display: block;
          color: #fff;
          font-size: 18px;
          margin-bottom: 6px;
        }

        .aj-stat span {
          color: rgba(255,255,255,0.70);
          font-size: 13px;
          line-height: 1.3;
        }

        .aj-scrollIndicator {
          position: absolute;
          left: 50%;
          bottom: 18px;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.62);
          z-index: 2;
        }

        .aj-scrollText {
          font-size: 12px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
        }

        .aj-mouse {
          width: 28px;
          height: 44px;
          border-radius: 18px;
          border: 1px solid rgba(212,175,55,0.45);
          background: rgba(212,175,55,0.06);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(8px);
        }

        .aj-mouse:after {
          content: '';
          position: absolute;
          top: 10px;
          left: 50%;
          width: 5px;
          height: 9px;
          background: ${GOLD};
          border-radius: 6px;
          transform: translateX(-50%);
          animation: wheel 1.5s ease-in-out infinite;
          box-shadow: 0 0 20px rgba(212,175,55,0.35);
        }

        @keyframes wheel {
          0% { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          25% { opacity: 1; }
          60% { opacity: 1; transform: translateX(-50%) translateY(10px); }
          100% { opacity: 0; transform: translateX(-50%) translateY(18px); }
        }

        .aj-section {
          padding: 90px 24px;
          border-top: 1px solid rgba(255,255,255,0.04);
          position: relative;
        }

        .aj-sectionInner {
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          gap: 24px;
        }

        .aj-sectionTitle {
          font-size: clamp(28px, 3.2vw, 44px);
          margin: 0;
          letter-spacing: -0.8px;
          font-weight: 650;
          color: #fff;
        }

        .aj-sectionTitle .aj-accent {
          color: ${GOLD};
          text-shadow: 0 0 18px rgba(212,175,55,0.20);
        }

        .aj-lead {
          color: rgba(255,255,255,0.74);
          line-height: 1.75;
          font-size: 16px;
          max-width: 62ch;
          margin: 0;
        }

        .aj-aboutGrid {
          grid-template-columns: 1.05fr 0.95fr;
          align-items: center;
          gap: 30px;
        }

        .aj-aboutCard {
          border-radius: 20px;
          border: 1px solid rgba(212,175,55,0.18);
          background: rgba(255,255,255,0.03);
          padding: 20px;
          overflow: hidden;
          position: relative;
        }

        .aj-aboutCard:before {
          content: '';
          position: absolute;
          inset: -80px;
          background:
            radial-gradient(circle at 30% 30%, rgba(212,175,55,0.26), transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(255,255,255,0.09), transparent 55%);
          transform: rotate(-12deg);
          pointer-events: none;
          opacity: 0.75;
        }

        .aj-aboutIcon {
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: 18px;
          border: 1px solid rgba(212,175,55,0.28);
          background: rgba(212,175,55,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${GOLD};
          box-shadow: 0 0 0 4px rgba(212,175,55,0.08);
          margin-bottom: 16px;
        }

        .aj-list {
          position: relative;
          z-index: 1;
          margin-top: 14px;
          display: grid;
          gap: 10px;
        }

        .aj-li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: rgba(255,255,255,0.76);
          font-size: 14px;
          line-height: 1.5;
        }

        .aj-check {
          width: 20px;
          height: 20px;
          border-radius: 8px;
          border: 1px solid rgba(212,175,55,0.30);
          background: rgba(212,175,55,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${GOLD};
          flex: 0 0 auto;
          margin-top: 2px;
        }

        .aj-btnGold {
          background: linear-gradient(180deg, rgba(212,175,55,0.24), rgba(212,175,55,0.10));
          border-color: rgba(212,175,55,0.55);
          color: #fff;
        }

        .aj-servicesGrid {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 16px;
          margin-top: 22px;
        }

        .aj-serviceCard {
          grid-column: span 6;
          border-radius: 18px;
          border: 1px solid rgba(212,175,55,0.18);
          background: rgba(12,12,12,0.55);
          padding: 18px;
          position: relative;
          overflow: hidden;
          transform: translateY(0px) scale(1);
          opacity: 1;
          animation: none;
          transition: transform 260ms ease, border-color 260ms ease, box-shadow 260ms ease, background 260ms ease;
          backdrop-filter: blur(10px);
        }


        .aj-serviceCard:before {
          content: '';
          position: absolute;
          inset: -40px;
          background:
            radial-gradient(circle at 20% 20%, rgba(212,175,55,0.20), transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.06), transparent 55%);
          opacity: 0;
          transition: opacity 260ms ease;
          pointer-events: none;
        }

        .aj-serviceCard:hover {
          transform: translateY(-6px) scale(1.02);
          border-color: rgba(212,175,55,0.55);
          box-shadow: 0 18px 55px rgba(212,175,55,0.14);
          background: rgba(20,20,20,0.62);
        }
        .aj-serviceCard:hover:before { opacity: 1; }

        .aj-serviceIcon {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          border: 1px solid rgba(212,175,55,0.25);
          background: rgba(212,175,55,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${GOLD};
          box-shadow: 0 0 0 4px rgba(212,175,55,0.07);
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
        }

        .aj-serviceCard h3 {
          margin: 0 0 8px;
          font-size: 15px;
          line-height: 1.35;
          letter-spacing: -0.2px;
          font-weight: 650;
          color: #fff;
          position: relative;
          z-index: 1;
        }

        .aj-serviceCard p {
          margin: 0;
          color: rgba(255,255,255,0.72);
          line-height: 1.6;
          font-size: 13.5px;
          position: relative;
          z-index: 1;
        }

        .aj-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 900ms ease, transform 900ms ease;
        }

        .aj-reveal.is-revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .aj-zoomReveal {
          opacity: 0;
          transform: translateY(18px) scale(0.98);
          transition: opacity 900ms ease, transform 900ms ease;
        }
        .aj-zoomReveal.is-revealed {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .aj-socialGrid {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 18px;
        }

        .aj-socialBtn {
          border-radius: 16px;
          border: 1px solid rgba(212,175,55,0.22);
          background: rgba(212,175,55,0.08);
          color: #fff;
          padding: 12px 14px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease, background 240ms ease;
          backdrop-filter: blur(10px);
        }

        .aj-socialBtn:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(212,175,55,0.62);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.12), 0 18px 55px rgba(212,175,55,0.18);
        }

        .aj-footer {
          padding: 40px 24px 60px;
          border-top: 1px solid rgba(255,255,255,0.05);
          background: rgba(0,0,0,0.35);
        }

        .aj-footerInner {
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 18px;
          align-items: start;
        }

        .aj-footerTitle {
          font-weight: 700;
          letter-spacing: -0.4px;
          margin: 0 0 8px;
        }

        .aj-footerTitle span { color: ${GOLD}; }

        .aj-quick {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: flex-end;
        }

        .aj-quick a {
          color: rgba(255,255,255,0.76);
          border: 1px solid rgba(212,175,55,0.18);
          padding: 10px 12px;
          border-radius: 14px;
          background: rgba(255,255,255,0.03);
          transition: border-color 240ms ease, transform 240ms ease, box-shadow 240ms ease, color 240ms ease;
        }

        .aj-quick a:hover {
          color: #fff;
          border-color: rgba(212,175,55,0.62);
          transform: translateY(-3px);
          box-shadow: 0 18px 55px rgba(212,175,55,0.12);
        }

        @media (max-width: 980px) {
          .aj-heroInner { grid-template-columns: 1fr; }
          .aj-heroCard { max-width: 620px; }
          .aj-aboutGrid { grid-template-columns: 1fr; }
          .aj-footerInner { grid-template-columns: 1fr; }
          .aj-quick { justify-content: flex-start; }
          .aj-serviceCard { grid-column: span 12; }
        }

        @media (max-width: 520px) {
          .aj-actions { gap: 12px; }
          .aj-btn { min-width: 0; width: 100%; }
          .aj-hero { padding-top: 74px; }
        }
      `}</style>

      <header className="aj-hero" id="home">
        <div className="aj-grid" />
        <div className="aj-shape s1" />
        <div className="aj-shape s2" />
        <div className="aj-shape s3" />

        <div className="aj-heroInner">
          <div className="aj-heroLeft aj-reveal" data-reveal>
            <div className="aj-badge">
              <span className="aj-dot" />
              <span>Futuristic Tech Studio</span>
            </div>

            <h1 className="aj-h1">
              <span className="aj-glowText">Welcome to AJTech</span>
            </h1>

            <p className="aj-sub">We build, sell, and power modern digital solutions.</p>

            <div className="aj-actions">
              <button
                className="aj-btn aj-btnPrimary"
                onClick={() => scrollToId("services")}
              >
                Explore Services
                <span aria-hidden style={{ color: GOLD }}>
                  ▾
                </span>
              </button>
              <button
                className="aj-btn"
                onClick={() => {
                  window.location.href = "/projects";
                }}
              >
                View Projects
                <span aria-hidden style={{ color: GOLD }}>
                  ✦
                </span>
              </button>
            </div>
            <div className="aj-micro">Premium UX • Fast delivery • Reliable support</div>
          </div>

          <div className="aj-heroCard aj-zoomReveal" data-reveal>
            <div className="aj-console">
              <div className="aj-consoleTop">
                <span className="aj-pill" />
                <span className="aj-pill" style={{ opacity: 0.75 }} />
                <span className="aj-pill" style={{ opacity: 0.55 }} />
              </div>
              <div className="aj-consoleLine" style={{ width: "86%" }} />
              <div className="aj-consoleLine" />
              <div className="aj-consoleLine" />
              <div className="aj-consoleLine" />
            </div>

            <div className="aj-statRow">
              <div className="aj-stat">
                <b style={{ color: GOLD }}>99%</b>
                <span>Performance-first builds</span>
              </div>
              <div className="aj-stat">
                <b style={{ color: GOLD }}>24/7</b>
                <span>Backend & DevOps support</span>
              </div>
            </div>
          </div>
        </div>

        <button
          className="aj-scrollIndicator"
          onClick={() => scrollToId("about")}
          style={{ border: 0, background: "transparent", cursor: "pointer" }}
          aria-label="Scroll down"
        >
          <div className="aj-scrollText">Scroll</div>
          <div className="aj-mouse" />
        </button>
      </header>

      {/* ABOUT */}
      <section className="aj-section" id="about">
        <div className="aj-sectionInner aj-aboutGrid">
          <div className="aj-zoomReveal" data-reveal>
            <h2 className="aj-sectionTitle">
              About <span className="aj-accent">AJTech</span>
            </h2>
            <p className="aj-lead" style={{ marginTop: 12 }}>
              AJTech is a modern technology company dedicated to building world-class digital products that empower businesses, startups, and visionary entrepreneurs. We combine innovative design, cutting-edge engineering, and strategic thinking to create digital experiences that are elegant, scalable, and built for the future.

              From premium websites and high-performance mobile applications to custom software platforms and enterprise-grade web solutions, every product we deliver is crafted with precision, security, and exceptional user experience at its core. Our development process emphasizes quality, reliability, and long-term scalability, ensuring every solution is ready to perform in real-world environments.

              At AJTech, we believe technology is more than code—it's a catalyst for growth, innovation, and transformation. We partner with ambitious brands to turn bold ideas into intelligent digital solutions that create measurable impact and lasting value.

              Driven by excellence. Built for scale. Designed for the future.
            </p>


            <div style={{ marginTop: 22 }}>
              <a
                className="aj-btn aj-btnGold"
                href="https://portfolio-nine-alpha-ft1bl2pth6.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                View My Portfolio <span aria-hidden style={{ color: "#fff" }}>→</span>
              </a>
              <div className="aj-micro">Explore real builds & deploy-ready projects.</div>
            </div>
          </div>

          <div className="aj-aboutCard aj-reveal" data-reveal>
            <div className="aj-aboutIcon">✦</div>
            <div className="aj-lead" style={{ marginTop: 4, fontSize: 15 }}>
              A premium stack, engineered with clarity.
            </div>
            <div className="aj-list">
              <div className="aj-li">
                <div className="aj-check">✓</div>
                <div>Frontend that feels fast, smooth, and responsive.</div>
              </div>
              <div className="aj-li">
                <div className="aj-check">✓</div>
                <div>Backend logic built for security and scale.</div>
              </div>
              <div className="aj-li">
                <div className="aj-check">✓</div>
                <div>Digital product selling with clean delivery pipelines.</div>
              </div>
            </div>
          </div>
        </div>

        
      </section>

      {/* SERVICES */}
      <section className="aj-section" id="services">
        <div className="aj-sectionInner">
          <h2 className="aj-sectionTitle" data-reveal>
            Our <span className="aj-accent">Services</span>
          </h2>
          <p className="aj-lead" style={{ marginTop: 12 }} data-reveal>
            We provide innovative digital solutions designed to help businesses establish a strong online presence, streamline operations, and achieve sustainable growth. Every service is delivered with a focus on quality, performance, security, and exceptional user experience.
          </p>

          <div className="aj-servicesGrid">
            {services.map((s, idx) => (
              <div
                key={s.title}
                className="aj-serviceCard"
                data-reveal
                style={revealStyle(idx)}
              >
                <div className="aj-serviceIcon" aria-hidden>
                  {s.icon}
                </div>

                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT (SOCIAL ONLY) */}
      <section className="aj-section" id="contact">
        <div className="aj-sectionInner">
          <h2 className="aj-sectionTitle" data-reveal>
            Get <span className="aj-accent">in Touch</span>
          </h2>
          <p className="aj-lead" style={{ marginTop: 12 }} data-reveal>
            <h3>Let's Build Something Exceptional</h3>

Whether you have a new idea, need a high-performance website, or want to develop a custom mobile application, 
AJTech is here to help. Connect with us through any of the platforms below, and let's discuss how we can bring 
your vision to life.
          </p>

          <div className="aj-socialGrid">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                className="aj-socialBtn aj-reveal"
                data-reveal
                href={s.href}
                target="_blank"
                rel="noreferrer"
              >
                <span style={{ color: GOLD, display: "inline-flex" }}>{s.icon}</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="aj-footer">
        <div className="aj-footerInner">
          <div>
            <div className="aj-footerTitle">
              AJTech <span>⚡</span>
            </div>
            <div style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.7 }} >
              Building the future, one line of code at a time.
            </div>
            <div style={{ marginTop: 12, color: "rgba(255,255,255,0.55)" }}>
              © 2026 AJTech. All rights reserved.
            </div>
          </div>

          <div className="aj-quick">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("home");
              }}
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("about");
              }}
            >
              About
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("services");
              }}
            >
              Services
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

