import { useState } from 'react';
import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { TrashIcon } from '@heroicons/react/24/outline';

// Mock data - replace with actual API calls
const cartItems = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    storeName: 'Tech Haven',
    storeSlug: 'tech-haven',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Designer Watch',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500',
    storeName: 'Luxury Timepieces',
    storeSlug: 'luxury-timepieces',
    quantity: 1,
  },
];

// Configurable rates
const SHIPPING_RATE = 10;
const TAX_RATE = 0.1; // 10%

export default function Cart() {
  const [items, setItems] = useState(cartItems);
  const [error, setError] = useState<string | null>(null);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 99) {
      setError('Quantity must be between 1 and 99');
      return;
    }
    setError(null);
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? SHIPPING_RATE : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>
          <p className="mt-2 text-sm text-gray-500">
            Review your items and proceed to checkout
          </p>
        </div>

        {error && <div className="mb-4 text-center text-red-500">{error}</div>}

        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
          {/* Cart items */}
          <div className="lg:col-span-8">
            {items.length === 0 ? (
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-900">Your cart is empty</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <div className="mt-6">
                  <Link
                    to="/products"
                    className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center rounded-lg border border-gray-200 bg-white p-6"
                  >
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                          </h3>
                          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          <Link to={`/store/${item.storeSlug}`} className="text-emerald-600 hover:text-emerald-500">
                            {item.storeName}
                          </Link>
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center space-x-3">
                          <label htmlFor={`quantity-${item.id}`} className="sr-only">
                            Quantity
                          </label>
                          <input
                            id={`quantity-${item.id}`}
                            name={`quantity-${item.id}`}
                            type="number"
                            min={1}
                            max={99}
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="w-16 rounded-md border-gray-300 text-base focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="font-medium text-emerald-600 hover:text-emerald-500"
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          <span className="sr-only">Remove</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-4">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Tax</dt>
                  <dd className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  aria-disabled={items.length === 0}
                  tabIndex={items.length === 0 ? -1 : 0}
                  style={{ opacity: items.length === 0 ? 0.5 : 1, pointerEvents: items.length === 0 ? 'none' : 'auto' }}
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 