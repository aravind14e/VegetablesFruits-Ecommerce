import { useState, useEffect } from 'react';
import Modal from './Modal';

const defaultProduct = {
  name: '',
  description: '',
  price: '',
  category: 'fruits',
  subCategory: '',
  images: [''],
  isOrganic: false,
  isSeasonal: false,
  nutritionInfo: { calories: '', protein: '', carbs: '', fat: '', fiber: '' },
  stock: '',
  freshness: 'fresh',
};

export default function ProductModal({ open, onClose, onSave, initial }) {
  const [product, setProduct] = useState(defaultProduct);

  useEffect(() => {
    setProduct(initial || defaultProduct);
  }, [initial, open]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('nutritionInfo.')) {
      setProduct(p => ({
        ...p,
        nutritionInfo: { ...p.nutritionInfo, [name.split('.')[1]]: value },
      }));
    } else if (type === 'checkbox') {
      setProduct(p => ({ ...p, [name]: checked }));
    } else {
      setProduct(p => ({ ...p, [name]: value }));
    }
  }

  function handleImageChange(e) {
    setProduct(p => ({ ...p, images: [e.target.value] }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(product);
  }

  return (
    <Modal isOpen={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
        <h2 className="text-lg font-bold mb-2">{initial ? 'Edit' : 'Add'} Product</h2>
        <input name="name" value={product.name} onChange={handleChange} placeholder="Name" className="p-2 border rounded" required />
        <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="p-2 border rounded" required />
        <input name="price" type="number" value={product.price} onChange={handleChange} placeholder="Price" className="p-2 border rounded" required />
        <select name="category" value={product.category} onChange={handleChange} className="p-2 border rounded">
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
        </select>
        <input name="subCategory" value={product.subCategory} onChange={handleChange} placeholder="Subcategory" className="p-2 border rounded" />
        <input name="images" value={product.images[0]} onChange={handleImageChange} placeholder="Image URL" className="p-2 border rounded" required />
        <div className="flex gap-2">
          <label><input type="checkbox" name="isOrganic" checked={product.isOrganic} onChange={handleChange} /> Organic</label>
          <label><input type="checkbox" name="isSeasonal" checked={product.isSeasonal} onChange={handleChange} /> Seasonal</label>
        </div>
        <div className="flex gap-2">
          <input name="nutritionInfo.calories" value={product.nutritionInfo.calories} onChange={handleChange} placeholder="Calories" className="p-2 border rounded w-1/2" />
          <input name="nutritionInfo.protein" value={product.nutritionInfo.protein} onChange={handleChange} placeholder="Protein" className="p-2 border rounded w-1/2" />
        </div>
        <div className="flex gap-2">
          <input name="nutritionInfo.carbs" value={product.nutritionInfo.carbs} onChange={handleChange} placeholder="Carbs" className="p-2 border rounded w-1/2" />
          <input name="nutritionInfo.fat" value={product.nutritionInfo.fat} onChange={handleChange} placeholder="Fat" className="p-2 border rounded w-1/2" />
        </div>
        <input name="nutritionInfo.fiber" value={product.nutritionInfo.fiber} onChange={handleChange} placeholder="Fiber" className="p-2 border rounded" />
        <input name="stock" type="number" value={product.stock} onChange={handleChange} placeholder="Stock" className="p-2 border rounded" required />
        <select name="freshness" value={product.freshness} onChange={handleChange} className="p-2 border rounded">
          <option value="fresh">Fresh</option>
          <option value="frozen">Frozen</option>
          <option value="dried">Dried</option>
        </select>
        <div className="flex gap-2 mt-2">
          <button type="submit" className="flex-1 bg-green-600 text-white rounded px-2 py-2 hover:bg-green-700 transition">Save</button>
          <button type="button" onClick={onClose} className="flex-1 bg-gray-300 text-gray-800 rounded px-2 py-2 hover:bg-gray-400 transition">Cancel</button>
        </div>
      </form>
    </Modal>
  );
}
