import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";


const carouselItems = [
  {
    label: "50+ Projects Delivered",
    icon: "🚀",
    sub: "From concept to launch—delivered with speed and quality.",
  },
  {
    label: "100% Responsive Designs",
    icon: "📱",
    sub: "Looks great on mobile, tablet, and desktop—every time.",
  },
  {
    label: "Modern Technologies",
    icon: "⚙️",
    sub: "Built with contemporary tools for scalable performance.",
  },
  {
    label: "Fast & Secure Solutions",
    icon: "🔒",
    sub: "Optimized experiences with security-first development.",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await API.get("/projects");
      setProjects(res.data);
    };

    fetch();
  }, []);

  const buyOnWhatsApp = (p) => {
    const message = `Hello admin, I want to buy:\nProject: ${p.title}\nPrice: ₦${p.price}`;
    window.open(
      `https://wa.me/${p.whatsapp}?text=${encodeURIComponent(message)}`
    );
  };

  const openDemo = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      {isModalOpen && (
        <div
          style={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Pricing notice"
          onMouseDown={(e) => {
            // Close only when clicking the overlay (not inside the modal)
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitle}>Please note</div>
              <button
                type="button"
                style={styles.closeBtn}
                aria-label="Close"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div style={styles.modalBody}>
              Please note: The price displayed on each project card represents the
              base price for that project. Final cost may vary depending on the
              selected package, required features, and customization needs.
              Flexible pricing and negotiation are available.
            </div>
          </div>
        </div>
      )}

      <div style={styles.wrapper}>
        <h1 style={{ ...styles.title, textAlign: "center" }}>🛒 All Projects</h1>

        {/* HERO COPY + CAROUSEL STATS */}
        <div style={styles.topCopy}>
          <h2 style={styles.topHeading}>
            Building Digital Experiences That Deliver Results
          </h2>
          <p style={styles.topParagraph}>
            Every project represents a unique challenge, a bold idea, and a
            commitment to excellence. From business websites and e-commerce
            platforms to custom web applications and mobile apps, our portfolio
            reflects our passion for creating digital products that are fast,
            scalable, and designed to make an impact.
            <br />
            <br />
            Explore a selection of projects that showcase our expertise in design,
            development, and innovation.
          </p>
        </div>

        <div style={styles.statsWrap}>
          {carouselItems.map((item) => (
            <div key={item.label} style={styles.statCard}>
              <div style={styles.statIcon}>{item.icon}</div>
              <div style={styles.statValue}>{item.label}</div>
              <div style={styles.statSub}>{item.sub}</div>
            </div>
          ))}
        </div>

        <div style={styles.grid}>
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              style={styles.card}
            >
              {p.image && (
                <img
                  src={`https://ajtech-fc3f.onrender.com/${p.image}`}
                  style={styles.image}
                />
              )}

              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <p style={{ color: "#d4af37" }}>₦{p.price}</p>

              <div style={styles.row}>
                <button onClick={() => openDemo(p.live_demo)} style={styles.demoBtn}>
                  Live Demo
                </button>

                <button onClick={() => buyOnWhatsApp(p)} style={styles.buyBtn}>
                  Buy on WhatsApp
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

const styles = {
  wrapper: {
    background: "#0b0b0b",
    minHeight: "100vh",
    color: "#fff",
    padding: 20,
  },

  title: {
    color: "#d4af37",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 15,
    marginTop: 20,
  },

  card: {
    background: "#141414",
    padding: 15,
    borderRadius: 10,
  },

  image: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: 8,
  },

  row: {
    display: "flex",
    gap: 10,
    marginTop: 10,
  },

  demoBtn: {
    flex: 1,
    padding: 8,
    background: "#333",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },

  buyBtn: {
    flex: 1,
    padding: 8,
    background: "#25D366",
    color: "#000",
    border: "none",
    cursor: "pointer",
  },

  topCopy: {
    marginTop: 18,
    background: "#141414",
    border: "1px solid rgba(212,175,55,0.18)",
    borderRadius: 14,
    padding: "18px 16px",
  },

  topHeading: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 10,
    lineHeight: 1.25,
    textAlign: "center",
  },

  topParagraph: {
    color: "rgba(255,255,255,0.78)",
    lineHeight: 1.7,
    fontSize: 14.5,
    margin: 0,
    textAlign: "center",
  },

  /* ====== STAT CARDS (50+ Projects Delivered etc.) ====== */
  statsWrap: {
    marginTop: 18,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
  },

  statCard: {
    background: "#141414",
    border: "1px solid rgba(212,175,55,0.18)",
    borderRadius: 16,
    padding: "18px 16px",
    minHeight: 120,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 8,
    boxShadow: "0 0 0 rgba(212,175,55,0)",
  },

  statIcon: {
    fontSize: 26,
    lineHeight: 1,
    color: "#d4af37",
  },

  statValue: {
    color: "#fff",
    fontWeight: 800,
    fontSize: 15.5,
    lineHeight: 1.3,
  },

  statSub: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 13.5,
    lineHeight: 1.5,
  },

  /* ===== Modal ===== */
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.65)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    zIndex: 9999,
  },

  modal: {
    width: "100%",
    maxWidth: 760,
    background: "#0f172a",
    color: "#fff",
    border: "1px solid rgba(212,175,55,0.35)",
    borderRadius: 16,
    boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
    padding: 18,
  },

  modalHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 10,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: 800,
    color: "#d4af37",
    lineHeight: 1.3,
    marginTop: 2,
  },

  closeBtn: {
    border: "1px solid rgba(212,175,55,0.35)",
    background: "transparent",
    color: "#fff",
    borderRadius: 10,
    width: 38,
    height: 38,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto",
    fontSize: 18,
  },

  modalBody: {
    fontSize: 14.5,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.92)",
    wordBreak: "break-word",
  },
};

