import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link to="/" className="z-10">
            <Logo />
          </Link>
          
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink to="/" label="Home" currentPath={location.pathname} onClick={closeMenu} />
            <NavLink to="/projects" label="Projects" currentPath={location.pathname} onClick={closeMenu} />
            <NavLink to="/tenders" label="Our Tenders" currentPath={location.pathname} onClick={closeMenu} />
            <NavLink to="/about" label="About" currentPath={location.pathname} onClick={closeMenu} />
            <NavLink to="/contact" label="Contact" currentPath={location.pathname} onClick={closeMenu} />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/admin/dashboard" 
                  className="btn-primary"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/admin/login" 
                  className="text-primary hover:text-primary-dark"
                >
                  Admin Login
                </Link>
                <Link 
                  to="/request-tender" 
                  className="btn-primary"
                >
                  Request a Tender
                </Link>
              </div>
            )}
          </div>
          
          <button 
            className="md:hidden z-10 focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Mobile menu */}
          {isOpen && (
            <div className="md:hidden fixed inset-0 bg-white z-0 pt-20">
              <div className="flex flex-col items-center space-y-6 py-10">
                <MobileNavLink to="/" label="Home" onClick={closeMenu} />
                <MobileNavLink to="/projects" label="Projects" onClick={closeMenu} />
                <MobileNavLink to="/tenders" label="Our Tenders" onClick={closeMenu} />
                <MobileNavLink to="/about" label="About" onClick={closeMenu} />
                <MobileNavLink to="/contact" label="Contact" onClick={closeMenu} />
                
                {user ? (
                  <>
                    <Link 
                      to="/admin/dashboard" 
                      className="btn-primary w-4/5 mx-auto text-center"
                      onClick={closeMenu}
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/admin/login" 
                      className="text-primary hover:text-primary-dark"
                      onClick={closeMenu}
                    >
                      Admin Login
                    </Link>
                    <Link 
                      to="/request-tender" 
                      className="btn-primary w-4/5 mx-auto text-center"
                      onClick={closeMenu}
                    >
                      Request a Tender
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  currentPath: string;
  onClick: () => void;
}

const NavLink = ({ to, label, currentPath, onClick }: NavLinkProps) => {
  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to));
  
  return (
    <Link
      to={to}
      className={`transition-colors hover:text-primary-light ${
        isActive ? 'text-primary font-medium' : 'text-secondary'
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  label: string;
  onClick: () => void;
}

const MobileNavLink = ({ to, label, onClick }: MobileNavLinkProps) => (
  <Link
    to={to}
    className="text-xl font-medium text-secondary hover:text-primary"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Navbar;