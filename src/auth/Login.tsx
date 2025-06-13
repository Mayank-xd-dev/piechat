import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { AUTH_KEY } from "../config/cometChat";

// Add JSX namespace declaration
declare global {
    namespace JSX {
        interface IntrinsicElements {
            div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
            svg: React.DetailedHTMLProps<React.SVGAttributes<SVGElement>, SVGElement>;
            path: React.DetailedHTMLProps<React.SVGAttributes<SVGPathElement>, SVGPathElement>;
            p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
            span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
            h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            label: React.DetailedHTMLProps<React.HTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
            input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
            button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
            form: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
        }
    }
}

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate inputs
        if (!username.trim()) {
            setError("Please enter your username");
            return;
        }

        setError("");
        setLoading(true);

        try {
            console.log("Attempting to login with username:", username.trim());

            // Try to login directly with AUTH_KEY
            const user = await CometChat.login(username.trim(), AUTH_KEY);
            console.log("Login successful:", user);

            // Force a page reload to update authentication state
            window.location.href = "/";
        } catch (error: any) {
            console.error("Login error details:", {
                code: error?.code,
                message: error?.message,
                details: error
            });

            if (error?.code === "ERR_NETWORK") {
                setError("Network error. Please check your connection");
            } else if (error?.code === "ERR_USER_NOT_FOUND" || error?.code === "ERR_INVALID_CREDENTIALS") {
                // If login fails, try to create the user first
                try {
                    console.log("User not found, attempting to create user");
                    const newUser = new CometChat.User(username.trim());
                    newUser.setName(username.trim());
                    await CometChat.createUser(newUser, AUTH_KEY);

                    // Now try to login again
                    const loggedInUser = await CometChat.login(username.trim(), AUTH_KEY);
                    console.log("User created and logged in successfully:", loggedInUser);

                    // Force a page reload to update authentication state
                    window.location.href = "/";
                    return;
                } catch (createError: any) {
                    console.error("User creation error:", createError);
                    setError("Failed to create user. Please try again.");
                }
            } else {
                setError("An error occurred. Please try again");
            }
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
                        Welcome Back!
                    </div>
                    <h1>Experience Seamless Communication</h1>
                    <p>
                        Connect with your team and friends through our powerful real-time messaging platform.
                        Experience crystal-clear voice and video calls, secure messaging, and more.
                    </p>
                    <div className="hero-features">
                        <div className="feature">
                            <div className="feature-icon-wrapper">
                                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                            </div>
                            <div className="feature-content">
                                <span className="feature-title">Real-time Messaging</span>
                                <span className="feature-description">Instant message delivery with read receipts</span>
                            </div>
                        </div>
                        <div className="feature">
                            <div className="feature-icon-wrapper">
                                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </div>
                            <div className="feature-content">
                                <span className="feature-title">Secure & Private</span>
                                <span className="feature-description">End-to-end encryption for all communications</span>
                            </div>
                        </div>
                        <div className="feature">
                            <div className="feature-icon-wrapper">
                                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <div className="feature-content">
                                <span className="feature-title">Group Chats</span>
                                <span className="feature-description">Create and manage group conversations</span>
                            </div>
                        </div>
                        <div className="feature">
                            <div className="feature-icon-wrapper">
                                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </div>
                            <div className="feature-content">
                                <span className="feature-title">Voice Calls</span>
                                <span className="feature-description">High-quality voice calls with noise reduction</span>
                            </div>
                        </div>
                        <div className="feature">
                            <div className="feature-icon-wrapper">
                                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M23 7l-7 5 7 5V7z" />
                                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                </svg>
                            </div>
                            <div className="feature-content">
                                <span className="feature-title">Video Calls</span>
                                <span className="feature-description">HD video calls with screen sharing</span>
                            </div>
                        </div>
                    </div>
                </div>
                <svg className="hero-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="#FFFFFF10"
                        d="M45.7,-78.2C58.9,-71.3,69.2,-58.3,76.4,-43.8C83.6,-29.3,87.7,-13.3,86.5,1.8C85.3,16.9,78.8,31.2,70.2,43.8C61.6,56.4,50.9,67.3,37.8,74.2C24.7,81.1,9.3,84,-5.7,82.3C-20.7,80.6,-35.3,74.3,-47.2,64.8C-59.1,55.3,-68.3,42.6,-75.1,28.5C-81.9,14.4,-86.3,-1.1,-83.8,-15.5C-81.3,-29.9,-71.9,-43.2,-59.8,-50.8C-47.7,-58.4,-32.9,-60.3,-19.3,-65.8C-5.7,-71.3,6.7,-80.4,19.5,-85.1C32.3,-89.8,45.5,-85.1,45.7,-78.2Z"
                        transform="translate(100 100)"
                    />
                </svg>
            </div>
            <div className="auth-right">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-header">
                        <h2>Welcome Back</h2>
                        <p className="form-subtitle">Sign in to continue to your account</p>
                    </div>
                    <div className="form-content">
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
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <a href="/reset-password" className="forgot-password">
                                Forgot password?
                            </a>
                        </div>
                        {error && <div className="auth-error">{error}</div>}
                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? (
                                <div className="loading-spinner">
                                    <svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                    </svg>
                                    Signing in...
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </div>
                    <div className="form-footer">
                        <p className="auth-link">
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login; 