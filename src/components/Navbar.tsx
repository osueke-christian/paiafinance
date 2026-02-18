import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on a link
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Partnership */}
          <NavLink to="/" onClick={closeMobileMenu}>
            <div className="flex items-center space-x-4">     
              <img 
                src="/images/paiaLogo.png" 
                alt="logo"
                className="h-8 sm:h-10 w-auto"
              />
              
              <img 
                src="/images/financeLogo.svg" 
                alt="logo"
                className="h-8 sm:h-16 w-auto"
              />
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/services" 
              className="text-[#141416] font-medium pb-2 pt-2 px-3 hover:bg-[#1680EB] hover:text-[#ffffff] hover:rounded-[12px] transition-all duration-300 hover:shadow-lg"
            >
              Services
            </NavLink>
            <NavLink 
              to="/why-us" 
              className="text-[#141416] font-medium pb-2 pt-2 px-3 hover:bg-[#1680EB] hover:text-[#ffffff] hover:rounded-[12px] transition-all duration-300 hover:shadow-lg"
            >
              Why Us
            </NavLink>
            <NavLink 
              to="/" 
              className="bg-[#1680EB] hover:bg-blue-700 text-white px-4 py-2 rounded-[12px] text-[14px] font-medium pulse-button"
            >
              Get Started
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                // Close icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-white w-full rounded-lg shadow-lg mt-2 py-4 border border-gray-100">
            <div className="flex flex-col space-y-2">
              <NavLink 
                to="/services" 
                onClick={closeMobileMenu}
                className={({ isActive }) => 
                  `block px-6 py-3 text-[#141416] font-medium transition-all duration-300 hover:bg-[#1680EB] hover:text-white w-full text-left ${
                    isActive ? 'bg-[#1680EB] text-white' : ''
                  }`
                }
              >
                Services
              </NavLink>
              
              <NavLink 
                to="/why-us" 
                onClick={closeMobileMenu}
                className={({ isActive }) => 
                  `block px-6 py-3 text-[#141416] font-medium transition-all duration-300 hover:bg-[#1680EB] hover:text-white w-full text-left ${
                    isActive ? 'bg-[#1680EB] text-white' : ''
                  }`
                }
              >
                Why Us
              </NavLink>
              
              <div className="px-6 py-2">
                <NavLink 
                  to="/" 
                  onClick={closeMobileMenu}
                  className="block bg-[#1680EB] hover:bg-blue-700 text-white px-4 py-3 rounded-[12px] text-[14px] font-medium text-center transition-all duration-300 w-full"
                >
                  Get Started
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-[-1] md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </nav>
  );
}

export default Navbar;