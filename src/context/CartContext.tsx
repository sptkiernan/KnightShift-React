import React, { createContext, useContext, useReducer, ReactNode } from "react";

export type CartItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "UPDATE_QTY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.payload.id) };
    case "UPDATE_QTY":
      if (action.payload.quantity <= 0) {
        return { items: state.items.filter((i) => i.id !== action.payload.id) };
      }
      return {
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
};

type CartContextType = {
  items: CartItem[];
  dispatch: React.Dispatch<CartAction>;
  subtotal: number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items: state.items, dispatch, subtotal, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
