import { useState } from "react";
import "./Auth.css";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { AUTH_KEY } from "../config/cometChat";

const Signup = () => {
    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const uid = username;
            // Check if username already exists locally (for password storage)
            if (localStorage.getItem(`userpass_${uid}`)) {
                setError("Username already taken locally. Try a different username.");
                setLoading(false);
                return;
            }

            // Create CometChat user
            const user = new CometChat.User(uid);
            user.setName(displayName);
            await CometChat.createUser(user, AUTH_KEY);

            // Save password locally (CometChat does not handle passwords)
            localStorage.setItem(`userpass_${uid}`, password);

            // Automatically log in the user after successful signup
            await CometChat.login(uid, AUTH_KEY);

            alert("Signup successful! You are now logged in.");
            window.location.href = "/";
        } catch (err: any) {
            setError(err?.message || "Signup failed. Try a different username.");
            console.error("Signup Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="auth-title">Create Your Account</h2>
                {error && <div style={{ color: "#d32f2f", textAlign: "center" }}>{error}</div>}
                <div className="auth-field">
                    <label>Display Name</label>
                    <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Enter your display name" required />
                </div>
                <div className="auth-field">
                    <label>Username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Choose a username" required />
                </div>
                <div className="auth-field">
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" required />
                </div>
                <button className="auth-btn" type="submit" disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
                <div className="auth-link">Already have an account? <a href="/login">Login</a></div>
            </form>
        </div>
    );
};

export default Signup; 