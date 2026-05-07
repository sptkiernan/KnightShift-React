import React, { useMemo, useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { submitOrder, getOrdersByEmail } from "../services/orderService";

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
  // ── Roasted ──────────────────────────────────────────────
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
    id: 5,
    name: "Brass Compass Blend",
    category: "roasted",
    description: "Brown sugar, toasted walnut, and mild citrus zest. A smooth, balanced everyday drinker.",
    tags: ["Brazil / Honduras", "Drip", "Medium"],
    price: 16,
  },
  {
    id: 6,
    name: "Sulawesi Toraja",
    category: "roasted",
    description: "Dark fruit, cedar, and earthy spice with a full, velvety body.",
    tags: ["Indonesia", "French Press", "Dark"],
    price: 19,
  },
  {
    id: 7,
    name: "Costa Rica Tarrazú",
    category: "roasted",
    description: "Bright peach and red apple with clean sweetness and a crisp finish.",
    tags: ["Costa Rica", "Pour-over", "Light-medium"],
    price: 18,
  },
  {
    id: 8,
    name: "Midnight Velvet Decaf",
    category: "roasted",
    description: "Swiss Water Process decaf with caramel, dark chocolate, and a smooth, lingering finish.",
    tags: ["Colombia", "Decaf", "Medium-dark"],
    price: 17,
  },
  // ── Unroasted ─────────────────────────────────────────────
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
  {
    id: 9,
    name: "Ethiopia Yirgacheffe Gr. 1",
    category: "unroasted",
    description: "Jasmine, bergamot, and lemon verbena. A classic natural with exceptional clarity.",
    tags: ["Ethiopia", "Natural", "Green coffee"],
    price: 21,
  },
  {
    id: 10,
    name: "Brazil Cerrado Pulped Natural",
    category: "unroasted",
    description: "Milk chocolate, hazelnut, and soft dried plum. Roasts evenly and forgives beginner timing.",
    tags: ["Brazil", "Pulped natural", "Green coffee"],
    price: 14,
  },
  {
    id: 11,
    name: "Honduras SHG EP",
    category: "unroasted",
    description: "Brown sugar sweetness, light nougat, and gentle stonefruit. Versatile across roast levels.",
    tags: ["Honduras", "Washed", "Green coffee"],
    price: 13,
  },
  {
    id: 12,
    name: "Sumatra Mandheling DP",
    category: "unroasted",
    description: "Earthy, full-bodied, and complex with dark chocolate and subtle herbal notes.",
    tags: ["Indonesia", "Wet-hulled", "Green coffee"],
    price: 15,
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

type ShopTab = "catalog" | "cart" | "checkout" | "history";

const EMPTY_SHIPPING = { name: "", email: "", address: "" };
const EMPTY_PAYMENT = { card: "", exp: "", cvv: "", discountCode: "" };

function Shop() {
  const { items, dispatch, subtotal, itemCount } = useCart();

  const [filter, setFilter] = useState<"all" | ProductCategory>("all");
  const [activeTab, setActiveTab] = useState<ShopTab>("catalog");
  const [step, setStep] = useState(0);
  const [reward, setReward] = useState<Reward | null>(null);
  const [addedMap, setAddedMap] = useState<Record<number, boolean>>({});

  const [shippingForm, setShippingForm] = useState(EMPTY_SHIPPING);
  const [paymentForm, setPaymentForm] = useState(EMPTY_PAYMENT);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const [lookupEmail, setLookupEmail] = useState("");
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [isLooking, setIsLooking] = useState(false);
  const [lookupMessage, setLookupMessage] = useState<string | null>(null);

  // Measure navbar height so sticky tab bar sits flush beneath it
  const [navbarHeight, setNavbarHeight] = useState(85);
  useEffect(() => {
    const navbar = document.querySelector(".navbar") as HTMLElement | null;
    if (!navbar) return;
    const update = () => setNavbarHeight(navbar.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(navbar);
    return () => ro.disconnect();
  }, []);

  // Clear checkout state whenever the user navigates away from checkout tab
  useEffect(() => {
    if (activeTab !== "checkout") {
      setStep(0);
      setShippingForm(EMPTY_SHIPPING);
      setPaymentForm(EMPTY_PAYMENT);
      setOrderMessage(null);
    }
  }, [activeTab]);

  const filteredProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.category === filter);
  }, [filter]);

  const shipping = items.length > 0 ? 6 : 0;
  const total = subtotal + shipping;

  const handleAddToCart = (product: Product) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { id: product.id, name: product.name, category: product.category, price: product.price },
    });
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedMap((prev) => ({ ...prev, [product.id]: false })), 1400);
  };

  const revealReward = () => {
    if (reward) return;
    const r = rewards[Math.floor(Math.random() * rewards.length)];
    setReward(r);
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      setOrderMessage({ text: "Your cart is empty. Add some products before placing an order.", type: "error" });
      return;
    }
    setIsSubmitting(true);
    setOrderMessage(null);

    const { data, error } = await submitOrder({
      customer_name: shippingForm.name || "Guest",
      customer_email: shippingForm.email || "no-email@example.com",
      shipping_address: shippingForm.address || "No address provided",
      items,
      subtotal,
      shipping,
      total,
      discount_code: paymentForm.discountCode || undefined,
    });

    setIsSubmitting(false);

    if (error) {
      setOrderMessage({ text: `Order failed: ${error}. Please try again.`, type: "error" });
    } else if (data) {
      setOrderMessage({
        text: `Order #${data.id} placed successfully! A confirmation will be sent to ${shippingForm.email || "your email"}.`,
        type: "success",
      });
      dispatch({ type: "CLEAR_CART" });
      // Clear form state after successful order
      setStep(0);
      setShippingForm(EMPTY_SHIPPING);
      setPaymentForm(EMPTY_PAYMENT);
    }
  };

  const handleLookupOrders = async () => {
    if (!lookupEmail.trim()) { setLookupMessage("Please enter an email address."); return; }
    setIsLooking(true);
    setLookupMessage(null);
    setOrderHistory([]);
    const { data, error } = await getOrdersByEmail(lookupEmail.trim());
    setIsLooking(false);
    if (error) {
      setLookupMessage(`Error retrieving orders: ${error}`);
    } else if (!data || data.length === 0) {
      setLookupMessage("No orders found for that email address.");
    } else {
      setOrderHistory(data);
    }
  };

  // Navigate to a tab — block checkout if cart is empty
  const handleTabChange = (key: ShopTab) => {
    if (key === "checkout" && items.length === 0) {
      setActiveTab("cart");
      return;
    }
    setActiveTab(key);
  };

  const tabLabels: { key: ShopTab; label: string }[] = [
    { key: "catalog", label: "Catalog" },
    { key: "cart", label: `Cart${itemCount > 0 ? ` (${itemCount})` : ""}` },
    { key: "checkout", label: "Checkout" },
    { key: "history", label: "Order History" },
  ];

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <p className="kicker">Shop</p>
          <h1>Browse our broad selection of beans</h1>
          <p className="hero-text">Small-batch beans crafted for focus, flavor, and late hours.</p>
          {itemCount > 0 && (
            <div className="cart-badge-hero">
              🛒 {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
            </div>
          )}
        </div>
      </section>

      {/* ── Tab Navigation ─────────────────────────────────────── */}
      <div className="shop-tab-bar" style={{ top: navbarHeight }}>
        <div className="container">
          <div className="shop-tabs">
            {tabLabels.map(({ key, label }) => (
              <button
                key={key}
                className={`shop-tab${activeTab === key ? " active" : ""}`}
                onClick={() => handleTabChange(key)}
                aria-current={activeTab === key ? "page" : undefined}
                title={key === "checkout" && items.length === 0 ? "Add items to your cart first" : undefined}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CATALOG TAB ───────────────────────────────────────── */}
      {activeTab === "catalog" && (
        <>
          <section className="section section-light">
            <div className="container">
              <div className="section-header-row">
                <div>
                  <p className="kicker">Catalog</p>
                  <h2 className="section-title">Roasted + unroasted products</h2>
                  <p>Use filters to switch between roasted and unroasted options.</p>
                </div>
                <div className="filter-toolbar">
                  {(["all", "roasted", "unroasted"] as const).map((f) => (
                    <button
                      key={f}
                      className={`btn btn-outline-brand${filter === f ? " selected" : ""}`}
                      onClick={() => setFilter(f)}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="row g-4">
                {filteredProducts.map((product) => {
                  const isAdded = !!addedMap[product.id];
                  return (
                    <div className="col-12 col-md-6 col-xl-3" key={product.id}>
                      <article className="product-card h-100" style={{ display: "flex", flexDirection: "column", padding: "1.25rem" }}>
                        <div style={{ height: "2rem", display: "flex", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                          <span className="badge-soft">{product.category}</span>
                        </div>
                        <h3 style={{
                          color: "var(--brown)", margin: "0 0 0.75rem", fontSize: "1rem",
                          fontWeight: 700, lineHeight: 1.35, height: "2.7rem", overflow: "hidden",
                          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                        }}>
                          {product.name}
                        </h3>
                        <p style={{
                          margin: "0 0 1rem", fontSize: "0.9rem", lineHeight: 1.5,
                          height: "4.05rem", overflow: "hidden", display: "-webkit-box",
                          WebkitLineClamp: 3, WebkitBoxOrient: "vertical", color: "var(--ink)",
                        }}>
                          {product.description}
                        </p>
                        <div style={{
                          display: "flex", flexWrap: "wrap", gap: "0.4rem",
                          minHeight: "4.5rem", alignContent: "flex-start", marginBottom: "1rem",
                        }}>
                          {product.tags.map((tag) => (
                            <span className="tag" key={tag}>{tag}</span>
                          ))}
                        </div>
                        <div style={{ marginTop: "auto" }}>
                          <p style={{ margin: "0 0 0.75rem", fontWeight: 700, color: "var(--brown)", fontSize: "1.05rem" }}>
                            ${product.price.toFixed(2)}
                          </p>
                          <button
                            className={`btn add-cart-btn ${isAdded ? "btn-success-flash" : "btn-brand"}`}
                            onClick={() => handleAddToCart(product)}
                            disabled={isAdded}
                            aria-label={isAdded ? `${product.name} added to cart` : `Add ${product.name} to cart`}
                          >
                            {isAdded ? "✓ Added to Cart!" : "Add to Cart"}
                          </button>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container center-content">
              <p className="kicker">Take a Chance</p>
              <h2 className="section-title">Win a reward!</h2>
              <p className="game-text">
                Click the button for a chance to win a free bag of roasted coffee or a discount on your current purchase.
              </p>
              {!reward && <img src="/images/logobag.png" alt="Coffee bag with Knight Shift logo" className="game-bag" />}
              {reward && (
                <div className="reward-box">
                  <img src={reward.image} alt="Discount reward" className="reward-image" />
                  <p>Your reward:</p>
                  <p className="reward-code">{reward.code}</p>
                  <p>Enter this code at checkout.</p>
                </div>
              )}
              {!reward && <button className="btn btn-brand" onClick={revealReward}>Take a Chance</button>}
            </div>
          </section>
        </>
      )}

      {/* ── CART TAB ──────────────────────────────────────────── */}
      {activeTab === "cart" && (
        <section className="section section-light">
          <div className="container">
            <p className="kicker">Cart</p>
            <h2 className="section-title">Your items</h2>
            <div className="row g-4">
              <div className="col-12 col-lg-8">
                <div className="info-card h-100" style={{ display: "flex", flexDirection: "column", minHeight: "220px" }}>
                  {items.length === 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                      <p id="emptyCartMessage">Your cart is empty.</p>
                      <div style={{ marginTop: "auto", paddingBottom: "0.5rem", display: "flex", justifyContent: "center" }}>
                        <button className="btn btn-outline-brand" onClick={() => setActiveTab("catalog")}>
                          Browse the Catalog
                        </button>
                      </div>
                    </div>
                  ) : (
                    <ul className="cart-list">
                      {items.map((item) => (
                        <li className="cart-item" key={item.id}>
                          <div>
                            <strong>{item.name}</strong>
                            <p>{item.category === "roasted" ? "Roasted coffee" : "Unroasted coffee"}</p>
                            <p>
                              ${item.price.toFixed(2)} × {item.quantity} ={" "}
                              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                            </p>
                          </div>
                          <div className="cart-controls">
                            <button className="btn btn-outline-brand qty-btn" aria-label="Decrease quantity"
                              onClick={() => dispatch({ type: "UPDATE_QTY", payload: { id: item.id, quantity: item.quantity - 1 } })}>−</button>
                            <span className="qty-display">{item.quantity}</span>
                            <button className="btn btn-outline-brand qty-btn" aria-label="Increase quantity"
                              onClick={() => dispatch({ type: "UPDATE_QTY", payload: { id: item.id, quantity: item.quantity + 1 } })}>+</button>
                            <button className="btn btn-remove" aria-label={`Remove ${item.name}`}
                              onClick={() => dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })}>Remove</button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <div className="info-card h-100">
                  <h2>Order Summary</h2>
                  <div className="summary-row"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
                  <div className="summary-row"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
                  <hr />
                  <div className="summary-row">
                    <span>Total</span>
                    <strong className="price" style={{ fontSize: "1.1rem" }}>${total.toFixed(2)}</strong>
                  </div>
                  {items.length > 0 ? (
                    <button
                      className="btn btn-brand"
                      style={{ width: "100%", marginTop: "1.25rem" }}
                      onClick={() => { setActiveTab("checkout"); setStep(0); }}
                    >
                      Proceed to Checkout →
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-brand"
                      style={{ width: "100%", marginTop: "1.25rem" }}
                      disabled
                      title="Add items to your cart first"
                    >
                      Proceed to Checkout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CHECKOUT TAB ──────────────────────────────────────── */}
      {activeTab === "checkout" && (
        <section className="section">
          <div className="container">
            <p className="kicker">Checkout</p>
            <h2 className="section-title">Simplified Checkout</h2>
            <div className="step-indicator">
              {["Shipping", "Payment", "Review"].map((label, i) => (
                <div key={label} className={`step-pill${step === i ? " active" : ""}`}>{i + 1}. {label}</div>
              ))}
            </div>

            <div className="info-card">
              {/* Step 0 — Shipping */}
              {step === 0 && (
                <div className="form-grid">
                  <div>
                    <label htmlFor="checkout-name">Full name</label>
                    <input id="checkout-name" type="text" value={shippingForm.name}
                      onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })} placeholder="Jane Smith" />
                  </div>
                  <div>
                    <label htmlFor="checkout-email">Email</label>
                    <input id="checkout-email" type="email" value={shippingForm.email}
                      onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })} placeholder="jane@example.com" />
                  </div>
                  <div className="full-width">
                    <label htmlFor="checkout-address">Address</label>
                    <input id="checkout-address" type="text" value={shippingForm.address}
                      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })} placeholder="123 Main St, City, State ZIP" />
                  </div>
                </div>
              )}

              {/* Step 1 — Payment */}
              {step === 1 && (
                <div className="form-grid">
                  <div className="full-width">
                    <label htmlFor="checkout-card">Card number</label>
                    <input id="checkout-card" type="text" value={paymentForm.card}
                      onChange={(e) => setPaymentForm({ ...paymentForm, card: e.target.value })} placeholder="•••• •••• •••• ••••" />
                  </div>
                  <div>
                    <label htmlFor="checkout-exp">Exp.</label>
                    <input id="checkout-exp" type="text" value={paymentForm.exp}
                      onChange={(e) => setPaymentForm({ ...paymentForm, exp: e.target.value })} placeholder="MM / YY" />
                  </div>
                  <div>
                    <label htmlFor="checkout-cvv">CVV</label>
                    <input id="checkout-cvv" type="text" value={paymentForm.cvv}
                      onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })} placeholder="•••" />
                  </div>
                  <div className="full-width">
                    <label htmlFor="checkout-discount">Discount code</label>
                    <input id="checkout-discount" type="text" placeholder="Enter code (e.g. KS5TY)"
                      value={paymentForm.discountCode}
                      onChange={(e) => setPaymentForm({ ...paymentForm, discountCode: e.target.value })} />
                  </div>
                </div>
              )}

              {/* Step 2 — Review */}
              {step === 2 && (
                <div>
                  <h3 style={{ marginTop: 0, color: "var(--brown)" }}>Review Your Order</h3>

                  {/* Item list */}
                  <ul className="cart-list" style={{ marginBottom: "1.25rem" }}>
                    {items.map((item) => (
                      <li className="cart-item" key={item.id}>
                        <div>
                          <strong>{item.name}</strong>
                          <p>{item.quantity} × ${item.price.toFixed(2)} = ${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Shipping + contact recap */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <p style={{ fontWeight: 700, color: "var(--brown)", marginBottom: "0.4rem" }}>Shipping to</p>
                    <p style={{ margin: 0 }}>{shippingForm.name || "—"}</p>
                    <p style={{ margin: 0 }}>{shippingForm.address || "No address entered"}</p>
                    <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.9rem" }}>{shippingForm.email || "No email entered"}</p>
                  </div>

                  {/* Order totals */}
                  <div style={{
                    background: "var(--cream)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.6rem",
                    padding: "1rem",
                  }}>
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    {paymentForm.discountCode && (
                      <div className="summary-row">
                        <span>Discount code</span>
                        <span className="reward-code" style={{ fontSize: "0.95rem" }}>{paymentForm.discountCode}</span>
                      </div>
                    )}
                    <hr style={{ margin: "0.75rem 0" }} />
                    <div className="summary-row" style={{ fontSize: "1.05rem" }}>
                      <strong>Total</strong>
                      <strong style={{ color: "var(--brown)" }}>${total.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
                {step > 0 && (
                  <button className="btn btn-outline-brand" onClick={() => setStep(step - 1)}>← Back</button>
                )}
                {step < 2 ? (
                  <button className="btn btn-brand" onClick={() => setStep(step + 1)}>Continue →</button>
                ) : (
                  <button className="btn btn-brand" onClick={handlePlaceOrder} disabled={isSubmitting || items.length === 0}>
                    {isSubmitting ? "Placing Order…" : "Place Order"}
                  </button>
                )}
              </div>

              {orderMessage && (
                <p className={orderMessage.type === "success" ? "order-msg-success" : "order-msg-error"}>
                  {orderMessage.text}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── ORDER HISTORY TAB ─────────────────────────────────── */}
      {activeTab === "history" && (
        <section className="section section-light">
          <div className="container">
            <p className="kicker">Order History</p>
            <h2 className="section-title">Look up your past orders</h2>
            <p>Enter the email address you used at checkout to retrieve your order history.</p>
            <div className="info-card" style={{ maxWidth: 560 }}>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <label htmlFor="lookup-email">Email address</label>
                  <input id="lookup-email" type="email" value={lookupEmail}
                    onChange={(e) => setLookupEmail(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleLookupOrders(); }}
                    placeholder="jane@example.com" />
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: "0.05rem" }}>
                  <button className="btn btn-brand" onClick={handleLookupOrders} disabled={isLooking}>
                    {isLooking ? "Searching…" : "Look up orders"}
                  </button>
                </div>
              </div>
              {lookupMessage && <p style={{ marginTop: "1rem", color: "var(--muted)" }}>{lookupMessage}</p>}
              {orderHistory.length > 0 && (
                <div style={{ marginTop: "1.25rem" }}>
                  <h3 style={{ color: "var(--brown)", marginTop: 0 }}>
                    {orderHistory.length} order{orderHistory.length !== 1 ? "s" : ""} found
                  </h3>
                  {orderHistory.map((order) => (
                    <div key={order.id} className="order-history-card">
                      <div className="order-history-header">
                        <strong>Order #{order.id}</strong>
                        <span className="badge-soft">{order.status}</span>
                      </div>
                      <p style={{ margin: "0.35rem 0 0" }}>
                        <span style={{ color: "var(--muted)", fontSize: "0.875rem" }}>
                          {new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </span>
                      </p>
                      <p style={{ margin: "0.5rem 0 0" }}>
                        {(order.items as any[]).map((item: any) => (
                          <span key={item.id} style={{ display: "block" }}>{item.quantity} × {item.name}</span>
                        ))}
                      </p>
                      <p className="price" style={{ margin: "0.5rem 0 0", fontSize: "1rem" }}>
                        Total: ${Number(order.total).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Shop;
