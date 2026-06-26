import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"


import { useState } from "react"
import { Menu, X } from "lucide-react"

import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Dashboard from "./pages/Dashboard"
import AdminLogin from "./pages/AdminLogin"
import Price from "./pages/Price"

import logo from "./assets/Logo.png"




/* ================= NAVBAR ================= */
function Navbar({ token, onNavigate }) {
  return (
    <>
      <Link to="/" onClick={onNavigate}>Home</Link>
      <Link to="/price" onClick={onNavigate}>Pricing</Link>
      <Link to="/projects" onClick={onNavigate}>Projects</Link>
      {token ? (
        <Link to="/dashboard" onClick={onNavigate}>Dashboard</Link>
      ) : (
        <Link to="/admin" onClick={onNavigate}>Admin</Link>
      )}
    </>
  )
}

/* ================= PAGE WRAPPER ================= */
function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1.2 }}
    >
      {children}
    </motion.div>
  )
}

/* ================= ROUTES ================= */
function AppRoutes() {
  const token = localStorage.getItem("token")
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavigate = () => setMenuOpen(false)

  return (
    <AnimatePresence mode="wait">

      <header className="app-navbar">

        <div className="app-navbar__brand">
          <img className="app-navbar__logo" src={logo} alt="AJ Tech logo" />
        </div>

        {/* Hamburger */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links */}
        <nav className={`app-navbar__links ${menuOpen ? "active" : ""}`}>
          <Navbar token={token} onNavigate={handleNavigate} />
        </nav>

      </header>

      <Routes>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/price" element={<AnimatedPage><Price /></AnimatedPage>} />
        <Route path="/projects" element={<AnimatedPage><Projects /></AnimatedPage>} />
        <Route path="/admin" element={<AnimatedPage><AdminLogin /></AnimatedPage>} />
        <Route
          path="/dashboard"
          element={
            token ? (
              <AnimatedPage><Dashboard /></AnimatedPage>
            ) : (
              <Navigate to="/admin" />
            )
          }
        />
      </Routes>

    </AnimatePresence>
  )
}

/* ================= MAIN APP ================= */
export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}