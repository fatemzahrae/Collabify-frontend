"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "@/assets/css/nucleo-icons.css";
import "@/assets/css/nucleo-svg.css";
import "@/assets/css/corporate-ui-dashboard.css?v=1.0.0";
import google from "@/assets/img/logos/google-logo.svg";
import { authAPI, tokenManager } from "@/api/api";

export default function SignIn() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // State management for form fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // State for form validation and submission
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user types
    if (error) setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };

      console.log("Attempting login with:", loginData);
      const response = await authAPI.login(loginData);
      console.log("Login response:", response);

      // Store the token (assuming your backend returns a token)
      if (response.token) {
        tokenManager.setToken(response.token);
      }

      setSuccess("Login successful! Redirecting...");

      // Clear form
      setFormData({
        email: "",
        password: "",
        rememberMe: false,
      });

      // Redirect to dashboard or home page
      setTimeout(() => {
        router.push("/dashboard"); // Change this to your desired redirect path
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign-in
  const handleGoogleSignIn = () => {
    console.log("Google sign-in clicked");
    // TODO: Implement Google OAuth logic here
    setError("Google Sign-in not implemented yet");
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <main className="main-content mt-0">
      <section>
        <div className="page-header min-vh-100">
          <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
              <div className="col-xl-4 col-md-6 col-12 d-flex flex-column mx-auto">
                <div className="card card-plain mt-7">
                  <div className="card-header pb-0 text-left bg-transparent">
                    <h3 className="font-weight-black text-dark display-6">
                      Welcome back
                    </h3>
                    <p className="mb-0">
                      Welcome back! Please enter your details.
                    </p>
                  </div>
                  <div className="card-body">
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}

                    {success && (
                      <div className="alert alert-success" role="alert">
                        {success}
                      </div>
                    )}

                    <form role="form" onSubmit={handleSubmit}>
                      <label>Email Address</label>
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email address"
                          aria-label="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={loading}
                        />
                      </div>
                      <label>Password</label>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter password"
                          aria-label="Password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="form-check form-check-info text-left mb-0">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            disabled={loading}
                          />
                          <label
                            className="font-weight-normal text-dark mb-0"
                            htmlFor="rememberMe"
                          >
                            Remember for 14 days
                          </label>
                        </div>
                        <Link
                          href="/forgot-password"
                          className="text-xs font-weight-bold ms-auto"
                        >
                          Forgot password
                        </Link>
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-dark w-100 mt-4 mb-3"
                          disabled={loading}
                        >
                          {loading ? "Signing in..." : "Sign in"}
                        </button>
                        <button
                          type="button"
                          className="btn btn-white btn-icon w-100 mb-2"
                          onClick={handleGoogleSignIn}
                          disabled={loading}
                        >
                          <span className="btn-inner--icon me-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 48 48"
                            >
                              <path
                                fill="#FFC107"
                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                              />
                              <path
                                fill="#FF3D00"
                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                              />
                              <path
                                fill="#4CAF50"
                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                              />
                              <path
                                fill="#1976D2"
                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                              />
                            </svg>
                          </span>
                          <span className="btn-inner--text">
                            Sign in with Google
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center pt-0 px-lg-2 px-1">
                    <p className="mb-4 text-xs mx-auto">
                      Don&apos;t have an account?
                      <Link
                        href="/register"
                        className="text-dark font-weight-bold ms-1"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="position-absolute w-40 top-0 end-0 h-100 d-md-block d-none">
                  <div
                    className="oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 bg-cover ms-n8"
                    style={{
                      backgroundImage: "url('image-sign-in.jpg')",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="mt-10 p-4 text-start max-width-700 position-absolute m-8">
                      <h1 className="mt-3 text-white font-weight-bolder">
                        Join our global community of collaborators.
                      </h1>
                      <p className="text-white font-weight-bold text-lg mt-2 mb-4">
                        Where Teams Connect, Projects Succeed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
