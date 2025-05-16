import { useState } from 'react';
import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { LockClosedIcon } from '@heroicons/react/24/outline';

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
const SHIPPING_METHODS = [
  { id: 'standard', name: 'Standard Shipping', price: 10, estimatedDays: '3-5' },
  { id: 'express', name: 'Express Shipping', price: 20, estimatedDays: '1-2' },
  { id: 'overnight', name: 'Overnight Shipping', price: 30, estimatedDays: '1' },
];
const TAX_RATE = 0.1; // 10%

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = SHIPPING_METHODS.find(method => method.id === selectedShipping)?.price || 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const steps = [
    { id: 1, name: 'Shipping', status: activeStep === 1 ? 'current' : activeStep > 1 ? 'complete' : 'upcoming' },
    { id: 2, name: 'Payment', status: activeStep === 2 ? 'current' : activeStep > 2 ? 'complete' : 'upcoming' },
    { id: 3, name: 'Review', status: activeStep === 3 ? 'current' : 'upcoming' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Checkout</h1>
          <p className="mt-2 text-sm text-gray-500">
            Complete your purchase securely
          </p>
        </div>

        {/* Progress steps */}
        <nav aria-label="Progress" className="mb-8">
          <ol role="list" className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                <div className="flex items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    step.status === 'complete' ? 'bg-emerald-600' :
                    step.status === 'current' ? 'border-2 border-emerald-600' :
                    'border-2 border-gray-300'
                  }`}>
                    {step.status === 'complete' ? (
                      <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className={`h-2.5 w-2.5 rounded-full ${
                        step.status === 'current' ? 'bg-emerald-600' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                  <p className={`ml-3 text-sm font-medium ${
                    step.status === 'current' ? 'text-emerald-600' :
                    step.status === 'complete' ? 'text-gray-900' :
                    'text-gray-500'
                  }`}>
                    {step.name}
                  </p>
                </div>
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute top-4 left-8 -ml-px h-0.5 w-full bg-gray-200" />
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
          {/* Checkout form */}
          <div className="lg:col-span-8">
            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-gray-200 bg-white p-6"
              >
                <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>
                <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                      ZIP code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Shipping Method</h3>
                  <div className="mt-4 space-y-4">
                    {SHIPPING_METHODS.map((method) => (
                      <div key={method.id} className="flex items-center">
                        <input
                          id={method.id}
                          name="shipping-method"
                          type="radio"
                          checked={selectedShipping === method.id}
                          onChange={() => setSelectedShipping(method.id)}
                          className="h-4 w-4 border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <label htmlFor={method.id} className="ml-3 flex flex-1 items-center justify-between">
                          <div>
                            <span className="block text-sm font-medium text-gray-900">{method.name}</span>
                            <span className="block text-sm text-gray-500">
                              Estimated delivery: {method.estimatedDays} days
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">${method.price.toFixed(2)}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Continue to Payment
                  </button>
                </div>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-gray-200 bg-white p-6"
              >
                <h2 className="text-lg font-medium text-gray-900">Payment Information</h2>
                <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                      Card number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      id="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                      Name on card
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      id="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                      Expiry date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      id="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
                  >
                    ← Back to Shipping
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className="flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Review Order
                  </button>
                </div>
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-gray-200 bg-white p-6"
              >
                <h2 className="text-lg font-medium text-gray-900">Review Order</h2>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Shipping Information</h3>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>{formData.firstName} {formData.lastName}</p>
                      <p>{formData.address}</p>
                      <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                      <p>{formData.country}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Payment Method</h3>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Card ending in {formData.cardNumber.slice(-4)}</p>
                      <p>Expires {formData.expiryDate}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Order Items</h3>
                    <div className="mt-2 space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h4>{item.name}</h4>
                                <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
                  >
                    ← Back to Payment
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    <LockClosedIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    Place Order
                  </button>
                </div>
              </motion.div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 