import React, { createContext, useContext, useState, useMemo } from 'react';

// 1. สร้าง Context Object
const CartContext = createContext(null);

export const AVAILABLE_DISCOUNTS = {
  REACT10: { code: 'REACT10', percent: 10, label: 'ลด 10% สำหรับชาว React' },
  JSD13: { code: 'JSD13', discountBaht: 500, label: 'ส่วนลดพิเศษ ฿500 รุ่น JSD13' },
};

// 2. Context Provider Component
export function CartProvider({ children, onStateSync }) {
  const [cart, setCart] = useState([
    {
      id: 'p-1',
      name: 'React 19 Mastery Handbook',
      price: 650,
      quantity: 1,
      image: '📘',
      category: 'Books',
    },
    {
      id: 'p-2',
      name: 'Tailwind CSS Quick Reference',
      price: 390,
      quantity: 2,
      image: '🎨',
      category: 'Books',
    },
  ]);

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Add Item to Cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [{ ...product, quantity: 1 }, ...prev];
    });
  };

  // Remove Item
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Update Quantity
  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Apply Coupon
  const applyCoupon = (code) => {
    setCouponError('');
    const upper = code.trim().toUpperCase();
    const found = AVAILABLE_DISCOUNTS[upper];
    if (found) {
      setAppliedCoupon(found);
      return true;
    } else {
      setCouponError('โค้ดส่วนลดไม่ถูกต้อง (ลองใช้ REACT10 หรือ JSD13)');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  // Calculations (Derived State)
  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.percent) {
      return Math.round((subtotal * appliedCoupon.percent) / 100);
    }
    if (appliedCoupon.discountBaht) {
      return Math.min(subtotal, appliedCoupon.discountBaht);
    }
    return 0;
  }, [subtotal, appliedCoupon]);

  const tax = useMemo(() => Math.round((subtotal - discountAmount) * 0.07), [
    subtotal,
    discountAmount,
  ]);

  const finalTotal = useMemo(
    () => Math.max(0, subtotal - discountAmount + tax),
    [subtotal, discountAmount, tax]
  );

  const value = {
    cart,
    totalItems,
    subtotal,
    discountAmount,
    tax,
    finalTotal,
    appliedCoupon,
    couponError,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 3. Custom Hook สำหรับเรียกใช้ Cart Context ได้สะดวก
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart ต้องถูกเรียกใช้งานภายใต้ <CartProvider> เท่านั้น');
  }
  return context;
}
