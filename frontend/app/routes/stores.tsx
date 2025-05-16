import { useState } from 'react';
import { Link, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { motion } from 'framer-motion';
import { FunnelIcon, StarIcon } from '@heroicons/react/24/outline';
import { stores as mockStores } from '../data/mockData';
import slugify from '../utils/slugify';

export const loader = async () => {
  // In real app, fetch from DB or API
  return json({ stores: mockStores });
};

const filters = [
  { id: 'rating', name: 'Rating', options: [
    { value: '4+', label: '4 Stars & Up' },
    { value: '3+', label: '3 Stars & Up' },
    { value: '2+', label: '2 Stars & Up' },
  ]},
  { id: 'category', name: 'Category', options: [
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'beauty', label: 'Beauty' },
    { value: 'sports', label: 'Sports' },
    { value: 'home', label: 'Home & Living' },
  ]},
  { id: 'product-count', name: 'Product Count', options: [
    { value: '100+', label: '100+ Products' },
    { value: '500+', label: '500+ Products' },
    { value: '1000+', label: '1000+ Products' },
  ]},
];

export default function Stores() {
  const { stores } = useLoaderData<typeof loader>();
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
  const filteredStores = stores.filter((store) => {
    // Add real filter logic here if stores have rating/category/productCount
    return true;
  });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Stores</h1>
          <p className="mt-2 text-sm text-gray-500">
            Discover amazing stores and their unique collections
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

          {/* Store grid */}
          <div className="lg:col-span-3">
            {loading && <div className="text-center text-gray-500">Loading...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStores.map((store) => (
                <motion.div
                  key={store.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    to={`/store/${slugify(store.slug)}`}
                    aria-label={`View store ${store.name}`}
                    className="group relative block overflow-hidden rounded-lg border border-gray-200 bg-white hover:border-emerald-500 hover:shadow-lg transition-all duration-200 min-h-[20rem]"
                  >
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200">
                      <img
                        src={store.image}
                        alt={store.name}
                        className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-200"
                      />
                      {store.featured && (
                        <div className="absolute top-2 right-2">
                          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900 truncate">{store.name}</h3>
                        <div className="flex items-center">
                          <StarIcon className="h-5 w-5 text-yellow-400" />
                          <span className="ml-1 text-sm text-gray-600">{store.rating}</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500 line-clamp-2">{store.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {store.categories.map((category) => (
                          <span
                            key={category}
                            className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                        <span>{store.productCount} products</span>
                        <span>{store.reviewCount} reviews</span>
                      </div>
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