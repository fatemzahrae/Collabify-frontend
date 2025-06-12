"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/assets/css/nucleo-icons.css";
import "@/assets/css/nucleo-svg.css";
import "@/assets/css/corporate-ui-dashboard.css?v=1.0.0";
import "@/assets/css/corporate-ui-dashboard.min.css";
import team3 from "@/assets/img/team-3.jpg";
import team4 from "@/assets/img/team-4.jpg";
import team1 from "@/assets/img/team-1.jpg";
import google from "@/assets/img/logos/google-logo.svg";
import { useRouter } from "next/navigation";
import { authAPI } from "@/api/api";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    role: "USER",
    email: "",
    password: "",
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    localStorage.removeItem("authToken");

    if (!formData.agreeTerms) {
      setError("Please agree to the Terms and Conditions");
      setLoading(false);
      return;
    }

    try {
      const registrationData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        role: formData.role,
        email: formData.email,
        password: formData.password,
      };

      await authAPI.register(registrationData);
      setSuccess("Registration successful! Redirecting to login...");

      setFormData({
        firstname: "",
        lastname: "",
        role: "USER",
        email: "",
        password: "",
        agreeTerms: false,
      });

      setTimeout(() => {
        router.push("/Login");
      }, 2000);
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-content mt-0">
      <section>
        <div className="page-header min-vh-100">
          <div className="container">
            <div className="row">
              {/* Left side with background image */}
              <div className="col-md-6">
                <div className="position-absolute w-40 top-0 start-0 h-100 d-md-block d-none">
                  <div
                    className="position-absolute d-flex fixed-top ms-auto h-100 z-index-0 bg-cover me-n8"
                    style={{
                      backgroundImage: `url(/image-sign-up.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="my-auto text-start max-width-350 ms-7">
                      <h1 className="mt-3 text-white font-weight-bolder">
                        Start your <br /> new journey.
                      </h1>
                      <p className="text-white text-lg mt-4 mb-4">
                        Collaborate with your team members on innovative
                        projects with ease.
                      </p>
                      <div className="d-flex align-items-center">
                        <div className="avatar-group d-flex">
                          <a
                            href="#"
                            className="avatar avatar-sm rounded-circle"
                          >
                            <Image
                              src={team3}
                              alt="Team member"
                              width={32}
                              height={32}
                              className="rounded-circle"
                            />
                          </a>
                          <a
                            href="#"
                            className="avatar avatar-sm rounded-circle"
                          >
                            <Image
                              src={team4}
                              alt="Team member"
                              width={32}
                              height={32}
                              className="rounded-circle"
                            />
                          </a>
                          <a
                            href="#"
                            className="avatar avatar-sm rounded-circle"
                          >
                            <Image
                              src={team1}
                              alt="Team member"
                              width={32}
                              height={32}
                              className="rounded-circle"
                            />
                          </a>
                        </div>
                        <p className="font-weight-bold text-white text-sm mb-0 ms-2">
                          Join 2.5M+ users
                        </p>
                      </div>
                    </div>
                    <div className="text-start position-absolute fixed-bottom ms-7 mb-4">
                      <h6 className="text-white text-sm mb-5">
                        Copyright © 2025 Collabify.
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side with form */}
              <div className="col-md-4 d-flex flex-column mx-auto">
                <div className="card card-plain mt-7">
                  <div className="card-header pb-0 text-left bg-transparent">
                    <h3 className="font-weight-black text-dark display-6">
                      Sign up
                    </h3>
                    <p className="mb-0">
                      Nice to meet you! Please enter your details.
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
                      <div className="row">
                        <div className="col-md-6">
                          <label>First Name</label>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="first name"
                              name="firstname"
                              value={formData.firstname}
                              onChange={handleInputChange}
                              required
                              disabled={loading}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label>Last Name</label>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="last name"
                              name="lastname"
                              value={formData.lastname}
                              onChange={handleInputChange}
                              required
                              disabled={loading}
                            />
                          </div>
                        </div>
                      </div>

                      <label>Role</label>
                      <div className="mb-3">
                        <input
                          className="form-control"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          required
                          disabled={loading}
                          type="text"
                        ></input>
                      </div>

                      <label>Email Address</label>
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email address"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled={loading}
                        />
                      </div>

                      <label>Password</label>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Create a password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          disabled={loading}
                          minLength="6"
                        />
                      </div>

                      <div className="form-check form-check-info text-left mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleInputChange}
                          id="flexCheckDefault"
                          disabled={loading}
                        />
                        <label
                          className="font-weight-normal text-dark mb-0"
                          htmlFor="flexCheckDefault"
                        >
                          I agree the{" "}
                          <a href="#" className="text-dark font-weight-bold">
                            Terms and Conditions
                          </a>
                          .
                        </label>
                      </div>

                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-dark w-100 mt-4 mb-3"
                          disabled={loading}
                        >
                          {loading ? "Creating Account..." : "Sign up"}
                        </button>
                        <button
                          type="button"
                          className="btn btn-white btn-icon w-100 mb-3"
                          disabled={loading}
                        >
                          <span className="btn-inner--icon me-1">
                            <Image
                              src={google}
                              alt="google-logo"
                              width={20}
                              height={20}
                              className="w-5"
                            />
                          </span>
                          <span className="btn-inner--text">
                            Sign up with Google
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center pt-0 px-lg-2 px-1">
                    <p className="mb-4 text-xs mx-auto">
                      Already have an account?
                      <Link
                        href="/Login"
                        className="text-dark font-weight-bold ms-1"
                      >
                        Sign in
                      </Link>
                    </p>
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
