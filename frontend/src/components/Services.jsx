import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaShoppingCart,
  FaMobileAlt,
  FaServer,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";

const services = [
  {
    icon: <FaLaptopCode size={45} />,
    title: "Website Development",
    desc: "Modern React, Flask and Full Stack websites built for speed and performance.",
  },
  {
    icon: <FaShoppingCart size={45} />,
    title: "E-Commerce",
    desc: "Complete online stores with payment integration and admin dashboard.",
  },
  {
    icon: <FaMobileAlt size={45} />,
    title: "Mobile Apps",
    desc: "Beautiful Android applications built with modern technologies.",
  },
  {
    icon: <FaServer size={45} />,
    title: "Backend APIs",
    desc: "Secure Flask REST APIs with JWT Authentication and MySQL database.",
  },
  {
    icon: <FaShieldAlt size={45} />,
    title: "Security",
    desc: "Secure authentication, encryption and protected admin dashboards.",
  },
  {
    icon: <FaHeadset size={45} />,
    title: "24/7 Support",
    desc: "We continue supporting every project after delivery.",
  },
];

export default function Services() {
  return (
    <section
      style={{
        padding: "90px 40px",
        background: "#0b0b0b",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{
          color: "#d4af37",
          fontSize: "42px",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        Our Services
      </motion.h2>

      <p
        style={{
          color: "#bbb",
          textAlign: "center",
          marginBottom: "60px",
        }}
      >
        Everything you need to launch your digital business.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "30px",
        }}
      >
        {services.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
              y: -8,
            }}
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.15,
            }}
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: "18px",
              padding: "35px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <div style={{ color: "#d4af37" }}>{item.icon}</div>

            <h3
              style={{
                color: "#fff",
                marginTop: "20px",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "#bbb",
                lineHeight: "1.8",
                marginTop: "15px",
              }}
            >
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}