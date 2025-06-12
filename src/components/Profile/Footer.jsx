// src/components/layout/Footer.jsx
'use client';

import "@/assets/css/nucleo-icons.css";
import "@/assets/css/nucleo-svg.css";
import "@/assets/css/corporate-ui-dashboard.css?v=1.0.0";

export default function Footer() {
    return (
        <footer className="footer pt-3">
            <div className="container-fluid">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-6 mb-lg-0 mb-4">
                        <div className="copyright text-center text-xs text-muted text-lg-start">
                            Copyright © {new Date().getFullYear()} Corporate UI by
                            <a href="https://www.creative-tim.com" className="text-secondary ms-1" target="_blank" rel="noopener noreferrer">
                                Creative Tim
                            </a>.
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                            <li className="nav-item">
                                <a href="https://www.creative-tim.com" className="nav-link text-xs text-muted" target="_blank" rel="noopener noreferrer">
                                    Creative Tim
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="https://www.creative-tim.com/presentation" className="nav-link text-xs text-muted" target="_blank" rel="noopener noreferrer">
                                    About Us
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="https://www.creative-tim.com/blog" className="nav-link text-xs text-muted" target="_blank" rel="noopener noreferrer">
                                    Blog
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="https://www.creative-tim.com/license" className="nav-link text-xs pe-0 text-muted" target="_blank" rel="noopener noreferrer">
                                    License
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}