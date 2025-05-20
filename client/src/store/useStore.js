import { create } from 'zustand';

// Function to initialize state from localStorage
const initializeState = () => {
  try {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token'); // Also get token
    return {
      cart: [],
      wishlist: [],
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken || null, // Initialize token state
      theme: 'light',
    };
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
    return {
      cart: [],
      wishlist: [],
      user: null,
      token: null,
      theme: 'light',
    };
  }
};

export const useStore = create((set) => ({
  ...initializeState(), // Initialize with state from localStorage
  addToCart: (product) => set((state) => {
    // Check if product already exists in cart
    const existingItemIndex = state.cart.findIndex(item => item._id === product._id);
    if (existingItemIndex > -1) {
      // If exists, update quantity
      const newCart = [...state.cart];
      newCart[existingItemIndex].quantity += 1;
      return { cart: newCart };
    } else {
      // If not, add new item with quantity 1
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }
  }),
  updateCartItemQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item._id === productId ? { ...item, quantity: quantity > 0 ? quantity : 0 } : item
    ).filter(item => item.quantity > 0), // Remove item if quantity is 0 or less
  })),
  removeCartItem: (productId) => set((state) => ({
    cart: state.cart.filter(item => item._id !== productId),
  })),
  addToWishlist: (product) => set((state) => ({ wishlist: [...state.wishlist, product] })),
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }), // Add setToken action
  logout: () => set(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return { user: null, token: null };
  }), // Add logout action
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  // Add clearCart action
  clearCart: () => set({ cart: [] }),
})); 