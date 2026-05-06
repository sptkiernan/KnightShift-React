import React, { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "Should I buy roasted or unroasted beans?",
    answer:
      "Buy roasted if you want to brew right away. Buy unroasted if you roast at home and want more control over development.",
  },
  {
    question: "How should I store my coffee?",
    answer:
      "Store your coffee in an airtight container in a cool, dry place. Avoid the fridge or freezer, since moisture can affect flavor.",
  },
  {
    question: "How long does coffee stay fresh?",
    answer:
      "Roasted coffee is usually best within 2–4 weeks after opening. Unroasted beans last much longer when stored properly.",
  },
];

function Learn() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(index === openIndex ? -1 : index);
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="kicker">Learn</p>
          <h1>Discover Coffee, Your Way</h1>
          <p className="hero-text">
            From brew methods to roast profiles, explore what makes each cup
            unique and find what you actually love drinking.
          </p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <p className="kicker">Brewing</p>
          <h2 className="section-title">Match bean style to brew method</h2>

          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="step-card h-100">
                <h3>Pour-over</h3>
                <p>
                  Choose light to medium roasts with floral or citrus notes. Use a
                  medium grind and about a 1:16 coffee-to-water ratio.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="step-card h-100">
                <h3>French Press</h3>
                <p>
                  Best for chocolatey, nutty coffees with a heavier body. Use a
                  coarse grind and steep for about four minutes.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="step-card h-100">
                <h3>Espresso</h3>
                <p>
                  Look for coffees with sweetness and structure. Use a finer grind
                  and a tighter brew ratio for a concentrated cup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row g-4 align-items-start">

            <div className="col-12 col-lg-7">
              <p className="kicker">Roasting</p>
              <h2 className="section-title">Quick guide for home roasters</h2>

              <p>
                Roasting your own coffee gives you more control over flavor and
                freshness. While it can seem technical at first, the basics are
                simple enough for beginners to understand.
              </p>

              <h3>1. Start with Green Beans</h3>
              <p>
                Unroasted beans last longer than roasted coffee and let you decide
                how light or dark you want the final roast to be.
              </p>

              <h3>2. Apply Heat Evenly</h3>
              <p>
                The goal is to roast the beans consistently. This can be done with
                a home roaster, stovetop method, or even an oven.
              </p>

              <h3>3. Watch for Key Stages</h3>
              <ul>
                <li>
                  <strong>Drying Stage:</strong> Beans turn yellow and begin to
                  lose moisture.
                </li>
                <li>
                  <strong>First Crack:</strong> A popping sound that signals a
                  light roast stage.
                </li>
                <li>
                  <strong>Second Crack:</strong> A darker roast with bolder flavors.
                </li>
              </ul>

              <h3>4. Cool the Beans Quickly</h3>
              <p>
                Once the beans reach your desired roast, remove them from heat and
                cool them quickly to stop the process.
              </p>

              <h3>5. Let Them Rest</h3>
              <p>
                Freshly roasted beans release gases for about 12–24 hours. Giving
                them a little rest helps improve flavor and consistency.
              </p>
            </div>

            <div className="col-12 col-lg-5">
              <div className="info-card h-100 roasting-card">
                <h3>Home Roasting Tips</h3>
                <ul>
                  <li>Start with small batches</li>
                  <li>Use good ventilation</li>
                  <li>Keep beans moving</li>
                  <li>Track time and temperature</li>
                  <li>Experiment with roast levels</li>
                </ul>

                <h3>What You’ll Need</h3>
                <ul>
                  <li>Green coffee beans</li>
                  <li>Heat source (roaster, stovetop, oven)</li>
                  <li>Stirring tool or drum</li>
                  <li>Cooling tray or colander</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <p className="kicker">Glossary</p>
          <h2 className="section-title">Coffee terms at a glance</h2>

          <div className="row g-4">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="step-card h-100">
                <h3>Body</h3>
                <p>The weight or texture of the coffee on the palate.</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="step-card h-100">
                <h3>Washed</h3>
                <p>A processing method that often produces clean, bright cups.</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="step-card h-100">
                <h3>First Crack</h3>
                <p>
                  The stage in roasting when beans audibly expand and release steam.
                </p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="step-card h-100">
                <h3>Terroir</h3>
                <p>How geography, climate, and farming conditions shape flavor.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="kicker">FAQ</p>
          <h2 className="section-title">Common questions</h2>

          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div className="faq-item" key={item.question}>
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  {item.question}
                </button>

                {openIndex === index && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Learn;