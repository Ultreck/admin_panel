import { Button } from "@/components/ui/button";
import { FaPills, FaBook, FaUpload, FaCog, FaUser } from "react-icons/fa";
import { useMockAuth } from "@/hooks/useMockAuth";

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const { user, logout } = useMockAuth();

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { id: "courses", label: "Course Management", icon: FaBook },
    { id: "upload", label: "Upload Course", icon: FaUpload },
    { id: "settings", label: "Settings", icon: FaCog },
  ];

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <FaPills className="text-primary text-2xl mr-2" />
        <span className="text-xl font-semibold text-gray-900">Admin Panel</span>
      </div>
      
      <nav className="mt-8 flex-1">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={currentView === item.id ? "default" : "ghost"}
              className={`w-full justify-start ${
                currentView === item.id
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => onViewChange(item.id)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <FaUser className="text-white text-sm" />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {user?.firstName || user?.email || "Admin User"}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-gray-500 hover:text-gray-700 p-0 h-auto"
              onClick={handleLogout}
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
