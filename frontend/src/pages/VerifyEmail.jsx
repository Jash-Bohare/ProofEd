import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get email from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("signupEmail");
    if (!savedEmail) {
      // If no email, user came here wrongly
      navigate("/university/signup");
    } else {
      setEmail(savedEmail);
    }
  }, [navigate]);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/university/verify-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      // OTP verified successfully
      navigate("/university/connect-wallet");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/university/resend-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      alert("OTP resent successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
      <h2>Verify Email</h2>
      <p>OTP sent to: <strong>{email}</strong></p>

      <form onSubmit={handleVerifyOTP}>
        <div style={{ marginBottom: "10px" }}>
          <label>Enter OTP</label>
          <br />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      <div style={{ marginTop: "10px" }}>
        <button onClick={handleResendOTP} disabled={loading}>
          Resend OTP
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
