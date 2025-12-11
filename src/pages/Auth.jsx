/* --- components/Auth.jsx --- */
import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { apiCall } from "../utils/api";

export const Auth = ({ type, onSwitchType }) => {
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  useEffect(() => {
    if (type === "login") {
      setFormData({
        userName: "",
        password: "",
        fullName: "",
        confirmPassword: "",
        gender: "male",
      });
    } else {
      setFormData({
        fullName: "",
        userName: "",
        password: "",
        confirmPassword: "",
        gender: "male",
      });
    }
  }, [type]);

  const handleSubmit = async () => {
    setError("");

    if (type === "signup" && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const endpoint =
        type === "login" ? "/api/auth/login" : "/api/auth/signup";
      const data = await apiCall(endpoint, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      login(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(31, 41, 55, 0.95)",
          backdropFilter: "blur(10px)",
          padding: "2.5rem",
          borderRadius: "1rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          width: "100%",
          maxWidth: "400px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#fff",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          {type === "login" ? "Login" : "Sign Up"}
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {type === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                border: "1px solid rgba(100, 116, 139, 0.3)",
                backgroundColor: "rgba(17, 24, 39, 0.8)",
                color: "#fff",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />
          )}

          <input
            type="text"
            placeholder="Username"
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              border: "1px solid rgba(100, 116, 139, 0.3)",
              backgroundColor: "rgba(17, 24, 39, 0.8)",
              color: "#fff",
              fontSize: "0.95rem",
              outline: "none",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              border: "1px solid rgba(100, 116, 139, 0.3)",
              backgroundColor: "rgba(17, 24, 39, 0.8)",
              color: "#fff",
              fontSize: "0.95rem",
              outline: "none",
            }}
          />

          {type === "signup" && (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(100, 116, 139, 0.3)",
                  backgroundColor: "rgba(17, 24, 39, 0.8)",
                  color: "#fff",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />

              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  justifyContent: "center",
                }}
              >
                <label
                  style={{
                    color: "#e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  />
                  Male
                </label>

                <label
                  style={{
                    color: "#e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  />
                  Female
                </label>
              </div>
            </>
          )}

          {error && (
            <p style={{ color: "#ef4444", fontSize: "0.9rem", margin: 0 }}>
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              fontSize: "0.95rem",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.5 : 1,
            }}
          >
            {loading ? "Loading..." : type === "login" ? "Login" : "Sign Up"}
          </button>
        </div>

        <p
          style={{
            color: "#9ca3af",
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.9rem",
          }}
        >
          {type === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <span
            onClick={() => onSwitchType(type === "login" ? "signup" : "login")}
            style={{ color: "#818cf8", cursor: "pointer", fontWeight: "500" }}
          >
            {type === "login" ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};
