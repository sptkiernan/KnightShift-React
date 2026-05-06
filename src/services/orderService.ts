import { supabase } from "../lib/supabaseClient";
import { CartItem } from "../context/CartContext";

export type OrderPayload = {
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  discount_code?: string;
};

export type Order = OrderPayload & {
  id: number;
  created_at: string;
  status: string;
};

/**
 * Insert a new order into the database.
 * Table: orders
 * Columns: customer_name, customer_email, shipping_address,
 *          items (jsonb), subtotal, shipping, total, discount_code, status
 */
export const submitOrder = async (payload: OrderPayload): Promise<{ data: Order | null; error: string | null }> => {
  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        customer_name: payload.customer_name,
        customer_email: payload.customer_email,
        shipping_address: payload.shipping_address,
        items: payload.items,
        subtotal: payload.subtotal,
        shipping: payload.shipping,
        total: payload.total,
        discount_code: payload.discount_code || null,
        status: "pending",
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    return { data: null, error: error.message };
  }
  return { data: data as Order, error: null };
};

/**
 * Retrieve all orders for a given email address.
 */
export const getOrdersByEmail = async (
  email: string
): Promise<{ data: Order[] | null; error: string | null }> => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_email", email)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase select error:", error);
    return { data: null, error: error.message };
  }
  return { data: data as Order[], error: null };
};
