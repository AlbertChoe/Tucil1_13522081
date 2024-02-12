// Navbar.js
import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-indigo-600 text-white">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <span className="sr-only">Open main menu</span>
                            {/* Icon when menu is closed. */}
                            {!isMobileMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-lg font-bold hover:text-white">Cyberpunk 2077 Solver</Link>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <Link to="/" className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Full Manual</Link>
                                <Link to="/upload" className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">File Upload</Link>
                                <Link to="/auto" className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"> Auto Generate</Link>
                                <Link to="/howtouse" className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"> How to Use</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state. */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link to="/" className="hover:bg-indigo-700 text-white block px-3 py-2 rounded-md text-base font-medium">Full Manual</Link>
                    <Link to="/upload" className="hover:bg-indigo-700 text-white block px-3 py-2 rounded-md text-base font-medium">File Upload</Link>
                    <Link to="/auto" className="hover:bg-indigo-700 text-white block px-3 py-2 rounded-md text-base font-medium">Auto Generate</Link>
                    <Link to="/howtouse" className="hover:bg-indigo-700 text-white block px-3 py-2 rounded-md text-base font-medium">How to Use</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
