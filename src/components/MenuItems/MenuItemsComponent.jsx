

// components/MenuItem.js
"use client";

import { useCart } from '@/context/CartContext';
import { FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';

const tagColors = {
    'NEW': 'bg-red-400',
    'POPULAR': 'bg-yellow-500',
    'TRENDING': 'bg-orange-500',
    "CHEF'S SPECIAL": 'bg-green-600',
    'MUST TRY': 'bg-red-600',
};

const MenuItemsComponent = ({ id, name, description, price, tag, imageUrl, stock, isToGo, item }) => {
  const { cart, addToCart, decrementQuantity } = useCart();
  
  // Find if this item is already in cart
  const cartItem = cart.find(cartItem => cartItem.id === id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 3;

  const handleAddToCart = () => {
    if (!isOutOfStock && item) {
      addToCart(item);
    }
  };

  return (
    <div className={`flex items-center pb-6 border-b border-dashed border-gray-300 last:border-b-0 last:pb-0 ${isOutOfStock ? 'opacity-50' : ''}`}>
      {/* menu-item-img */}
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-100 shadow-md"
        />
        {isToGo && (
          <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[6px] px-1 py-0.5 rounded-full font-bold">
            TO-GO
          </span>
        )}
      </div>
      
      {/* item-details */}
      <div className="flex-grow">
        <h4 className="font-serif text-lg font-bold text-gray-800">{name}</h4>
        <p className="text-sm text-gray-500 line-clamp-1">{description}</p>
        {isLowStock && (
          <span className="text-[10px] text-amber-600 font-semibold">Only {stock} left!</span>
        )}
        {isOutOfStock && (
          <span className="text-[10px] text-red-500 font-semibold">Sold Out</span>
        )}
      </div>
      
      {/* item-price-tag and add button */}
      <div className="flex flex-col items-end pl-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="font-serif text-sm font-bold text-amber-600">FCFA {price}</span>
          {tag && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded text-white ${tagColors[tag]}`}>
              {tag}
            </span>
          )}
        </div>
        
        {/* Add to Cart Controls */}
        {quantityInCart > 0 ? (
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
            <button 
              onClick={() => decrementQuantity(id)}
              className="w-6 h-6 flex items-center justify-center text-amber-600 hover:bg-amber-100 rounded-full transition-colors"
            >
              <FaMinus className="text-xs" />
            </button>
            <span className="text-sm font-bold min-w-[20px] text-center">{quantityInCart}</span>
            <button 
              onClick={handleAddToCart}
              disabled={quantityInCart >= stock}
              className="w-6 h-6 flex items-center justify-center text-amber-600 hover:bg-amber-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPlus className="text-xs" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
              isOutOfStock 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}
          >
            <FaShoppingBag className="text-xs" />
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuItemsComponent;