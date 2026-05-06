import React from "react";

function About() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="kicker">About</p>
          <h1>About Knight Shift Coffee</h1>
          <p className="hero-text">
            We believe great coffee should not feel complicated. Knight Shift
            Coffee &amp; Roastery was created to make it easier to explore,
            understand, and enjoy coffee.
          </p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container two-column">
          <div>
            <p className="kicker">Our Story</p>
            <h2 className="section-title">A student-built specialty coffee concept</h2>
            <p>
              Knight Shift Coffee &amp; Roastery started with a simple idea:
              coffee should be both high-quality and approachable.
            </p>
            <p>
              Too often, finding the right coffee feels overwhelming, with
              unfamiliar terms, unclear flavor profiles, and too many options.
            </p>
            <p className="quote-block">
              Whether you prefer a bold dark roast or want to experiment with
              unroasted beans, our goal is to make every step feel simple and
              enjoyable.
            </p>
          </div>

          <div className="info-card">
            <h3>Our Mission</h3>
            <p>
              To make coffee more accessible, more understandable, and more
              enjoyable.
            </p>
            <ul>
              <li>Clarity over complexity</li>
              <li>Quality without intimidation</li>
              <li>Discovery through learning</li>
              <li>Confidence in every cup</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="kicker">Sourcing</p>
          <h2 className="section-title">Transparency matters</h2>

          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="step-card h-100">
                <h3>Origin clarity</h3>
                <p>
                  We prioritize transparency in origin so you can better understand
                  each coffee.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="step-card h-100">
                <h3>Process detail</h3>
                <p>
                  We focus on communicating useful information without overwhelming
                  the customer.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="step-card h-100">
                <h3>Producer respect</h3>
                <p>
                  We value high-quality beans and responsible sourcing practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <p className="kicker">Sustainability</p>
          <h2 className="section-title">Sustainability and ethics</h2>
          <p>
            Sustainability is an important part of how we operate. We aim to
            support responsible farming practices and reduce unnecessary waste.
          </p>
          <p>
            From sourcing beans grown with care to using simple, efficient
            packaging, we take small but meaningful steps to minimize our impact.
          </p>
        </div>
      </section>
    </>
  );
}

export default About;