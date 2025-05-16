import { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { ClockIcon, FireIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/products/ProductCard';

// Mock data - replace with actual API calls
const deals = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    originalPrice: 299.99,
    price: 199.99,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    storeName: 'Tech Haven',
    storeSlug: 'tech-haven',
    rating: 4.5,
    reviewCount: 128,
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
  },
  {
    id: '2',
    name: 'Designer Watch',
    originalPrice: 399.99,
    price: 299.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500',
    storeName: 'Luxury Timepieces',
    storeSlug: 'luxury-timepieces',
    rating: 4.8,
    reviewCount: 256,
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
  },
  {
    id: '3',
    name: 'Smart Home Speaker',
    originalPrice: 199.99,
    price: 149.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500',
    storeName: 'Smart Living',
    storeSlug: 'smart-living',
    rating: 4.2,
    reviewCount: 89,
    endTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
  },
];

const flashDeals = [
  {
    id: '4',
    name: 'Wireless Earbuds',
    originalPrice: 129.99,
    price: 79.99,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
    storeName: 'Audio World',
    storeSlug: 'audio-world',
    rating: 4.6,
    reviewCount: 95,
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
  },
  {
    id: '5',
    name: 'Smart Watch',
    originalPrice: 249.99,
    price: 179.99,
    discount: 28,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
    storeName: 'Tech Haven',
    storeSlug: 'tech-haven',
    rating: 4.7,
    reviewCount: 156,
    endTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
  },
];

function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = endTime.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center space-x-2 text-sm text-red-600">
      <ClockIcon className="h-4 w-4" />
      <span>
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </span>
    </div>
  );
}

export default function Deals() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Deals & Offers</h1>
          <p className="mt-2 text-sm text-gray-500">
            Find the best deals and discounts from our trusted sellers
          </p>
        </div>

        {/* Flash Deals Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Flash Deals
            </h2>
            <div className="flex items-center text-red-600">
              <FireIcon className="h-5 w-5" />
              <span className="ml-2 text-sm font-medium">Ending Soon</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {flashDeals.map((deal) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative"
              >
                <div className="relative">
                  <ProductCard {...deal} />
                  <div className="absolute top-4 right-4">
                    <CountdownTimer endTime={deal.endTime} />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                      {deal.discount}% OFF
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Deals Section */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Featured Deals
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {deals.map((deal) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative"
              >
                <div className="relative">
                  <ProductCard {...deal} />
                  <div className="absolute top-4 right-4">
                    <CountdownTimer endTime={deal.endTime} />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                      {deal.discount}% OFF
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 rounded-2xl bg-emerald-600 px-6 py-10 sm:py-16 sm:px-12 lg:flex lg:items-center lg:p-20">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Don't miss out on great deals
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-emerald-100">
              Sign up for our newsletter to receive exclusive deals and offers directly in your inbox.
            </p>
          </div>
          <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-md border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-500 px-5 py-3 text-base font-medium text-white hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-3 text-sm text-emerald-100">
              We care about your data. Read our{' '}
              <Link to="/privacy" className="font-medium text-white underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 