import reports from "../../assets/header/reports.png";
import clients from "../../assets/header/clients.png";
import volunteers from "../../assets/header/volunteers.png";
import events from "../../assets/header/events.png";
import create from "../../assets/routerImg/create.png";
import { TbUsers } from "react-icons/tb";
import subscription from "../../assets/routerImg/subscription.png";
import user from "../../assets/routerImg/user.png";
import logo from "../../assets/header/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa"; 
import { IoIosLogIn } from "react-icons/io";
import { MdOutlineBarChart } from "react-icons/md";
import { FaRegHandPaper } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
const items = [
  {
    key: "events",
    label: "events",
    icon: <MdOutlineBarChart />,
    link: "/",
  },
  {
    key: "clients",
    label: "Clients",
    icon: <TbUsers />,
    link: "/dashboard/clients",
  },
  {
    key: "volunteers",
    label: "Volunteers",
    icon: <FaRegHandPaper />,
    link: "/dashboard/volunteers",
  },
  // {
  //   key: "categoriesManagement",
  //   label: "Categories Management",
  //   icon: categorie,
  //   link: "/dashboard/CategoriesManagement/Categories",
  //   children: [
  //     {
  //       key: "categoriesManagement",
  //       label: "Categories",
  //       link: "/dashboard/CategoriesManagement/Categories",
  //     },
  //     {
  //       key: "subcategory",
  //       label: "Subcategory",
  //       link: "/dashboard/CategoriesManagement/Subcategory",
  //     },
  //   ],
  // },
  {
    key: "reports",
    label: "Reports",
    icon: <CgNotes />,
    link: "/dashboard/reports",
  },
  // {
  //   key: "profile",
  //   label: "Settings",
  //   icon: settings,
  //   link: "/dashboard/Settings/profile",
  //   children: [
  //     {
  //       key: "profile",
  //       label: "Profile",
  //       link: "/dashboard/Settings/profile",
  //     },
  //     {
  //       key: "terms",
  //       label: "Terms & Condition",
  //       link: "/dashboard/Settings/Terms&Condition",
  //     },
  //     {
  //       key: "privacy",
  //       label: "Privacy Policy",
  //       link: "/dashboard/Settings/PrivacyPolicy",
  //     },
  //     {
  //       key: "faq",
  //       label: "FAQ",
  //       link: "/dashboard/Settings/FAQ",
  //     },
  //     {
  //       key: "about",
  //       label: "About Us",
  //       link: "/dashboard/Settings/aboutUs",
  //     },
  //   ],
  // },
];

const SidBar = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]); 
  const location = useLocation();
  const navigate = useNavigate(); 


  useEffect(() => {
    const currentPath = location.pathname;

  
    const parentItem = items.find(
      (item) =>
        item.link === currentPath ||
        (item.children &&
          item.children.some((child) => child.link === currentPath))
    );

    if (parentItem) {

      setSelectedKey(
        parentItem.children
          ? parentItem.children.find((child) => child.link === currentPath)
              ?.key || parentItem.key
          : parentItem.key
      );

      if (parentItem.children && !expandedKeys.includes(parentItem.key)) {
        setExpandedKeys([...expandedKeys, parentItem.key]);
      }
    }
  }, [location, expandedKeys]);


  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <div className="custom-sidebar h-full bg-[#F7F7F8]">
      {/* Logo */}
      <div className="custom-sidebar-logo flex justify-center pt-11">
        <img src={logo} alt="Logo" className="w-[180px]" />
      </div>

      {/* Sidebar Menu */}
      <div className="menu-items pt-12">
        {items.map((item) => (
          <div key={item.key}>
            {/* Render Parent Item */}
            <Link
              to={item.link}
              className={`menu-item my-4 mx-5 py-2 px-3 flex items-center cursor-pointer ${
                selectedKey === item.key
                  ? "text-blue-600 rounded-md"
                  : " hover:text-blue-700 "
              }`}
              onClick={(e) => {
                if (item.children) {
                  e.preventDefault(); 
                  onParentClick(item.key); 
                } else {
                  setSelectedKey(item.key); 
                }
              }}
            >
              <p className="w-5 h-5 mr-3 mt-1">{item.icon}</p>
              <span className="block w-full text-">{item.label}</span>

              
              {item.children && (
                <FaChevronRight
                  className={`ml-auto transform transition-all duration-300 ${
                    expandedKeys.includes(item.key) ? "rotate-90" : ""
                  }`}
                />
              )}
            </Link>

           
            {item.children && expandedKeys.includes(item.key) && (
              <div className="overflow-hidden bg-white -my-2 mx-5 mb-4 text-black transition-all duration-300">
                {item.children.map((child) => (
                  <Link
                    key={child.key}
                    to={child.link}
                    className={`menu-item p-4 flex items-center cursor-pointer ${
                      selectedKey === child.key
                        ? "bg-[#EDC4C5]"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      setSelectedKey(child.key); 
                      setExpandedKeys([]); 
                    }}
                  >
                    <span className="block w-full text-black">
                      {child.label}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer (Log Out) */}
      <div className="custom-sidebar-footer absolute bottom-0 w-full p-4">
        <button
          onClick={handleLogout} 
          className="w-full flex bg-white text-start rounded-md text-black p-3"
        >
          <span className="text-2xl"><IoIosLogIn /></span>
          <span className="ml-3">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SidBar;
