import { useState } from 'react';
import { Link, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { motion } from 'framer-motion';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { categories as mockCategories } from '../data/mockData';
import slugify from '../utils/slugify';

export const loader = async () => {
  // In real app, fetch from DB or API
  return json({ categories: mockCategories });
};

const filters = [
  { id: 'price', name: 'Price Range', options: [
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 to $100' },
    { value: '100-200', label: '$100 to $200' },
    { value: '200+', label: 'Over $200' },
  ]},
  { id: 'rating', name: 'Rating', options: [
    { value: '4+', label: '4 Stars & Up' },
    { value: '3+', label: '3 Stars & Up' },
    { value: '2+', label: '2 Stars & Up' },
  ]},
  { id: 'availability', name: 'Availability', options: [
    { value: 'in-stock', label: 'In Stock' },
    { value: 'on-sale', label: 'On Sale' },
    { value: 'new-arrival', label: 'New Arrivals' },
  ]},
];

export default function Categories() {
  const { categories } = useLoaderData<typeof loader>();
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleFilter = (filterId: string, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[filterId] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [filterId]: updated };
    });
  };

  // Example filter logic (expand as needed)
  const filteredCategories = categories.filter((cat) => {
    // Add real filter logic here if categories have price/rating/availability
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Categories</h1>
          <p className="mt-2 text-sm text-gray-500">
            Browse through our wide selection of categories
          </p>
        </div>

        {/* Mobile filter dialog */}
        <div className="lg:hidden">
          <button
            type="button"
            aria-controls="mobile-filters"
            aria-expanded={isFilterOpen}
            aria-label="Show filters"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FunnelIcon className="mr-2 h-5 w-5" aria-hidden="true" />
            Filters
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="space-y-6">
              {filters.map((filter) => (
                <div key={filter.id}>
                  <h3 className="text-sm font-medium text-gray-900">{filter.name}</h3>
                  <div className="mt-2 space-y-2">
                    {filter.options.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`${filter.id}-${option.value}`}
                          name={`${filter.id}[]`}
                          value={option.value}
                          type="checkbox"
                          checked={selectedFilters[filter.id]?.includes(option.value) || false}
                          onChange={() => toggleFilter(filter.id, option.value)}
                          className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <label
                          htmlFor={`${filter.id}-${option.value}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category grid */}
          <div className="lg:col-span-3">
            {loading && <div className="text-center text-gray-500">Loading...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((category) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    to={`/category/${slugify(category.name)}`}
                    aria-label={`Browse ${category.name}`}
                    className="group relative block overflow-hidden rounded-lg border border-gray-200 bg-white p-6 text-center hover:border-emerald-500 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-4xl" role="img" aria-label={category.name}>
                        {category.icon}
                      </span>
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                        {category.count} products
                      </span>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{category.description}</p>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-medium text-emerald-600">
                      Browse category
                      <svg
                        className="ml-1 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 