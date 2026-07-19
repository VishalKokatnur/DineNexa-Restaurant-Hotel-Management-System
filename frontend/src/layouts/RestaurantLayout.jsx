// import { NavLink } from "react-router-dom";
// import "../pages/DashboardPage.css";

// function RestaurantLayout({ children }) {
//   const role = localStorage.getItem("role");

//   const menus = {
//     Admin: [
//       ["Dashboard", "/dashboard"],
//       ["Orders", "/orders"],
//       ["Menu", "/menu"],
//       ["Tables", "/tables"],
//       ["Billing", "/billing"],
//       ["Bills", "/bills"],
//       ["Inventory", "/inventory"],
//       ["Purchase", "/purchase"],
//       ["Employees", "/employees"],
//       ["Customers", "/customers"],
//       ["Kitchen", "/kitchen"],
//       ["Sales Report", "/reports/sales"],
//       ["Reservations", "/reservations"],
//       ["Low Stock", "/inventory/low-stock"],
//     ],

//     Manager: [
//       ["Dashboard", "/dashboard"],
//       ["Orders", "/orders"],
//       ["Menu", "/menu"],
//       ["Tables", "/tables"],
//       ["Inventory", "/inventory"],
//       ["Purchase", "/purchase"],
//       ["Sales Report", "/reports/sales"],
//       ["Low Stock", "/inventory/low-stock"],
//     ],

//     Cashier: [
//       ["Billing", "/billing"],
//       ["Orders", "/orders"],
//       ["Bills", "/bills"],
//       ["Customers", "/customers"],
//       ["Sales Report", "/reports/sales"],
//     ],

//     Waiter: [
//       ["Orders", "/orders"],
//       ["Tables", "/tables"],
//       ["Customers", "/customers"],
//     ],

//     Chef: [["Kitchen", "/kitchen"]],
//   };

//   const allowedMenus = menus[role] || [];

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   return (
//     <div className="restaurant-dashboard">
//       <nav className="restaurant-navbar">
//         <div className="restaurant-logo">
//           <h1>SmartDine Pro</h1>
//           <p>Premium Restaurant Management</p>
//           <span className="role-badge">Role: {role}</span>
//         </div>

//         <div className="restaurant-links">
//           {allowedMenus.map((menu, index) => (
//             <NavLink
//               key={index}
//               to={menu[1]}
//               className={({ isActive }) => (isActive ? "active-link" : "")}
//             >
//               {menu[0]}
//             </NavLink>
//           ))}

//           <button className="logout-btn" onClick={logout}>
//             Logout
//           </button>
//         </div>
//       </nav>

//       {children}
//     </div>
//   );
// }

// export default RestaurantLayout;
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "../pages/DashboardPage.css";

function RestaurantLayout({ children }) {
  const role = localStorage.getItem("role");

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const menus = {
    Admin: [
      ["🏠 Dashboard", "/dashboard"],
      ["📋 Orders", "/orders"],
      ["🍽 Menu", "/menu"],
      ["🪑 Tables", "/tables"],
      ["💳 Billing", "/billing"],
      ["🧾 Bills", "/bills"],
      ["📦 Inventory", "/inventory"],
      ["🛒 Purchase", "/purchase"],
      ["👨‍🍳 Employees", "/employees"],
      ["👥 Customers", "/customers"],
      ["🍳 Kitchen", "/kitchen"],
      ["📈 Sales Report", "/reports/sales"],
      ["📅 Reservations", "/reservations"],
      ["⚠️ Low Stock", "/inventory/low-stock"],
    ],

    Manager: [
      ["🏠 Dashboard", "/dashboard"],
      ["📋 Orders", "/orders"],
      ["🍽 Menu", "/menu"],
      ["🪑 Tables", "/tables"],
      ["📦 Inventory", "/inventory"],
      ["🛒 Purchase", "/purchase"],
      ["📈 Sales Report", "/reports/sales"],
      ["⚠️ Low Stock", "/inventory/low-stock"],
    ],

    Cashier: [
      ["🏠 Dashboard", "/dashboard"],
      ["📋 Orders", "/orders"],
      ["💳 Billing", "/billing"],
      ["🧾 Bills", "/bills"],
      ["👥 Customers", "/customers"],
      ["📈 Sales Report", "/reports/sales"],
    ],

    Waiter: [
      ["🏠 Dashboard", "/dashboard"],
      ["📋 Orders", "/orders"],
      ["🪑 Tables", "/tables"],
      ["👥 Customers", "/customers"],
    ],

    Chef: [
      ["🏠 Dashboard", "/dashboard"],
      ["🍳 Kitchen", "/kitchen"],
    ],
  };

  const allowedMenus = menus[role] || [];

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="restaurant-dashboard">
      <nav className="restaurant-navbar">

        {/* Left Side */}
        <div className="restaurant-logo">
          <h1>SmartDine Pro</h1>
          <p>Premium Restaurant Management</p>
          <span className="role-badge">Role: {role}</span>
        </div>

        {/* Right Side */}
        <div className="sdp-navbar-right">

          <div className="sdp-appsmenu" ref={menuRef}>
            <button
              className={`sdp-appsmenu-btn ${menuOpen ? "sdp-open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="sdp-appsmenu-dots">⋯</span>
              <span className="sdp-appsmenu-label">All Apps</span>
            </button>

            {menuOpen && (
              <div className="sdp-appsmenu-dropdown">
                <div className="sdp-appsmenu-dropdown-header">
                  <span>Quick Access</span>
                </div>

                <div className="sdp-appsmenu-grid">
                  {allowedMenus.map((menu, index) => {
                    const [emojiLabel, path] = menu;
                    const [emoji, ...rest] = emojiLabel.split(" ");
                    const label = rest.join(" ");
                    return (
                      <NavLink
                        key={index}
                        to={path}
                        className={({ isActive }) =>
                          isActive
                            ? "sdp-appsmenu-item sdp-appsmenu-item-active"
                            : "sdp-appsmenu-item"
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="sdp-appsmenu-item-icon">{emoji}</span>
                        <span className="sdp-appsmenu-item-label">{label}</span>
                      </NavLink>
                    );
                  })}
                </div>

                <div className="sdp-appsmenu-divider"></div>

                <button className="sdp-appsmenu-logout" onClick={logout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>

        </div>

      </nav>

      {children}
    </div>
  );
}

export default RestaurantLayout;