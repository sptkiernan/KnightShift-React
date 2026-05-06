import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Support from "./pages/Support";
import Learn from "./pages/Learn";

export type PageName = "home" | "about" | "shop" | "support" | "learn";

function App() {
  const [currentPage, setCurrentPage] = useState<PageName>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "about":
        return <About />;
      case "shop":
        return <Shop />;
      case "support":
        return <Support />;
      case "learn":
        return <Learn />;
      case "home":
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main id="main-content">{renderPage()}</main>

      <Footer />
    </>
  );
}

export default App;