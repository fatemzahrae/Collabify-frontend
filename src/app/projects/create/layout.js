'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import "@/assets/css/nucleo-icons.css";
import "@/assets/css/nucleo-svg.css";
import "@/assets/css/corporate-ui-dashboard.css?v=1.0.0";
import "@/assets/css/corporate-ui-dashboard.min.css";
import Image from "next/image";
import logo from "@/assets/img/CollabifyMauve-removebg.png";

export default function AuthLayout({ children }) {
    const pathname = usePathname();
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }, []);
    return (
        <>
            <div className="container position-sticky z-index-sticky top-0">
                <div className="row">
                    <div className="col-12">
                        {/* Navbar */}
                        <nav className="navbar navbar-expand-lg blur border-radius-sm top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
                            <div className="container-fluid px-1">
                                <Image src={logo} alt="logo" height={25} width={25} style={{ MarginRight: "20px" }} />
                                <a className="navbar-brand font-weight-bolder ms-lg-0" href="/" style={{ fontSize: "1rem" }} >Collabify</a>
                                <button
                                    className="navbar-toggler shadow-none ms-2"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navigation"
                                    aria-controls="navigation"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon mt-2">
                                        <span className="navbar-toggler-bar bar1"></span>
                                        <span className="navbar-toggler-bar bar2"></span>
                                        <span className="navbar-toggler-bar bar3"></span>
                                    </span>
                                </button>
                                <div className="collapse navbar-collapse" id="navigation">
                                    <ul className="navbar-nav mx-auto ms-xl-auto">
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center me-2" href="/dashboard">
                                                <svg width="14" height="14" viewBox="0 0 26 26" fill="currentColor" className={`me-1 ${pathname === '/dashboard' ? 'text-dark' : 'opacity-6'}`} xmlns="http://www.w3.org/2000/svg">
                                                    <g transform="translate(1 1)">
                                                        <path d="M0,1.714C0,0.768,0.768,0,1.714,0H22.286C23.233,0,24,0.768,24,1.714V5.143C24,6.09,23.233,6.857,22.286,6.857H1.714C0.768,6.857,0,6.09,0,5.143V1.714Z" />
                                                        <path d="M0,12C0,11.053,0.768,10.286,1.714,10.286H12C12.947,10.286,13.714,11.053,13.714,12V22.286C13.714,23.233,12.947,24,12,24H1.714C0.768,24,0,23.233,0,22.286V12Z" />
                                                        <path d="M18.857,10.286C17.91,10.286,17.143,11.053,17.143,12V22.286C17.143,23.233,17.91,24,18.857,24H22.286C23.233,24,24,23.233,24,22.286V12C24,11.053,23.233,10.286,22.286,10.286H18.857Z" />
                                                    </g>
                                                </svg>
                                                <span className={`${pathname === '/dashboard' ? 'text-dark font-weight-bold' : ''}`}>Dashboard</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center me-2" href="/profile">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={`me-1 ${pathname === '/profile' ? 'text-dark' : 'opacity-6'}`} xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                                </svg>
                                                <span className={`${pathname === '/profile' ? 'text-dark font-weight-bold' : ''}`}>Profile</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center me-2" href="/register">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={`me-1 ${pathname === '/register' ? 'text-dark' : 'opacity-6'}`} xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" />
                                                </svg>
                                                <span className={`${pathname === '/register' ? 'text-dark font-weight-bold' : ''}`}>Sign Up</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center me-2" href="/Login">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={`me-1 ${pathname === '/Login' ? 'text-dark' : 'opacity-6'}`} xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z" />
                                                </svg>
                                                <span className={`${pathname === '/Login' ? 'text-dark font-weight-bold' : ''}`}>Sign In</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        {/* End Navbar */}
                    </div>
                </div>
            </div>
            {children}
        </>
    );
}