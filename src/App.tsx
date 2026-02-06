import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { EmeraldIconButton } from "@emerald-react/icon-button";
import Dashboard from "./pages/Dashboard";
import Instruments from "./pages/Instruments";
import Requests from "./pages/Requests";
import EmeraldComponents from "./pages/EmeraldComponents";
import "./App.css";

function AppContent() {
  const [navExpanded, setNavExpanded] = useState(false);
  const [navPinned, setNavPinned] = useState(false);
  const [codedComponentsExpanded, setCodedComponentsExpanded] = useState(true);
  const location = useLocation();

  const navItems = [
    {
      icon: "dashboard",
      label: "Dashboard",
      path: "/"
    },
    {
      icon: "science",
      label: "Instruments",
      path: "/instruments"
    },
    {
      icon: "note_alt",
      label: "Service request",
      path: "/requests"
    },
  ];

  const handleNavMouseEnter = () => {
    if (!navPinned) {
      setNavExpanded(true);
      setCodedComponentsExpanded(true);
    }
  };

  const handleNavMouseLeave = () => {
    if (!navPinned) {
      setNavExpanded(false);
    }
  };

  const handlePinToggle = () => {
    setNavPinned(!navPinned);
    if (!navPinned) {
      setNavExpanded(true);
      setCodedComponentsExpanded(true);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <span className="app-title">App name</span>
        </div>
        <div className="header-right">
          <EmeraldIconButton 
            icon="help" 
            type="Icon" 
            title="Help"
          />
          <div style={{ 
            width: '24px', 
            height: '24px', 
            borderRadius: '100px', 
            background: 'rgba(255, 255, 255, 0.60)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            color: '#003F2D',
            fontWeight: 400
          }}>
            BS
          </div>
          <EmeraldIconButton 
            icon="apps" 
            type="Icon" 
            title="Apps"
          />
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`sidebar ${navExpanded ? 'expanded' : ''}`}
        onMouseEnter={handleNavMouseEnter}
        onMouseLeave={handleNavMouseLeave}
      >
        <div className="nav-items">
          {navItems.map((item, index) => {
            const isSelected = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`nav-item ${isSelected ? 'selected' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="nav-icon">
                  <span className="material-icons" style={{ color: isSelected ? '#003F2D' : '#5A5A5A' }}>
                    {item.icon}
                  </span>
                </div>
                {navExpanded && (
                  <div className="nav-label">{item.label}</div>
                )}
              </Link>
            );
          })}

          {/* Coded Components with submenu */}
          <div className="nav-divider"></div>

          <div
            className="nav-item nav-item-expandable"
            onClick={() => setCodedComponentsExpanded(!codedComponentsExpanded)}
          >
            <div className="nav-icon">
              <span className="material-icons" style={{ color: '#5A5A5A' }}>
                category
              </span>
            </div>
            {navExpanded && (
              <>
                <div className="nav-label">Coded components</div>
                <div className={`nav-caret ${codedComponentsExpanded ? 'expanded' : ''}`}>
                  <span className="material-icons" style={{ color: '#5A5A5A' }}>
                    keyboard_arrow_down
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Submenu items */}
          {navExpanded && codedComponentsExpanded && (
            <>
              <Link
                to="/coded-components/emerald"
                className={`nav-item nav-sub-item ${location.pathname === '/coded-components/emerald' ? 'selected' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="nav-label">Emerald</div>
              </Link>
              <Link
                to="/coded-components/custom"
                className={`nav-item nav-sub-item ${location.pathname === '/coded-components/custom' ? 'selected' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="nav-label">Custom</div>
              </Link>
            </>
          )}
        </div>

        {navExpanded && (
          <div className="nav-pin-wrapper">
            <button 
              className="pin-button"
              onClick={handlePinToggle}
              title={navPinned ? "Unpin navigation" : "Pin navigation"}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {navPinned ? (
                  <path d="M14 5V10C14 10.55 14.45 11 15 11C15.55 11 16 10.55 16 10V4C16 3.45 15.55 3 15 3H9C8.45 3 8 3.45 8 4V10C8 10.55 8.45 11 9 11C9.55 11 10 10.55 10 10V5H11V14L7 15V16H11V21C11 21.55 11.45 22 12 22C12.55 22 13 21.55 13 21V16H17V15L13 14V5H14Z" fill="#5A5A5A"/>
                ) : (
                  <path d="M14 5H10V7.175L7.25001 4.425C7.16668 4.34167 7.10418 4.25 7.06251 4.15C7.02085 4.05 7.00001 3.95 7.00001 3.85C7.00001 3.63333 7.07501 3.4375 7.22501 3.2625C7.37501 3.0875 7.57501 3 7.82501 3H16C16.2833 3 16.5208 3.09583 16.7125 3.2875C16.9042 3.47917 17 3.71667 17 4C17 4.26667 16.8792 4.45417 16.6375 4.5625C16.3958 4.67083 16.1833 4.81667 16 5V11C16 11.2833 15.9042 11.5208 15.7125 11.7125C15.5208 11.9042 15.2833 12 15 12C14.7167 12 14.4792 11.9042 14.2875 11.7125C14.0958 11.5208 14 11.2833 14 11V5ZM11 22V16H7.40001C6.98335 16 6.65001 15.8542 6.40001 15.5625C6.15001 15.2708 6.02501 14.9417 6.02501 14.575C6.02501 14.3917 6.06251 14.2083 6.13751 14.025C6.21251 13.8417 6.33335 13.6667 6.50001 13.5L8.00001 12V10.85L2.10001 4.9C1.91668 4.71667 1.82085 4.4875 1.81251 4.2125C1.80418 3.9375 1.90001 3.7 2.10001 3.5C2.28335 3.31667 2.51668 3.225 2.80001 3.225C3.08335 3.225 3.31668 3.31667 3.50001 3.5L20.475 20.475C20.675 20.675 20.7708 20.9125 20.7625 21.1875C20.7542 21.4625 20.65 21.7 20.45 21.9C20.25 22.0833 20.0167 22.1792 19.75 22.1875C19.4833 22.1958 19.25 22.1 19.05 21.9L13.15 16H13V22C13 22.2833 12.9042 22.5208 12.7125 22.7125C12.5208 22.9042 12.2833 23 12 23C11.7167 23 11.4792 22.9042 11.2875 22.7125C11.0958 22.5208 11 22.2833 11 22ZM8.85001 14H11.15L10.05 12.9L10 12.85L8.85001 14Z" fill="#5A5A5A"/>
                )}
              </svg>
            </button>
          </div>
        )}
      </aside>

      {/* Routes - Page content */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/instruments" element={<Instruments />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/coded-components/emerald" element={<EmeraldComponents />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
