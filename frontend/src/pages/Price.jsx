import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();
  const websitePlans = [
    {
      name: "Starter Package",
      price: "₦20,000 – ₦50,000",
      description: "Get the project exactly as shown.",
      features: [
        "Full source code (React / Next.js)",
        "Ready-made UI design",
        "Responsive layout (mobile + desktop)",
        "Basic setup guide",
        "No customization",
        "1-time delivery",
      ],
    },
    {
      name: "Standard Package",
      price: "₦60,000 – ₦120,000",
      description: "Best for small businesses who want minor changes.",
      features: [
        "Full source code (React / Next.js)",
        "Everything in Starter",
        "Logo replacement",
        "Color & branding changes",
        "Text/content updates",
        "Up to 5 small edits",
        "Basic support (3–7 days)",
      ],
    },
    {
      name: "Premium Package",
      price: "₦120,000 – ₦250,000+",
      description: "Best for businesses that want a personalized version.",
      features: [
        "Full source code (React / Next.js)",
        "Everything in Business",
        "Custom pages (if needed)",
        "Layout modifications",
        "Advanced UI changes",
        "Priority support",
      ],
    },
    {
      name: "Enterprise / Custom Build",
      price: "₦250,000 – ₦500,000+ (Negotiable)",
      description: "Fully tailored system for companies.",
      features: [
        "Full source code",
        "Full customization",
        "New features added",
        "Backend integration (if needed)",
        "Database setup (if needed)",
        "Dedicated support",
      ],
    },
  ];

  // ✅ NEW MOBILE APP PRICING
  const appPlans = [
    {
      name: "Starter App",
      price: "₦50,000 – ₦100,000",
      description: "Simple mobile app UI templates.",
      features: [
        "Full source code (React Native / Expo)",
        "UI screens",
        "Basic navigation",
        "No backend",
      ],
    },
    {
      name: "Standard App",
      price: "₦100,000 – ₦250,000",
      description: "For real business mobile apps.",
      features: [
        "Everything in Starter",
        "Authentication UI",
        "API-ready structure",
        "Basic state management",
        "Branding/customization",
      ],
    },
    {
      name: "Premium App",
      price: "₦250,000 – ₦600,000+",
      description: "Production-ready mobile applications.",
      features: [
        "Full production structure",
        "Backend integration (optional)",
        "Database-ready setup",
        "Advanced features (chat, payments UI, dashboards)",
        "Deployment support (APK / Play Store guidance)",
      ],
    },
  ];

  const styles = {
    section: {
      minHeight: "100vh",
      padding: "100px 8%",
      background: "#050505",
      color: "#fff",
      fontFamily:
        "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    },

    container: {
      maxWidth: "1200px",
      margin: "auto",
      textAlign: "center",
    },

    title: {
      fontSize: "3rem",
      fontWeight: "800",
      marginBottom: "10px",
    },

    subtitle: {
      color: "#94a3b8",
      fontSize: "1.1rem",
      marginBottom: "60px",
    },

    sectionTitle: {
      fontSize: "2rem",
      fontWeight: "700",
      marginTop: "80px",
      marginBottom: "30px",
      color: "#d4af37",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "25px",
    },

    card: {
      background: "#111827",
      border: "2px solid #d4af37",
      borderRadius: "20px",
      padding: "35px",
      textAlign: "left",
      position: "relative",
    },

    planName: {
      fontSize: "1.5rem",
      fontWeight: "700",
    },

    price: {
      fontSize: "1.7rem",
      fontWeight: "800",
      margin: "15px 0",
      color: "#d4af37",
      textShadow:
        "0 0 18px rgba(212,175,55,0.20), 0 0 10px rgba(212,175,55,0.25)",
    },

    description: {
      color: "#94a3b8",
      marginBottom: "20px",
    },

    list: {
      listStyle: "none",
      padding: 0,
      marginBottom: "25px",
    },

    listItem: {
      marginBottom: "10px",
      color: "#cbd5e1",
      fontSize: "0.95rem",
    },

    button: {
      width: "100%",
      padding: "14px",
      borderRadius: "12px",
      border: "none",
      background: "#d4af37",
      color: "white",
      fontWeight: "600",
      cursor: "pointer",
      fontSize: "1rem",
    },
  };

  const renderPlans = (plans) =>
    plans.map((plan, index) => (
      <motion.div
        key={index}
        style={styles.card}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15 }}
        viewport={{ once: true }}
      >
        <h2 style={styles.planName}>{plan.name}</h2>

        <div style={styles.price}>{plan.price}</div>

        <p style={styles.description}>{plan.description}</p>

        <ul style={styles.list}>
          {plan.features.map((feature, i) => (
            <li key={i} style={styles.listItem}>
              ✓ {feature}
            </li>
          ))}
        </ul>

        <button
  style={styles.button}
  onClick={() => navigate("/projects")}
>
  Buy Now
</button>
      </motion.div>
    ));

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <motion.h1
          style={styles.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Pricing Plans
        </motion.h1>

        <p style={styles.subtitle}>
          Pick a package that matches your goals — 
          every website and mobile app includes full source code, 
          giving you complete ownership and flexibility.
        </p>

        {/* WEBSITE PRICING */}
        <h2 style={styles.sectionTitle}>🌐 Website Pricing</h2>
        <div style={styles.grid}>{renderPlans(websitePlans)}</div>

        {/* MOBILE APP PRICING */}
        <h2 style={styles.sectionTitle}>📱 Mobile App Pricing</h2>
        <div style={styles.grid}>{renderPlans(appPlans)}</div>
      </div>
    </section>
  );
}