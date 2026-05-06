import React, { useMemo, useState } from "react";

type ProductCategory = "roasted" | "unroasted";

type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  description: string;
  tags: string[];
  price: number;
};

type Reward = {
  image: string;
  code: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Night Watch Espresso",
    category: "roasted",
    description: "Chocolate, cherry, and toffee with a syrupy body.",
    tags: ["Colombia", "Espresso", "Medium-dark"],
    price: 18,
  },
  {
    id: 2,
    name: "Scarlet Dawn",
    category: "roasted",
    description: "Berry-forward single origin for pour-over and drip.",
    tags: ["Ethiopia", "Pour-over", "Light"],
    price: 20,
  },
  {
    id: 3,
    name: "Green Origin Sampler",
    category: "unroasted",
    description: "Three 8 oz lots for home roasters comparing process and terroir.",
    tags: ["Mixed origins", "Home roasting", "Sampler"],
    price: 24,
  },
  {
    id: 4,
    name: "Guatemala Huehuetenango",
    category: "unroasted",
    description: "Citrus, cocoa nib, and cane sugar for flexible roast development.",
    tags: ["Guatemala", "Washed", "Green coffee"],
    price: 17,
  },
];

const rewards: Reward[] = [
  { image: "/images/5.png", code: "KS5TY" },
  { image: "/images/10.png", code: "TY10" },
  { image: "/images/15.png", code: "15KS" },
  { image: "/images/20.png", code: "K20S" },
  { image: "/images/25.png", code: "KS25" },
  { image: "/images/BOGO.png", code: "KSBOGO" },
];

function Shop() {
  const [filter, setFilter] = useState<"all" | ProductCategory>("all");
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState(0);
  const [reward, setReward] = useState<Reward | null>(null);
  const [cartItem, setCartItem] = useState<Product>(products[0]);

  const [shippingForm, setShippingForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [paymentForm, setPaymentForm] = useState({
    card: "",
    exp: "",
    cvv: "",
    discountCode: "",
  });

  const filteredProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((product) => product.category === filter);
  }, [filter]);

  const subtotal = cartItem.price * quantity;
  const shipping = 6;
  const total = subtotal + shipping;

  const revealReward = () => {
    if (reward) return;
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    setReward(randomReward);
  };

  const handleNextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      alert("Demo complete: your order is ready for review.");
    }
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="kicker">Shop</p>
          <h1>Browse our broad selection of beans</h1>
          <p className="hero-text">
            Small-batch beans crafted for focus, flavor, and late hours.
          </p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="section-header-row">
            <div>
              <p className="kicker">Catalog</p>
              <h2 className="section-title">Roasted + unroasted products</h2>
              <p>Use filters to switch between roasted and unroasted options.</p>
            </div>

            <div className="filter-toolbar">
              <button
                className={`btn btn-outline-brand ${filter === "all" ? "selected" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`btn btn-outline-brand ${filter === "roasted" ? "selected" : ""}`}
                onClick={() => setFilter("roasted")}
              >
                Roasted
              </button>
              <button
                className={`btn btn-outline-brand ${filter === "unroasted" ? "selected" : ""}`}
                onClick={() => setFilter("unroasted")}
              >
                Unroasted
              </button>
            </div>
          </div>

          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div className="col-12 col-md-6 col-xl-3" key={product.id}>
                <article className="product-card product-card-clean h-100">
                  <div className="product-card-top">
                    <span className="badge-soft product-badge">{product.category}</span>

                    <h3 className="product-title">{product.name}</h3>

                    <p className="product-description">{product.description}</p>

                    <div className="product-meta">
                      {product.tags.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="product-card-bottom">
                    <p className="price product-price">${product.price.toFixed(2)}</p>

                    <button
                      className="btn btn-brand product-button"
                      onClick={() => {
                        setCartItem(product);
                        setQuantity(1);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container center-content">
          <p className="kicker">Take a Chance</p>
          <h2 className="section-title">Win a reward!</h2>
          <p className="game-text">
            Click the button for a chance to win a free bag of roasted coffee or
            a discount on your current purchase.
          </p>

          {!reward && (
            <img
              src="/images/logobag.png"
              alt="Coffee bag with Knight Shift logo"
              className="game-bag"
            />
          )}

          {reward && (
            <div className="reward-box">
              <img src={reward.image} alt="Discount reward" className="reward-image" />
              <p>Your reward:</p>
              <p className="reward-code">{reward.code}</p>
              <p>Enter this code at checkout.</p>
            </div>
          )}

          {!reward && (
            <button className="btn btn-brand" onClick={revealReward}>
              Take a Chance
            </button>
          )}
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-lg-8">
              <div className="info-card h-100">
                <h2>Cart</h2>
                <h3>{cartItem.name}</h3>
                <p>{cartItem.category === "roasted" ? "Roasted coffee" : "Unroasted coffee"}</p>
                <p>{cartItem.description}</p>

                <div className="qty-controls">
                  <button
                    className="btn btn-outline-brand"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  >
                    −
                  </button>
                  <span className="qty-display">{quantity}</span>
                  <button
                    className="btn btn-outline-brand"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="info-card h-100">
                <h2>Order Summary</h2>
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Shipping: ${shipping.toFixed(2)}</p>
                <p className="price">Total: ${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="kicker">Checkout</p>
          <h2 className="section-title">Simplified Checkout</h2>

          <div className="step-indicator">
            <div className={`step-pill ${step === 0 ? "active" : ""}`}>1. Shipping</div>
            <div className={`step-pill ${step === 1 ? "active" : ""}`}>2. Payment</div>
            <div className={`step-pill ${step === 2 ? "active" : ""}`}>3. Review</div>
          </div>

          <div className="info-card">
            {step === 0 && (
              <div className="form-grid">
                <div>
                  <label>Full name</label>
                  <input
                    type="text"
                    value={shippingForm.name}
                    onChange={(e) =>
                      setShippingForm({ ...shippingForm, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    value={shippingForm.email}
                    onChange={(e) =>
                      setShippingForm({ ...shippingForm, email: e.target.value })
                    }
                  />
                </div>
                <div className="full-width">
                  <label>Address</label>
                  <input
                    type="text"
                    value={shippingForm.address}
                    onChange={(e) =>
                      setShippingForm({ ...shippingForm, address: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="form-grid">
                <div className="full-width">
                  <label>Card number</label>
                  <input
                    type="text"
                    value={paymentForm.card}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, card: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Exp.</label>
                  <input
                    type="text"
                    value={paymentForm.exp}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, exp: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>CVV</label>
                  <input
                    type="text"
                    value={paymentForm.cvv}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, cvv: e.target.value })
                    }
                  />
                </div>
                <div className="full-width">
                  <label>Discount code</label>
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={paymentForm.discountCode}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        discountCode: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3>Review Order</h3>
                <p>{quantity} × {cartItem.name}</p>                
                <p>Ship to: {shippingForm.address || "No address entered yet"}</p>
                <p>Email: {shippingForm.email || "No email entered yet"}</p>
                <p className="price">Total: ${total.toFixed(2)}</p>
              </div>
            )}

            <button className="btn btn-brand top-space" onClick={handleNextStep}>
              {step === 2 ? "Place Order" : "Continue"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Shop;