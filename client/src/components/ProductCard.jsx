import { motion } from "framer-motion";

export default function ProductCard({ product, onAddToCart, onAddToWishlist }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2">
      <img src={product.images[0]} alt={product.name} className="rounded h-40 w-full object-cover" loading="lazy" />
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <span className="text-green-600 font-bold">₹{product.price}</span>
      </div>
      <div className="flex gap-2 text-xs">
        {product.isOrganic && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">Organic</span>}
        {product.isSeasonal && <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Seasonal</span>}
        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{product.freshness}</span>
      </div>
      <div className="flex gap-2 mt-2">
        <button onClick={() => onAddToCart(product)} className="flex-1 bg-green-500 text-white rounded px-2 py-1 hover:bg-green-600 transition">Add to Cart</button>
        <button onClick={() => onAddToWishlist(product)} className="flex-1 bg-pink-500 text-white rounded px-2 py-1 hover:bg-pink-600 transition">Wishlist</button>
      </div>
    </motion.div>
  );
} 