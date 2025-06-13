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
    const [formStep, setFormStep] = useState(1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const uid = username;
            if (localStorage.getItem(`userpass_${uid}`)) {
                setError("Username already taken locally. Try a different username.");
                setLoading(false);
                return;
            }

            const user = new CometChat.User(uid);
            user.setName(displayName);
            await CometChat.createUser(user, AUTH_KEY);
            localStorage.setItem(`userpass_${uid}`, password);
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
        <div className="auth-split">
            <div className="auth-left">
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-icon">🚀</span>
                        <span>Join the Future of Communication</span>
                    </div>
                    <h1>Create Your Digital Identity</h1>
                    <p>Experience the next level of real-time communication with our cutting-edge platform</p>
                    <div className="hero-features">
                        <div className="feature">
                            <div className="feature-icon-wrapper">
                                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <div className="feature-content">
                                <span className="feature-title">Real-time Messaging</span>
                                <span className="feature-description">Instant message delivery with read receipts</span>
                            </div>
                        </div>
                        <div className="feature">
                            <div className="feature-icon-wrapper">
                                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div className="feature-content">
                                <span className="feature-title">Secure & Private</span>
                                <span className="feature-description">End-to-end encryption for all communications</span>
                            </div>
                        </div>
                        <div className="feature">
                            <div className="feature-icon-wrapper">
                                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                </svg>
                            </div>
                            <div className="feature-content">
                                <span className="feature-title">Group Chats</span>
                                <span className="feature-description">Create and manage unlimited group conversations</span>
                            </div>
                        </div>
                        <div className="feature">
                            <div className="feature-icon-wrapper">
                                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div className="feature-content">
                                <span className="feature-title">Voice Calls</span>
                                <span className="feature-description">Crystal clear voice calls with noise cancellation</span>
                            </div>
                        </div>
                        <div className="feature">
                            <div className="feature-icon-wrapper">
                                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="feature-content">
                                <span className="feature-title">Video Calls</span>
                                <span className="feature-description">HD video calls with screen sharing</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-pattern">
                    <svg className="animated-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#ffffff10" d="M45.7,-78.1C59.9,-70.3,72.8,-59.1,79.9,-45.3C87,-31.5,88.3,-15.8,86.8,-1.1C85.3,13.6,81,27.2,73.1,38.8C65.2,50.4,53.8,60,40.8,67.2C27.8,74.4,13.9,79.2,-0.5,80.1C-14.9,81,-29.8,78,-42.8,70.8C-55.8,63.6,-66.9,52.2,-74.5,38.6C-82.1,25,-86.2,9.2,-84.8,-6.1C-83.4,-21.4,-76.5,-36.2,-66.5,-48.1C-56.5,-60,-43.4,-69,-30.2,-75.8C-17,-82.6,-3.7,-87.2,9.2,-85.9C22.1,-84.6,31.5,-85.9,45.7,-78.1Z" transform="translate(100 100)" />
                    </svg>
                </div>
            </div>
            <div className="auth-right">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-progress">
                        <div className={`progress-step ${formStep >= 1 ? 'active' : ''}`}>
                            <span className="step-number">1</span>
                            <span className="step-label">Account</span>
                        </div>
                        <div className={`progress-step ${formStep >= 2 ? 'active' : ''}`}>
                            <span className="step-number">2</span>
                            <span className="step-label">Profile</span>
                        </div>
                        <div className={`progress-step ${formStep >= 3 ? 'active' : ''}`}>
                            <span className="step-number">3</span>
                            <span className="step-label">Security</span>
                        </div>
                    </div>

                    <div className="form-header">
                        <h2>Create Account 🎉</h2>
                        <p className="form-subtitle">Join our community of innovators</p>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    {formStep === 1 && (
                        <div className="form-step">
                            <div className="auth-field">
                                <label>Username</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Choose username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="button" className="auth-btn next-btn" onClick={() => setFormStep(2)}>
                                Next Step
                                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {formStep === 2 && (
                        <div className="form-step">
                            <div className="auth-field">
                                <label>Display Name</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-buttons">
                                <button type="button" className="auth-btn back-btn" onClick={() => setFormStep(1)}>
                                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back
                                </button>
                                <button type="button" className="auth-btn next-btn" onClick={() => setFormStep(3)}>
                                    Next Step
                                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {formStep === 3 && (
                        <div className="form-step">
                            <div className="auth-field">
                                <label>Password</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <input
                                        type="password"
                                        placeholder="Create password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-buttons">
                                <button type="button" className="auth-btn back-btn" onClick={() => setFormStep(2)}>
                                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back
                                </button>
                                <button type="submit" className="auth-btn" disabled={loading}>
                                    {loading ? (
                                        <span className="loading-spinner">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Creating Account...
                                        </span>
                                    ) : (
                                        <>
                                            Create Account
                                            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="form-footer">
                        <p className="auth-link">
                            Already have an account? <a href="/login">Login</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup; 