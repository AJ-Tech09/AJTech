// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import API from "../services/api"

// export default function Projects() {
//   const [projects, setProjects] = useState([])

//   useEffect(() => {
//     API.get("/projects")
//       .then(res => setProjects(res.data))
//       .catch(err => console.log(err))
//   }, [])

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1.2 }}
//       style={{ padding: "30px" }}
//     >
//       {/* PAGE TITLE */}
//       <motion.h1
//         initial={{ y: -40, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 1.5 }}
//       >
//         📦 My Projects Marketplace
//       </motion.h1>

//       {/* GRID */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//           gap: "20px",
//           marginTop: "30px"
//         }}
//       >
//         {projects.map((project, index) => (
//           <motion.div
//             key={project.id}
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{
//               duration: 1.2,
//               delay: index * 0.2, // 👈 stagger effect
//               ease: "easeInOut"
//             }}
//             whileHover={{ scale: 1.03 }}
//             style={{
//               border: "1px solid #ddd",
//               borderRadius: "12px",
//               padding: "15px",
//               background: "#fff"
//             }}
//           >
//             {/* TITLE */}
//             <h3>{project.title}</h3>

//             {/* DESCRIPTION */}
//             <p style={{ fontSize: "14px", opacity: 0.8 }}>
//               {project.description}
//             </p>

//             {/* PRICE */}
//             <p><b>₦{project.price}</b></p>

//             {/* BUTTONS */}
//             <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              
//               {/* LIVE DEMO */}
//               <a
//                 href={project.live_demo}
//                 target="_blank"
//                 style={{
//                   padding: "6px 10px",
//                   background: "#007bff",
//                   color: "#fff",
//                   borderRadius: "5px",
//                   textDecoration: "none"
//                 }}
//               >
//                 Live Demo
//               </a>

//               {/* WHATSAPP (placeholder for now) */}
//               <a
//                 href={project.whatsapp}
//                 target="_blank"
//                 style={{
//                   padding: "6px 10px",
//                   background: "green",
//                   color: "#fff",
//                   borderRadius: "5px",
//                   textDecoration: "none"
//                 }}
//               >
//                 WhatsApp
//               </a>

//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   )
// }

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import API from "../services/api"


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
]


export default function Projects() {
  const [projects, setProjects] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)


  useEffect(() => {
    const fetch = async () => {
      const res = await API.get("/projects")
      setProjects(res.data)
    }

    fetch()
  }, [])

  const buyOnWhatsApp = (p) => {
    const message = `Hello admin, I want to buy:
Project: ${p.title}
Price: ₦${p.price}`
    window.open(`https://wa.me/${p.whatsapp}?text=${encodeURIComponent(message)}`)
  }

  const openDemo = (url) => {
    window.open(url, "_blank")
  }

  return (
    <div style={styles.wrapper}>
      <h1 style={{ ...styles.title, textAlign: "center" }}>🛒 All Projects</h1>


      {/* HERO COPY + CAROUSEL STATS */}
      <div style={styles.topCopy}>
        <h2 style={styles.topHeading}>Building Digital Experiences That Deliver Results</h2>
        <p style={styles.topParagraph}>

          Every project represents a unique challenge, a bold idea, and a commitment to excellence. From business websites and e-commerce platforms to custom web applications and mobile apps, our portfolio reflects our passion for creating digital products that are fast, scalable, and designed to make an impact.
          <br />
          <br />
          Explore a selection of projects that showcase our expertise in design, development, and innovation.
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
                src={`http://127.0.0.1:5000${p.image}`}
                style={styles.image}
              />
            )}

            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p style={{ color: "#d4af37" }}>₦{p.price}</p>

            <div style={styles.row}>

              <button
                onClick={() => openDemo(p.live_demo)}
                style={styles.demoBtn}
              >
                Live Demo
              </button>

              <button
                onClick={() => buyOnWhatsApp(p)}
                style={styles.buyBtn}
              >
                Buy on WhatsApp
              </button>

            </div>

          </motion.div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    background: "#0b0b0b",
    minHeight: "100vh",
    color: "#fff",
    padding: 20
  },

  title: {
    color: "#d4af37"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 15,
    marginTop: 20
  },

  card: {
    background: "#141414",
    padding: 15,
    borderRadius: 10
  },

  image: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: 8
  },

  row: {
    display: "flex",
    gap: 10,
    marginTop: 10
  },

  demoBtn: {
    flex: 1,
    padding: 8,
    background: "#333",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },

  buyBtn: {
    flex: 1,
    padding: 8,
    background: "#25D366",
    color: "#000",
    border: "none",
    cursor: "pointer"
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

  /* Keep older carousel-related keys (unused now) */
  carousel: {
    marginTop: 14,
    borderRadius: 16,
    border: "1px solid rgba(212,175,55,0.18)",
    background: "rgba(20,20,20,0.65)",
    padding: 14,
  },

  carouselViewport: {
    overflow: "hidden",
  },

  carouselTrack: {
    display: "flex",
    width: `${carouselItems.length * 100}%`,
  },

  carouselSlide: {
    width: `${100 / carouselItems.length}%`,
    flex: `0 0 ${100 / carouselItems.length}%`,
    padding: "14px 10px",
    borderRadius: 12,
    textAlign: "center",
    border: "1px solid rgba(212,175,55,0.16)",
    background: "rgba(255,255,255,0.02)",
    marginRight: 12,
  },

  carouselIcon: {
    fontSize: 26,
    marginBottom: 8,
  },

  carouselValue: {
    color: "#d4af37",
    fontWeight: 800,
    marginBottom: 6,
    fontSize: 15.5,
  },

  carouselSub: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 13.5,
    lineHeight: 1.5,
  },

  carouselDots: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
    marginTop: 12,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    border: "1px solid rgba(212,175,55,0.35)",
    cursor: "pointer",
  },

}

