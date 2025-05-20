export default function ProductDetail() {
  // Placeholder product
  const product = {
    name: 'Mango',
    images: ["https://images.unsplash.com/photo-1502741338009-cac2772e18bc"],
    price: 120,
    nutritionInfo: {
      calories: 60,
      protein: 0.8,
      carbs: 15,
      fat: 0.4,
      fiber: 1.6
    },
    description: 'Delicious seasonal mangoes.'
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={product.images[0]} alt={product.name} className="rounded w-full md:w-80 h-64 object-cover" />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="mb-2">{product.description}</p>
          <div className="mb-2 font-bold text-green-700">₹{product.price}</div>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Add to Cart</button>
          <h2 className="mt-6 font-semibold">Nutrition Info (per 100g)</h2>
          <ul className="text-sm">
            <li>Calories: {product.nutritionInfo.calories}</li>
            <li>Protein: {product.nutritionInfo.protein}g</li>
            <li>Carbs: {product.nutritionInfo.carbs}g</li>
            <li>Fat: {product.nutritionInfo.fat}g</li>
            <li>Fiber: {product.nutritionInfo.fiber}g</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 