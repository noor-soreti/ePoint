import { Link } from "react-router";
import "./SideBar.css"
export const SideBar = () => {
    const menuItems = [
      { text: "Home", path: "/"},
      { text: "Analytics", path: "/analytics"},
      { text: "Settings", path: "/settings"},
    ];

    return (
      <div className="sidebar">
        <h1 className="sidebar-title">Dashboard</h1>
        <ul className="menu">
          {menuItems.map((item, index) => (
            <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
              <li key={index} className="menu-item">
                {item.text}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
};