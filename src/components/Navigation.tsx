import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Leaf, LogOut, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const Navigation = ({ onStart }: { onStart?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { session, user, loading, signOut } = useAuth();
  
  const handleGetStarted = () => {
    if (onStart) {
      onStart();
    } else {
      navigate('/');
    }
  };
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "Challenges", path: "/challenges" },
    { name: "Rewards", path: "/rewards" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Community", path: "/community" },
    { name: "About", path: "/about" },
  ];
  
  return (
    <nav className="bg-white/90 backdrop-blur-sm py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-leafy-500 text-white p-2 rounded-full">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="text-xl font-heading font-bold text-leafy-800">ReLeaf</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={location.pathname === item.path ? "active-nav-item" : "nav-item"}
              >
                {item.name}
              </Link>
            ))}
            <Button 
              className="ml-4 eco-button"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-leafy-800 hover:text-leafy-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {isOpen && (
          <div className="md:hidden mt-3 animate-grow origin-top">
            <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className={location.pathname === item.path ? "active-nav-item" : "nav-item"}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button 
                className="mt-2 eco-button"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
