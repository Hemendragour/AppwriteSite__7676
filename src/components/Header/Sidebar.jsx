import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar, authStatus }) => {
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } shadow-lg`}
    >
      <button onClick={toggleSidebar} className="p-4">
        Close
      </button>
      <ul className="mt-8">
        {navItems.map(
          (item) =>
            item.active && (
              <li key={item.name}>
                <Link
                  to={item.slug}
                  className="block px-4 py-2 hover:bg-gray-700"
                  onClick={toggleSidebar}
                >
                  {item.name}
                </Link>
              </li>
            )
        )}
        {authStatus && (
          <li>
            <LogoutBtn onClick={toggleSidebar} />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
