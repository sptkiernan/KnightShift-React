import React from "react";
import { PageName } from "../App";

type HomeProps = {
  onNavigate: (page: PageName) => void;
};

function Home({ onNavigate }: HomeProps) {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="kicker">Specialty beans and brews</p>
          <h1>Roasted and unroasted coffee, all in one place.</h1>
          <p className="hero-text">
            Knight Shift Coffee &amp; Roastery is designed for home brewers and
            hobbyist roasters who want transparent sourcing, approachable
            education, and a smoother path from discovery to checkout.
          </p>

          <div className="button-row">
            <button className="btn btn-brand" onClick={() => onNavigate("shop")}>
              Start Shopping
            </button>
            <button
              className="btn btn-outline-light"
              onClick={() => onNavigate("about")}
            >
              Learn More About Us
            </button>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="row g-4">

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="info-card h-100 d-flex flex-column">
                <div className="icon-circle">
                  <i className="bi bi-bag"></i>
                </div>

                <h2>Shop</h2>
                <p>
                  Browse roasted and unroasted beans, view a sample cart, and try a
                  simplified checkout experience.
                </p>

                <div className="mt-auto">
                  <button
                    className="btn btn-outline-brand"
                    onClick={() => onNavigate("shop")}
                  >
                    Go to Shop
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="info-card h-100 d-flex flex-column">
                <div className="icon-circle">
                  <i className="bi bi-book"></i>
                </div>

                <h2>Learn</h2>
                <p>
                  Explore brew methods, roasting basics, and coffee vocabulary to
                  better understand what you’re drinking.
                </p>

                <div className="mt-auto">
                  <button
                    className="btn btn-outline-brand"
                    onClick={() => onNavigate("learn")}
                  >
                    Go to Learn
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="info-card h-100 d-flex flex-column">
                <div className="icon-circle">
                  <i className="bi bi-info-circle"></i>
                </div>

                <h2>About</h2>
                <p>
                  Learn about our mission, sourcing approach, and how Knight Shift
                  makes coffee more approachable.
                </p>

                <div className="mt-auto">
                  <button
                    className="btn btn-outline-brand"
                    onClick={() => onNavigate("about")}
                  >
                    Go to About
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="info-card h-100 d-flex flex-column">
                <div className="icon-circle">
                  <i className="bi bi-life-preserver"></i>
                </div>

                <h2>Support</h2>
                <p>
                  Contact us, review shipping information, and explore accessibility
                  and privacy details.
                </p>

                <div className="mt-auto">
                  <button
                    className="btn btn-outline-brand"
                    onClick={() => onNavigate("support")}
                  >
                    Go to Support
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row g-4 align-items-start">

            <div className="col-12 col-lg-5">
              <p className="kicker">Why choose us</p>
              <h2 className="section-title">
                Built for transparency, clarity, and craft.
              </h2>

              <p>
                We make it easy to understand what you’re buying—and why it’s worth it.
              </p>
            </div>

            <div className="col-12 col-lg-7">
              <div className="row g-4">
                <div className="col-6">
                  <div className="step-card feature-card h-100">
                    <h3>Quality-first</h3>
                    <p>Coffee selected for flavor, traceability, and home use.</p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="step-card feature-card h-100">
                    <h3>Scannable details</h3>
                    <p>
                      Origin, tasting notes, process, and brew recommendations.
                    </p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="step-card feature-card h-100">
                    <h3>Flexible journey</h3>
                    <p>
                      Customers can learn before they buy or move directly into checkout.
                    </p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="step-card feature-card h-100">
                    <h3>Accessible by design</h3>
                    <p>
                      Clear structure, strong contrast, and keyboard-friendly interaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Home;