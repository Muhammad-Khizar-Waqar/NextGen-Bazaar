import  { useState } from 'react';
import { Menu, X, User, ShoppingCart, Search } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <div className="w-full bg-base-100 shadow-lg">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Logo and Brand */}
        <div className="flex-1">
          <a className="text-2xl font-bold">Brand</a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-none gap-2">
          <div className="flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-base hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 ml-8">
            <button className="btn btn-ghost btn-circle">
              <Search className="h-5 w-5" />
            </button>
            <button className="btn btn-ghost btn-circle">
              <User className="h-5 w-5" />
            </button>
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <ShoppingCart className="h-5 w-5" />
                <span className="badge badge-sm indicator-item">3</span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex-none md:hidden">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4 bg-base-100 border-t">
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-base hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t">
              <button className="btn btn-ghost btn-circle">
                <Search className="h-5 w-5" />
              </button>
              <button className="btn btn-ghost btn-circle">
                <User className="h-5 w-5" />
              </button>
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="badge badge-sm indicator-item">3</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;