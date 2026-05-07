import React, { useState, useEffect, useRef } from "react";
import { PageName } from "../App";

type NavbarProps = {
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
};

function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const navItems: PageName[] = ["home", "shop", "learn", "about", "support"];
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Close menu and navigate
  const handleNavigate = (page: PageName) => {
    setMenuOpen(false);
    onNavigate(page);
  };

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        {/* Brand */}
        <button
          className="brand-button"
          onClick={() => handleNavigate("home")}
          aria-label="Go to home page"
        >
          <img
            src="/images/KSCLogo.png"
            alt="Knight Shift Coffee logo"
            className="brand-logo"
          />
          <span className="brand-text">Knight Shift Coffee</span>
        </button>

        {/* Desktop nav links */}
        <div className="nav-links nav-links-desktop">
          {navItems.map((item) => (
            <button
              key={item}
              className={`nav-link ${currentPage === item ? "active" : ""}`}
              onClick={() => handleNavigate(item)}
              aria-current={currentPage === item ? "page" : undefined}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {/* Hamburger toggle — mobile only */}
        <button
          ref={toggleRef}
          className="nav-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`hamburger-icon ${menuOpen ? "open" : ""}`}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="mobile-menu"
          role="menu"
        >
          {navItems.map((item) => (
            <button
              key={item}
              className={`mobile-nav-link ${currentPage === item ? "active" : ""}`}
              onClick={() => handleNavigate(item)}
              aria-current={currentPage === item ? "page" : undefined}
              role="menuitem"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
