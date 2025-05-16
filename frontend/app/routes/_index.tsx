import type { MetaFunction } from "@remix-run/node";
import { Link } from '@remix-run/react';
import ProductCard from '../components/products/ProductCard';
import { motion } from 'framer-motion';
import { featuredProducts, featuredStores, categories } from '../data/mockData';
import slugify from '../utils/slugify';

export const meta: MetaFunction = () => {
  return [
    { title: "PrimeBazaar - Your Multi-Store Marketplace" },
    { name: "description", content: "Discover amazing products from trusted sellers. Shop with confidence and enjoy a seamless shopping experience." },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
            <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
                >
                  <span className="block">Discover Amazing</span>
                  <span className="block text-emerald-600">Products & Stores</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0"
                >
                  Shop from thousands of trusted sellers. Find unique products and support independent creators.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                >
                  <div className="rounded-md shadow">
                    <Link
                      to="/products"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-8 py-3 text-base font-medium text-white hover:bg-emerald-700 md:py-4 md:px-10 md:text-lg"
                    >
                      Start Shopping
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/stores"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-100 px-8 py-3 text-base font-medium text-emerald-700 hover:bg-emerald-200 md:py-4 md:px-10 md:text-lg"
                    >
                      Browse Stores
                    </Link>
                  </div>
                </motion.div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200"
            alt="Shopping"
          />
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Shop by Category
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Find what you're looking for in our curated categories
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${slugify(category.name)}`}
                className="group relative rounded-lg border border-gray-200 bg-white p-6 text-center hover:border-emerald-500 hover:shadow-lg transition-all duration-200"
              >
                <span className="text-4xl" role="img" aria-label={category.name}>
                  {category.icon}
                </span>
                <h3 className="mt-4 text-sm font-medium text-gray-900">{category.name}</h3>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                  {category.count} products
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Check out our most popular products from trusted sellers
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Stores */}
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Stores
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Discover our top-rated sellers and their unique collections
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {featuredStores.map((store) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-200"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    <Link to={`/store/${slugify(store.slug)}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {store.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{store.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-emerald-600">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start selling?</span>
            <span className="block text-emerald-200">Create your store today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/create-store"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-emerald-600 hover:bg-emerald-50"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/learn-more"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-500 px-5 py-3 text-base font-medium text-white hover:bg-emerald-400"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
