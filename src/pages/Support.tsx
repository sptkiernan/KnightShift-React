import React, { FormEvent, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function Support() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactMessage, setContactMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setContactMessage(null);

    const { error } = await supabase
      .from("contact_inquiries")
      .insert([{ name: formData.name, email: formData.email, message: formData.message }]);

    setIsSubmitting(false);

    if (error) {
      setContactMessage({
        text: "Something went wrong submitting your message. Please try again or email us directly.",
        type: "error",
      });
    } else {
      setContactMessage({
        text: "Thank you for your inquiry. Please expect a response within the next 24–48 hours.",
        type: "success",
      });
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="kicker">Support</p>
          <h1>Get answers quickly and confidently.</h1>
          <p className="hero-text">
            We're here to help. Whether you have questions about products, orders, or brewing, you'll find quick
            answers below—or you can reach out to us directly.
          </p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <p className="kicker">Contact</p>
          <h2 className="section-title">Get in touch</h2>

          <div className="row g-4">
            <div className="col-12 col-lg-5">
              <div className="info-card h-100">
                <h3>Contact Details</h3>
                <p>Email: hello@knightshiftcoffee.com</p>
                <p>Phone: (555) 201-ROAST</p>
                <p>Hours: Mon–Fri, 9 AM–5 PM ET</p>
              </div>
            </div>

            <div className="col-12 col-lg-7">
              <div className="info-card h-100">
                <h3>Contact Form</h3>

                {/* Show success state instead of form once submitted */}
                {contactMessage?.type === "success" ? (
                  <div className="order-msg-success" style={{ marginTop: 0 }}>
                    {contactMessage.text}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="form-grid">
                    <div>
                      <label htmlFor="name">Name</label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="full-width">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    <div className="full-width">
                      <button type="submit" className="btn btn-brand" disabled={isSubmitting}>
                        {isSubmitting ? "Sending…" : "Send Message"}
                      </button>
                      {contactMessage?.type === "error" && (
                        <p className="order-msg-error" style={{ marginTop: "0.75rem" }}>
                          {contactMessage.text}
                        </p>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="kicker">Shipping / Returns</p>
          <h2 className="section-title">Order Expectations</h2>
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div className="step-card h-100 support-feature-card">
                <h3>Processing</h3>
                <p>
                  Orders are typically processed within 1–2 business days. You will receive a confirmation email once
                  your order has been placed and another when it ships.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="step-card h-100 support-feature-card">
                <h3>Returns</h3>
                <p>
                  Because coffee is perishable, unopened accessory items can be returned within 30 days, while coffee
                  issues are handled case-by-case through support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <p className="kicker">Privacy Policy</p>
          <h2 className="section-title">What user data is collected?</h2>
          <p>
            We respect your privacy and are committed to protecting your information. Knight Shift Coffee only
            collects the information needed to process orders, respond to inquiries, and improve your experience.
          </p>
          <p>
            We may collect basic information such as your name, email address, and order details when you make a
            purchase or contact us. This information is used only to fulfill your request or provide support.
          </p>
          <p>
            We do not sell or share your personal information with third parties, except when necessary to process
            orders, such as shipping providers.
          </p>
          <p>
            Our site may use basic cookies to improve functionality and understand how users interact with the site.
            You can disable cookies in your browser settings if you prefer.
          </p>
          <p>If you have any questions about your data or how it is used, please contact us.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="kicker">Terms</p>
          <h2 className="section-title">Purchase Terms &amp; Restrictions</h2>
          <ul>
            <li>Product availability can change without notice.</li>
            <li>Pricing and promotions apply only while active.</li>
            <li>Customers are responsible for entering correct shipping details.</li>
          </ul>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <p className="kicker">Accessibility</p>
          <h2 className="section-title">Our Approach to Accessibility</h2>
          <p>We designed this site to be clear, readable, and easy to navigate for a wide range of users.</p>
          <h3>Accessibility Features</h3>
          <ul>
            <li>Clear navigation and consistent page structure</li>
            <li>Readable text and strong color contrast</li>
            <li>Responsive design for desktop, tablet, and mobile</li>
            <li>Semantic HTML and descriptive headings</li>
            <li>Labeled forms and keyboard-friendly interactions</li>
          </ul>
          <div className="info-card accessibility-note">
            <p className="accessibility-label">Ongoing Improvement</p>
            <p className="mb-0">
              We recognize that accessibility is an ongoing process, and we would continue improving the experience
              based on user feedback and testing.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Support;
