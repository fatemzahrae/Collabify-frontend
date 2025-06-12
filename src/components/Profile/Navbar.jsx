import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import team2 from "@/assets/img/team-2.jpg";

const Navbar = () => {
    return (
        <nav className="navbar bg-slate-900 navbar-expand-lg flex-wrap top-0 px-0 py-0">
            {/* Main Navigation */}
            <div className="container py-2">
                {/* Brand */}
                <nav aria-label="breadcrumb">
                    <div className="d-flex align-items-center">
                        <span className="px-3 font-weight-bold text-lg text-white me-4">Collabify</span>
                    </div>
                </nav>

                {/* Right Menu */}
                <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                    <ul className="navbar-nav ms-md-auto justify-content-end">
                        {/* Mobile Menu Button */}
                        <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                            <a href="#" className="nav-link text-white p-0" id="iconNavbarSidenav">
                                <div className="sidenav-toggler-inner">
                                    <i className="sidenav-toggler-line bg-white"></i>
                                    <i className="sidenav-toggler-line bg-white"></i>
                                    <i className="sidenav-toggler-line bg-white"></i>
                                </div>
                            </a>
                        </li>

                        {/* Settings Button */}
                        <li className="nav-item px-3 d-flex align-items-center">
                            <a href="#" className="nav-link text-white p-0">
                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" className="fixed-plugin-button-nav cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd"></path>
                                </svg>
                            </a>
                        </li>

                        {/* Notifications Dropdown */}
                        <li className="nav-item dropdown pe-2 d-flex align-items-center">
                            <a href="#" className="nav-link text-white p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="cursor-pointers">
                                    <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                            {/* Dropdown menu will be added as needed */}
                        </li>

                        {/* User Avatar */}
                        <li className="nav-item d-flex align-items-center ps-2">
                            <a href="#" className="nav-link text-white font-weight-bold px-0">
                                <div className="avatar avatar-sm position-relative">
                                    <Image src={team2} alt="profile_image" width={32} height={32} className="w-100 border-radius-md" />
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Secondary Navigation */}
            <hr className="horizontal w-100 my-0 dark" />
            <div className="container pb-3 pt-3">
                <ul className="navbar-nav d-none d-lg-flex">
                    <li className="nav-item border-radius-sm px-3 py-3 me-2 bg-slate-800 d-flex align-items-center">
                        <Link href="/profile" className="nav-link text-white p-0">Profile</Link>
                    </li>
                    <li className="nav-item border-radius-sm px-3 py-3 me-2 d-flex align-items-center">
                        <Link href="/dashboard" className="nav-link text-white p-0">Dashboard</Link>
                    </li>
                    <li className="nav-item border-radius-sm px-3 py-3 me-2 d-flex align-items-center">
                        <Link href="/projects" className="nav-link text-white p-0">
                            Projects
                        </Link>
                    </li>
                    <li className="nav-item border-radius-sm px-3 py-3 me-2 d-flex align-items-center">
                        <Link href="/register" className="nav-link text-white p-0">
                            Settings
                        </Link>
                    </li>
                </ul>

                {/* Search Box */}
                <div className="ms-md-auto p-0 d-flex align-items-center w-sm-20">
                    <div className="input-group border-dark">
                        <span className="input-group-text border-dark bg-dark text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="opacity-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </span>
                        <input type="text" className="form-control border-dark bg-dark" placeholder="Search" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;