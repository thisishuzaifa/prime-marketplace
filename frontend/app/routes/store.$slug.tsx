import { useParams } from '@remix-run/react';
import ProductCard from '../components/products/ProductCard';

// Mock data - replace with actual API calls
const storeData = {
  id: '1',
  name: 'Tech Haven',
  slug: 'tech-haven',
  description: 'Your one-stop shop for all things tech',
  image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500',
  products: [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      storeName: 'Tech Haven',
      storeSlug: 'tech-haven',
      rating: 4.5,
      reviewCount: 128,
    },
    {
      id: '2',
      name: 'Smart Home Speaker',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500',
      storeName: 'Tech Haven',
      storeSlug: 'tech-haven',
      rating: 4.2,
      reviewCount: 89,
    },
    {
      id: '3',
      name: 'Wireless Charging Pad',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
      storeName: 'Tech Haven',
      storeSlug: 'tech-haven',
      rating: 4.0,
      reviewCount: 56,
    },
  ],
};

export default function StorePage() {
  const { slug } = useParams();
  // In a real app, fetch store data based on slug
  const store = storeData;

  return (
    <div className="space-y-8">
      {/* Store Header */}
      <div className="relative">
        <div className="h-32 w-full overflow-hidden rounded-lg bg-gray-200 lg:h-48">
          <img
            src={store.image}
            alt={store.name}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              <div className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={store.image}
                  alt={store.name}
                />
              </div>
            </div>
            <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
                <h1 className="truncate text-2xl font-bold text-gray-900">{store.name}</h1>
                <p className="mt-1 text-sm text-gray-500">{store.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Products */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Products
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Browse our collection of high-quality products
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {store.products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 