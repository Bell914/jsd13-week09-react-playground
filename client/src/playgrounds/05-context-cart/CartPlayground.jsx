import React, { useState, useEffect } from 'react';
import { CartProvider, useCart, AVAILABLE_DISCOUNTS } from './CartContext';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Tag,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  RotateCcw,
  Check,
  ShoppingBag,
  CreditCard,
  ShieldCheck
} from 'lucide-react';

const CATALOG_PRODUCTS = [
  {
    id: 'p-1',
    name: 'React 19 Mastery Handbook',
    price: 650,
    image: '📘',
    category: 'E-Books',
    description: 'คู่มือเจาะลึก React 19 ตั้งแต่พื้นฐานจนถึง Server Actions',
  },
  {
    id: 'p-2',
    name: 'Tailwind CSS Quick Reference',
    price: 390,
    image: '🎨',
    category: 'E-Books',
    description: 'สรุป Utility Classes และเทคนิคการจัด Layout ทันสมัย',
  },
  {
    id: 'p-3',
    name: 'Developer Mechanical Desk Mat',
    price: 890,
    image: '⌨️',
    category: 'Gear',
    description: 'แผ่นรองคีย์บอร์ดพิมพ์ลาย React Component Tree ขนาด 90x40 ซม.',
  },
  {
    id: 'p-4',
    name: 'Smart Ceramic Coffee Mug',
    price: 490,
    image: '☕',
    category: 'Lifestyle',
    description: 'แก้วกาแฟควบคุมอุณหภูมิ สำหรับสายเขียนโค้ดยามดึก',
  },
  {
    id: 'p-5',
    name: 'Fullstack Dev Sticker Pack (50 ชิ้น)',
    price: 150,
    image: '📦',
    category: 'Swag',
    description: 'สติกเกอร์กันน้ำลาย React, Tailwind, Vite, JS สำหรับติดแล็ปท็อป',
  },
];

