import React from "react";
import { PageName } from "../App";

type NavbarProps = {
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
};

function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const navItems: PageName[] = ["home", "shop", "learn", "about", "support"];

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <button
          className="brand-button"
          onClick={() => onNavigate("home")}
          aria-label="Go to home page"
        >
          <img
            src="/images/KSCLogo.png"
            alt="Knight Shift Coffee logo"
            className="brand-logo"
          />
          <span className="brand-text">Knight Shift Coffee</span>
        </button>

        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item}
              className={`nav-link ${currentPage === item ? "active" : ""}`}
              onClick={() => onNavigate(item)}
              aria-current={currentPage === item ? "page" : undefined}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;