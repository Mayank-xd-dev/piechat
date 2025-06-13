import { useState } from "react";
import "./Auth.css";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Create mailto link with subject and body
        const subject = "Password Reset Request";
        const body = `Hello,\n\nI would like to request a password reset for my account.\n\nUsername: ${username}\nEmail: ${email}\n\nThank you.`;
        const mailtoLink = `mailto:mkmanav906@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open default email client
        window.location.href = mailtoLink;

        setMessage("Please check your email client to send the password reset request.");
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-left">
                <div className="auth-content">
                    <h1>Reset Password</h1>
                    <p>Enter your username and email address to request a password reset.</p>
                </div>
                <div className="hero-pattern">
                    <svg className="animated-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#ffffff10" d="M45.7,-78.1C59.9,-70.3,72.8,-59.1,79.9,-45.3C87,-31.5,88.3,-15.8,86.8,-1.1C85.3,13.6,81,27.2,73.1,38.8C65.2,50.4,53.8,60,40.8,67.2C27.8,74.4,13.9,79.2,-0.5,80.1C-14.9,81,-29.8,78,-42.8,70.8C-55.8,63.6,-66.9,52.2,-74.5,38.6C-82.1,25,-86.2,9.2,-84.8,-6.1C-83.4,-21.4,-76.5,-36.2,-66.5,-48.1C-56.5,-60,-43.4,-69,-30.2,-75.8C-17,-82.6,-3.7,-87.2,9.2,-85.9C22.1,-84.6,31.5,-85.9,45.7,-78.1Z" transform="translate(100 100)" />
                    </svg>
                </div>
            </div>
            <div className="auth-right">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-header">
                        <h2>Reset Password 🔐</h2>
                        <p className="form-subtitle">We'll help you get back into your account</p>
                    </div>

                    <div className="auth-field">
                        <label htmlFor="username">Username</label>
                        <div className="input-wrapper">
                            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="auth-field">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {message && <div className="auth-message">{message}</div>}

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Request"}
                    </button>

                    <div className="auth-links">
                        <a href="/login" className="auth-link">Back to Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
