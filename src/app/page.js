'use client';

import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, User, Menu, X, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const JewelleryStore = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroSlides = [
    {
      title: "Exclusive Jewellery Collection",
      subtitle: "Discover Timeless Elegance",
      description: "Shop the latest trends in fine jewellery",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=600&fit=crop"
    },
    {
      title: "Diamond Collection",
      subtitle: "Sparkle & Shine",
      description: "Exquisite diamonds for every occasion",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&h=600&fit=crop"
    }
  ];

  const categories = [
    { name: "Rings", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop", count: 45 },
    { name: "Necklaces", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop", count: 38 },
    { name: "Earrings", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop", count: 52 },
    { name: "Bracelets", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop", count: 29 }
  ];

  const products = [
    {
      id: 1,
      name: "Diamond Engagement Ring",
      price: 2499,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
      rating: 5,
      reviews: 124,
      badge: "NEW"
    },
    {
      id: 2,
      name: "Gold Pearl Necklace",
      price: 899,
      originalPrice: 1199,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 89,
      badge: "SALE"
    },
    {
      id: 3,
      name: "Silver Hoop Earrings",
      price: 299,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
      rating: 4,
      reviews: 67,
      badge: "HOT"
    },
    {
      id: 4,
      name: "Ruby Tennis Bracelet",
      price: 1799,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
      rating: 5,
      reviews: 156,
      badge: null
    },
    {
      id: 5,
      name: "Emerald Drop Earrings",
      price: 1299,
      originalPrice: 1599,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 92,
      badge: "SALE"
    },
    {
      id: 6,
      name: "Platinum Band Ring",
      price: 999,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=400&h=400&fit=crop",
      rating: 5,
      reviews: 203,
      badge: "NEW"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  const addToWishlist = () => {
    setWishlistCount(wishlistCount + 1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-2 px-4 text-sm text-center">
        <p>Free Shipping On Orders Over $500 | Use Code: LUXURY10 For 10% Off</p>
      </div>

      {/* Header */}
      <header className="sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <button 
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-serif font-bold text-amber-700">LUXE JEWELS</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <a href="#" className="text-gray-800 hover:text-amber-600 font-medium transition">Home</a>
              <a href="#" className="text-gray-800 hover:text-amber-600 font-medium transition">Shop</a>
              <a href="#" className="text-gray-800 hover:text-amber-600 font-medium transition">Collections</a>
              <a href="#" className="text-gray-800 hover:text-amber-600 font-medium transition">About</a>
              <a href="#" className="text-gray-800 hover:text-amber-600 font-medium transition">Contact</a>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className="relative hover:text-amber-600 transition">
                <Search size={22} />
              </button>
              <button className="relative hover:text-amber-600 transition">
                <User size={22} />
              </button>
              <button className="relative hover:text-amber-600 transition" onClick={addToWishlist}>
                <Heart size={22} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button className="relative hover:text-amber-600 transition">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-4 border-t mt-2 pt-4">
              <nav className="flex flex-col space-y-3">
                <a href="#" className="text-gray-800 hover:text-amber-600 font-medium transition">Home</a>
                <a href="#" className="text-gray-800 hover:text-amber-600 font-medium transition">Shop</a>
                <a href="#" className="text-gray-800 hover:text-amber-600 font-medium transition">Collections</a>
                <a href="#" className="text-gray-800 hover:text-amber-600 font-medium transition">About</a>
                <a href="#" className="text-gray-800 hover:text-amber-600 font-medium transition">Contact</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Slider */}
      <section className="relative h-96 lg:h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <p className="text-sm lg:text-base uppercase tracking-widest mb-2 text-amber-300">{slide.subtitle}</p>
                  <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-4">{slide.title}</h2>
                  <p className="text-lg lg:text-xl mb-8">{slide.description}</p>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-medium transition transform hover:scale-105">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slider Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-amber-600' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">Shop By Category</h2>
          <p className="text-gray-600">Discover our exclusive collections</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-200">{category.count} Products</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600">Handpicked pieces for the discerning customer</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative overflow-hidden aspect-square">
                  {product.badge && (
                    <span className={`absolute top-4 left-4 z-10 px-3 py-1 text-xs font-bold text-white rounded-full ${
                      product.badge === 'NEW' ? 'bg-green-600' : 
                      product.badge === 'SALE' ? 'bg-red-600' : 'bg-amber-600'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
                      <button
                        onClick={addToCart}
                        className="bg-white text-gray-800 p-3 rounded-full hover:bg-amber-600 hover:text-white transition"
                      >
                        <ShoppingCart size={20} />
                      </button>
                      <button
                        onClick={addToWishlist}
                        className="bg-white text-gray-800 p-3 rounded-full hover:bg-red-500 hover:text-white transition"
                      >
                        <Heart size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-amber-600 transition">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < Math.floor(product.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-amber-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-3 rounded-full font-medium transition transform hover:scale-105">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-4">Limited Time Offer</h2>
          <p className="text-xl mb-8">Get Up To 30% Off On Selected Items</p>
          <button className="bg-white text-amber-700 hover:bg-gray-100 px-10 py-3 rounded-full font-bold transition transform hover:scale-105">
            Shop Sale
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">100% authentic jewellery with certificates</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing on all products</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Safe and secure payment methods</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">LUXE JEWELS</h3>
              <p className="mb-4">Your destination for luxury jewellery and timeless elegance.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-amber-600 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-amber-600 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-amber-600 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-600 transition">About Us</a></li>
                <li><a href="#" className="hover:text-amber-600 transition">Contact</a></li>
                <li><a href="#" className="hover:text-amber-600 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-amber-600 transition">Terms & Conditions</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-600 transition">Shipping Info</a></li>
                <li><a href="#" className="hover:text-amber-600 transition">Returns</a></li>
                <li><a href="#" className="hover:text-amber-600 transition">Size Guide</a></li>
                <li><a href="#" className="hover:text-amber-600 transition">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Newsletter</h4>
              <p className="mb-4">Subscribe to get special offers and updates</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
                />
                <button className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-r-lg transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p>&copy; 2025 Luxe Jewels. All rights reserved. | Crafted with excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JewelleryStore;