import { useState } from "react";
import { supabase } from "../supabaseClient";

function Auth() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin
      }
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email and click the login link");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending link..." : "Send Login Link"}
        </button>
      </form>
    </div>
  );
}

export default Auth;


