import { useState } from "react";
import "./Auth.css";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { AUTH_KEY } from "../config/cometChat";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            // Use username directly as UID
            const uid = username;
            // Check password from local storage
            // const storedPass = localStorage.getItem(`userpass_${uid}`);
            // if (!storedPass) {
            //     setError("User not found. Please sign up.");
            //     setLoading(false);
            //     return;
            // }
            // if (storedPass !== password) {
            //     setError("Invalid username or password.");
            //     setLoading(false);
            //     return;
            // }
            // Login to CometChat
            await CometChat.login(uid, AUTH_KEY);

            window.location.href = "/";
        } catch (err: any) {
            setError(err?.message || "Login failed. Try again.");
            console.error("Login Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="auth-title">Login to Chat</h2>
                {error && <div style={{ color: "#d32f2f", textAlign: "center" }}>{error}</div>}
                <div className="auth-field">
                    <label>Username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your username" required />
                </div>
                <div className="auth-field">
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
                </div>
                <button className="auth-btn" type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
                <div className="auth-link">Don't have an account? <a href="/signup">Sign up</a></div>
            </form>
        </div>
    );
};

export default Login; 