import { useState } from "react"
import API from "../services/api"



export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await API.post("/auth/login", {
        email,
        password
      })

      localStorage.setItem("token", res.data.token)

      window.location.href = "/dashboard"
    } catch (err) {
      const msg = err.response?.data?.error
      alert(msg === "Invalid credentials" ? "Wrong credentials" : (msg || "Login failed"))
    }
  }


  return (
    <div style={styles.container}>
      <form style={styles.box} onSubmit={handleLogin}>
        <h2 style={{ color: "#d4af37" }}>Admin Login</h2>


        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button}>
          Login
        </button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#0b0b0b"
  },
  box: {
    width: "300px",
    padding: "20px",
    background: "#141414",
    border: "1px solid #2a2a2a",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #2a2a2a",
    background: "#111",
    color: "#fff"
  },
  button: {
    padding: "10px",
    background: "#d4af37",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  }
}