// Inner Component ที่ดึง State จาก useCart()
function CartContent({ onStateChange }) {
  const {
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
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [checkoutModal, setCheckoutModal] = useState(false);

  // Sync to Live State Inspector
  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        globalCartSummary: {
          totalItems,
          subtotal: `฿${subtotal.toLocaleString()}`,
          discountAmount: `฿${discountAmount.toLocaleString()}`,
          tax: `฿${tax.toLocaleString()}`,
          finalTotal: `฿${finalTotal.toLocaleString()}`,
        },
        appliedCoupon: appliedCoupon ? appliedCoupon.code : 'None',
        cartItems: cart,
      });
    }
  }, [cart, totalItems, subtotal, discountAmount, tax, finalTotal, appliedCoupon, onStateChange]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    if (applyCoupon(inputCoupon)) {
      setInputCoupon('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/50 via-slate-900 to-slate-900 border border-rose-500/30">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Module 5: Global State & Context API
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                แก้ปัญหา Props Drilling ด้วย <code className="text-rose-300 font-mono text-xs bg-rose-500/10 px-1.5 py-0.5 rounded">createContext</code> และ <code className="text-rose-300 font-mono text-xs bg-rose-500/10 px-1.5 py-0.5 rounded">useCart()</code> ให้ทุก Component แชร์ข้อมูลตะกร้าสินค้าตรงกันทั่วทั้งแอป
              </p>
            </div>
          </div>

          {/* Top Cart Badge Indicator (Demonstrating Header accessing state) */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-rose-400" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </div>
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px]">ยอดรวมในตะกร้า</span>
              <span className="font-bold text-white font-mono">฿{finalTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Product Catalog (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>รายการสินค้าในร้าน (Product Catalog)</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">{CATALOG_PRODUCTS.length} รายการ</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CATALOG_PRODUCTS.map((product) => {
              const inCartItem = cart.find((item) => item.id === product.id);

              return (
                <div
                  key={product.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/30 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between">
                      <span className="text-3xl p-2 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform">
                        {product.image}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        {product.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-base font-bold text-white font-mono">
                      ฿{product.price.toLocaleString()}
                    </span>

                    {inCartItem ? (
                      <div className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 text-xs">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-bold text-rose-400 px-1.5">
                          {inCartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/20 transition-all active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>เพิ่มลงตะกร้า</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Shopping Cart Sidebar (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-rose-400" />
                <span>ตะกร้าสินค้า ({totalItems} ชิ้น)</span>
              </span>

              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>ล้างตะกร้า</span>
                </button>
              )}
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs space-y-2">
                <ShoppingCart className="w-8 h-8 mx-auto opacity-40" />
                <p>ยังไม่มีสินค้าในตะกร้า</p>
                <p className="text-[11px] text-slate-600">กดปุ่ม "เพิ่มลงตะกร้า" จากฝั่งซ้ายเพื่อทดสอบ Context State</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xl shrink-0">{item.image}</span>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-slate-200 truncate">{item.name}</h4>
                        <span className="text-slate-400 font-mono text-[11px]">
                          ฿{item.price.toLocaleString()} x {item.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-1 bg-slate-900 rounded-lg border border-slate-800 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-bold text-slate-200 px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Coupon Code Section */}
            <div className="pt-2">
              {appliedCoupon ? (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="font-bold font-mono">{appliedCoupon.code}</span>
                      <p className="text-[10px] text-emerald-400/80">{appliedCoupon.label}</p>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[10px] text-rose-400 hover:underline"
                  >
                    ยกเลิกคูปอง
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="ใส่โค้ด: REACT10 หรือ JSD13"
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 uppercase font-mono focus:outline-none focus:border-rose-500"
                    />
                    <button
                      type="submit"
                      disabled={!inputCoupon.trim()}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-semibold text-xs"
                    >
                      ใช้โค้ด
                    </button>
                  </div>
                  {couponError && <p className="text-[10px] text-rose-400 pl-1">{couponError}</p>}
                </form>
              )}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>ยอดรวมสินค้า (Subtotal):</span>
              <span className="font-mono">฿{subtotal.toLocaleString()}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>ส่วนลด (Discount):</span>
                <span className="font-mono">-฿{discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-400">
              <span>ภาษีมูลค่าเพิ่ม (VAT 7%):</span>
              <span className="font-mono">฿{tax.toLocaleString()}</span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-bold text-white">
              <span>ยอดชำระสุทธิ (Total):</span>
              <span className="text-xl font-mono text-rose-400">฿{finalTotal.toLocaleString()}</span>
            </div>

            <button
              onClick={() => setCheckoutModal(true)}
              disabled={cart.length === 0}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 transition-all"
            >
              <CreditCard className="w-4 h-4" />
              <span>ดำเนินการสั่งซื้อ (Checkout Simulator)</span>
            </button>
          </div>

        </div>

      </div>

      {/* Checkout Success Modal */}
      {checkoutModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-4 animate-scaleUp">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">สั่งซื้อสินค้าจำลองสำเร็จ!</h3>
              <p className="text-xs text-slate-400 mt-1">
                ขอบคุณที่ทดสอบระบบ Global State ด้วย React Context API
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs font-mono space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span>จำนวนสินค้า:</span>
                <span className="text-white font-bold">{totalItems} ชิ้น</span>
              </div>
              <div className="flex justify-between">
                <span>ยอดชำระ:</span>
                <span className="text-rose-400 font-bold">฿{finalTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>สถานะ Context:</span>
                <span className="text-emerald-400">Global Synchronized</span>
              </div>
            </div>

            <button
              onClick={() => {
                setCheckoutModal(false);
                clearCart();
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
            >
              ปิดหน้าต่าง & รีเซ็ตตะกร้า
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Wrapper ที่หุ้มด้วย CartProvider
export default function CartPlayground({ onStateChange }) {
  return (
    <CartProvider>
      <CartContent onStateChange={onStateChange} />
    </CartProvider>
  );
}

export const cartPlaygroundCode = `import React, { createContext, useContext, useState } from 'react';

// 1. สร้าง Context
const CartContext = createContext(null);

// 2. Provider Component ที่เก็บ State ส่วนกลาง
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Custom Hook สำหรับเรียกใช้ Context
export function useCart() {
  return useContext(CartContext);
}

// 4. Component ใดๆ สามารถเข้าถึง State ได้โดยตรง ไม่ต้องส่ง Props
function Navbar() {
  const { cart } = useCart();
  return <div>ตะกร้า: {cart.length} ชิ้น</div>;
}`;

export const cartPlaygroundExplanations = [
  {
    title: '1. แก้ปัญหา Props Drilling',
    desc: 'เมื่อ Component ในระดับลึกต้องการเข้าถึง State เดียวกัน การส่ง Props ต่อกันไปเรื่อยๆ จะทำให้โค้ดยุ่งยาก Context API ช่วยให้ Component ลูกสามารถดึง State ไปใช้ได้โดยตรง',
  },
  {
    title: '2. createContext & Context.Provider',
    desc: 'createContext สร้างท่อส่งข้อมูลกลาง ส่วน Provider ทำหน้าที่กำหนดขอบเขตและแจกจ่ายค่า value (State + ฟังก์ชันต่างๆ) ให้กับ Component ย่อยภายในขอบเขตนั้น',
  },
  {
    title: '3. useContext Custom Hook Pattern',
    desc: 'การสร้าง Custom Hook useCart() ครอบ useContext(CartContext) ช่วยเพิ่มความกระชับ ตรวจสอบข้อผิดพลาดกรณีเรียกใช้นอก Provider และเพิ่มความสะดวกในการเรียกใช้',
  },
  {
    title: '4. Derived Calculations ใน Context',
    desc: 'คำนวณยอดเงินรวม (Subtotal), ส่วนลด (Discount) และภาษี (Tax) ภายใน Provider ด้วย useMemo ช่วยให้ Component ปลายทางได้รับค่ายอดรวมสำเร็จรูปพร้อมใช้งานทันที',
  },
];
