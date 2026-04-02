import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap, Shield, Clock, Package } from 'lucide-react';
import { useCartStore } from '../store/cart';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  type: string;
  stock: number;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-red">
          Welcome to Nexus HUB
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Premium digital assets, activated emails, and exclusive accounts. Instant delivery via blockchain.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <div className="flex items-center gap-2 text-sm text-gray-300 glass px-4 py-2 rounded-full">
            <Zap className="w-4 h-4 text-neon-orange" /> Instant Delivery
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300 glass px-4 py-2 rounded-full">
            <Shield className="w-4 h-4 text-neon-green" /> Secure Crypto
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300 glass px-4 py-2 rounded-full">
            <Clock className="w-4 h-4 text-neon-blue" /> 24/7 Automated
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-2 inline-block">Available Items</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel overflow-hidden flex flex-col group hover:border-neon-blue/50 transition-colors"
            >
              <div className="h-48 w-full bg-gray-800 relative overflow-hidden">
                {product.thumbnail ? (
                  <img 
                    src={product.thumbnail} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                    <Package className="w-12 h-12 text-gray-600" />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold border border-white/10">
                  Stock: <span className={product.stock > 0 ? 'text-neon-green' : 'text-neon-red'}>{product.stock}</span>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">{product.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <span className="text-xl font-bold text-neon-green">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => addItem({
                      productId: product._id,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                      thumbnail: product.thumbnail
                    })}
                    disabled={product.stock <= 0}
                    className="flex items-center gap-2 bg-white/10 hover:bg-neon-blue hover:text-black disabled:opacity-50 disabled:hover:bg-white/10 disabled:hover:text-white transition-all px-4 py-2 rounded-lg font-medium text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.stock > 0 ? 'Add' : 'Out'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
