import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import API from "../services/api"
import { Navigate } from "react-router-dom"



console.log("Save button clicked")

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [editingId, setEditingId] = useState(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const [search, setSearch] = useState("")
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [license, setLicense] = useState("")
  const [liveDemo, setLiveDemo] = useState("")
  const [whatsapp, setWhatsapp] = useState("")

  const token = localStorage.getItem("token")

  useEffect(() => {
    const verify = async () => {
      try {
        await API.get("/auth/verify-admin")
      } catch (e) {
        localStorage.removeItem("token")
        window.location.href = "/admin"
      }
    }

    if (token) {
      verify()
    }
  }, [token])

  if (!token) {
    return <Navigate to="/admin" />
  }


  const auth = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const colors = {
    black: "#0b0b0b",
    gold: "#d4af37",
    soft: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.08)"
  }

  // 📦 FETCH PROJECTS (with search)
  const fetchProjects = async () => {
    const res = await API.get(`/projects?search=${encodeURIComponent(search)}`, auth)
    setProjects(res.data)
  }

  useEffect(() => {
    fetchProjects()
  }, [search])

  // ➕ OPEN ADD
  const openAdd = () => {
    resetForm()
    setModalOpen(true)
  }

  // ✏️ OPEN EDIT
  const openEdit = (p) => {
    setEditingId(p.id)
    setTitle(p.title)
    setDescription(p.description)
    setPrice(p.price)
    setLicense(p.license)
    setLiveDemo(p.live_demo)
    setWhatsapp(p.whatsapp)
    setModalOpen(true)
  }

  // 🧠 RESET FORM
  const resetForm = () => {
    setEditingId(null)
    setTitle("")
    setDescription("")
    setPrice("")
    setLicense("")
    setLiveDemo("")
    setWhatsapp("")
    setImage(null)
  }

  // 💾 SAVE (ADD / UPDATE with IMAGE)
  const saveProject = async () => {
    const formData = new FormData()

    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price)
    formData.append("license", license)
    formData.append("live_demo", liveDemo)
    formData.append("whatsapp", whatsapp)

    if (image) {
      formData.append("image", image)
    }

    try {
      if (editingId) {
        const res = await API.put(`/projects/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        })
        console.log("update ok", res.data)
      } else {
        const res = await API.post("/projects", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        })
        console.log("create ok", res.data)
      }
    } catch (err) {
      console.error("save failed", err?.response?.data || err)
      alert(`Save failed: ${err?.response?.data?.message || err?.response?.data?.error || err?.message || err}`)
      return 
        setModalOpen(false)
        resetForm()
        fetchProjects()
      

    }


    setModalOpen(false)
    resetForm()
    fetchProjects()
  }

  // 🗑 DELETE
  const confirmDelete = async () => {
    try {
      await API.delete(`/projects/${deleteId}`, auth)
      setDeleteId(null)
      fetchProjects()
    } catch (err) {
      console.error("delete failed", err?.response?.data || err)
      alert(`Delete failed: ${err?.response?.data?.message || err?.response?.data?.error || err?.message || err}`)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "/admin"
  }

  return (
    <div style={styles.wrapper}>

      {/* SIDEBAR */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        style={styles.sidebar}
      >
        <h2 style={{ color: colors.gold }}>Marketplace Admin</h2>

        <button onClick={openAdd} style={styles.goldBtn}>
          + Add Project
        </button>

        <button onClick={logout} style={styles.redBtn}>
          Logout
        </button>
      </motion.div>

      {/* MAIN */}
      <div style={styles.main}>

        <h1 style={{ color: colors.gold }}>Dashboard</h1>

        {/* SEARCH */}
        <input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        {/* GRID */}
        <div style={styles.grid}>
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              whileHover={{ scale: 1.03 }}
              style={styles.card}
            >

              {/* IMAGE */}
              {p.image && (
                <img
                  src={`http://127.0.0.1:5000${p.image}`}
                  style={styles.image}
                />
              )}

              {/* FEATURED */}
              {p.featured && (
                <span style={styles.badge}>Featured</span>
              )}

              <h3>{p.title}</h3>
              <p style={{ opacity: 0.7 }}>₦{p.price}</p>

              <div style={styles.row}>
                <button onClick={() => openEdit(p)} style={styles.goldBtnSmall}>
                  Edit
                </button>

                <button onClick={() => setDeleteId(p.id)} style={styles.redBtnSmall}>
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div style={styles.modalOverlay}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={styles.modal}
            >
              <h2 style={{ color: colors.gold }}>
                {editingId ? "Edit Project" : "Add Project"}
              </h2>

              <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} style={styles.input} />
              <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={styles.input} />
              <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} style={styles.input} />
              <input placeholder="License" value={license} onChange={e => setLicense(e.target.value)} style={styles.input} />
              <input placeholder="Live Demo" value={liveDemo} onChange={e => setLiveDemo(e.target.value)} style={styles.input} />
              <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} style={styles.input} />

              {/* IMAGE UPLOAD */}
              <input type="file" onChange={(e) => setImage(e.target.files[0])} />

              <button onClick={saveProject} style={styles.goldBtn}>
                Save
              </button>

              <button onClick={() => setModalOpen(false)} style={styles.redBtn}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE MODAL */}
      <AnimatePresence>
        {deleteId && (
          <motion.div style={styles.modalOverlay}>
            <motion.div style={styles.modal}>
              <h3 style={{ color: "#ff4d4d" }}>Delete this project?</h3>

              <button onClick={confirmDelete} style={styles.redBtn}>
                Yes Delete
              </button>

              <button onClick={() => setDeleteId(null)} style={styles.goldBtn}>
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}




/* 🎨 STYLES */
const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#0b0b0b",
    color: "#fff",
    fontFamily: "Arial"
  },

  sidebar: {
    width: 220,
    padding: 20,
    borderRight: "1px solid #222"
  },

  main: {
    flex: 1,
    padding: 25
  },

  search: {
    width: "100%",
    padding: 12,
    marginBottom: 20,
    background: "#111",
    color: "#fff",
    border: "1px solid #333"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 15
  },

  card: {
    background: "#141414",
    padding: 15,
    borderRadius: 10,
    border: "1px solid #222"
  },

  image: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: 8,
    marginBottom: 10
  },

  badge: {
    background: "#d4af37",
    color: "#000",
    padding: "4px 8px",
    borderRadius: 5,
    fontSize: 12
  },

  row: {
    display: "flex",
    gap: 10,
    marginTop: 10
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  modal: {
    width: 400,
    background: "#111",
    padding: 20,
    borderRadius: 10,
    border: "1px solid #333"
  },

  goldBtn: {
    background: "#d4af37",
    color: "#000",
    padding: 10,
    border: "none",
    marginTop: 10,
    width: "100%",
    cursor: "pointer"
  },

  redBtn: {
    background: "#ff3b3b",
    color: "#fff",
    padding: 10,
    border: "none",
    marginTop: 10,
    width: "100%",
    cursor: "pointer"
  },

  goldBtnSmall: {
    background: "#d4af37",
    border: "none",
    padding: 6,
    flex: 1,
    cursor: "pointer"
  },

  redBtnSmall: {
    background: "#ff3b3b",
    border: "none",
    padding: 6,
    flex: 1,
    cursor: "pointer"
  }
}