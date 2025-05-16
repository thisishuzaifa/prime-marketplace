import { Link } from '@remix-run/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  storeName: string;
  storeSlug: string;
  rating?: number;
  reviewCount?: number;
}

function StarRating({ rating = 0 }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[0, 1, 2, 3, 4].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 flex-shrink-0 ${star < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  storeName,
  storeSlug,
  rating = 0,
  reviewCount = 0,
}: ProductCardProps) {
  const handleAddToCart = () => {
    // TODO: Implement add to cart logic (context, API, etc.)
    alert(`Added ${name} to cart!`);
  };

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={`/product/${id}`} aria-label={`View product: ${name}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            <Link to={`/store/${storeSlug}`} className="hover:text-emerald-600" aria-label={`View store: ${storeName}`}>
              {storeName}
            </Link>
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900">${price.toFixed(2)}</p>
      </div>
      {rating > 0 && (
        <div className="mt-2 flex items-center">
          <StarRating rating={rating} />
          <p className="ml-2 text-sm text-gray-500">{reviewCount} reviews</p>
        </div>
      )}
      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        aria-label={`Add ${name} to cart`}
      >
        <ShoppingCartIcon className="mr-2 h-5 w-5" aria-hidden="true" />
        Add to Cart
      </button>
    </div>
  );
} 