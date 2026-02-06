import { useState } from "react";
import { EmeraldButton } from "@emerald-react/button";
import { EmeraldInput } from "@emerald-react/input";
import { EmeraldInputType } from "@emerald/nxcore";
import { EmeraldIconButton } from "@emerald-react/icon-button";
import "./App.css";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [navExpanded, setNavExpanded] = useState(false);
  const [navPinned, setNavPinned] = useState(false);

  const statusMetrics = [
    { count: 356, label: "All Instruments", color: "default" },
    { count: 256, label: "Active", color: "success", active: true },
    { count: 25, label: "Inactive", color: "warning" },
    { count: 50, label: "Decommissioned", color: "decommissioned" },
    { count: 15, label: "Storage", color: "info" },
    { count: 10, label: "Out of service", color: "neutral" },
  ];

  const navItems = [
    { 
      icon: "dashboard", 
      label: "Dashboard", 
      selected: true 
    },
    { 
      icon: "note_alt", 
      label: "Service request", 
      selected: false 
    },
  ];

  const handleNavMouseEnter = () => {
    if (!navPinned) {
      setNavExpanded(true);
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
          {navItems.map((item, index) => (
            <div 
              key={index} 
              className={`nav-item ${item.selected ? 'selected' : ''}`}
            >
              <div className="nav-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {item.icon === 'dashboard' ? (
                    <path d="M14 9C13.7167 9 13.4792 8.90417 13.2875 8.7125C13.0958 8.52083 13 8.28333 13 8V4C13 3.71667 13.0958 3.47917 13.2875 3.2875C13.4792 3.09583 13.7167 3 14 3H20C20.2833 3 20.5208 3.09583 20.7125 3.2875C20.9042 3.47917 21 3.71667 21 4V8C21 8.28333 20.9042 8.52083 20.7125 8.7125C20.5208 8.90417 20.2833 9 20 9H14ZM4 13C3.71667 13 3.47917 12.9042 3.2875 12.7125C3.09583 12.5208 3 12.2833 3 12V4C3 3.71667 3.09583 3.47917 3.2875 3.2875C3.47917 3.09583 3.71667 3 4 3H10C10.2833 3 10.5208 3.09583 10.7125 3.2875C10.9042 3.47917 11 3.71667 11 4V12C11 12.2833 10.9042 12.5208 10.7125 12.7125C10.5208 12.9042 10.2833 13 10 13H4ZM14 21C13.7167 21 13.4792 20.9042 13.2875 20.7125C13.0958 20.5208 13 20.2833 13 20V12C13 11.7167 13.0958 11.4792 13.2875 11.2875C13.4792 11.0958 13.7167 11 14 11H20C20.2833 11 20.5208 11.0958 20.7125 11.2875C20.9042 11.4792 21 11.7167 21 12V20C21 20.2833 20.9042 20.5208 20.7125 20.7125C20.5208 20.9042 20.2833 21 20 21H14ZM4 21C3.71667 21 3.47917 20.9042 3.2875 20.7125C3.09583 20.5208 3 20.2833 3 20V16C3 15.7167 3.09583 15.4792 3.2875 15.2875C3.47917 15.0958 3.71667 15 4 15H10C10.2833 15 10.5208 15.0958 10.7125 15.2875C10.9042 15.4792 11 15.7167 11 16V20C11 20.2833 10.9042 20.5208 10.7125 20.7125C10.5208 20.9042 10.2833 21 10 21H4Z" fill={item.selected ? '#003F2D' : '#5A5A5A'}/>
                  ) : (
                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H9.2C9.41667 2.4 9.77917 1.91667 10.2875 1.55C10.7958 1.18333 11.3667 1 12 1C12.6333 1 13.2042 1.18333 13.7125 1.55C14.2208 1.91667 14.5833 2.4 14.8 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM12 4.25C12.2167 4.25 12.3958 4.17917 12.5375 4.0375C12.6792 3.89583 12.75 3.71667 12.75 3.5C12.75 3.28333 12.6792 3.10417 12.5375 2.9625C12.3958 2.82083 12.2167 2.75 12 2.75C11.7833 2.75 11.6042 2.82083 11.4625 2.9625C11.3208 3.10417 11.25 3.28333 11.25 3.5C11.25 3.71667 11.3208 3.89583 11.4625 4.0375C11.6042 4.17917 11.7833 4.25 12 4.25ZM7.5 17H8.7C8.83333 17 8.9625 16.9708 9.0875 16.9125C9.2125 16.8542 9.31667 16.7833 9.4 16.7L15.1 11.05L12.95 8.9L7.3 14.55C7.2 14.65 7.125 14.7625 7.075 14.8875C7.025 15.0125 7 15.1417 7 15.275V16.5C7 16.6333 7.05 16.75 7.15 16.85C7.25 16.95 7.36667 17 7.5 17ZM15.8 10.35L16.85 9.25C16.95 9.15 17 9.03333 17 8.9C17 8.76667 16.95 8.65 16.85 8.55L15.45 7.15C15.35 7.05 15.2333 7 15.1 7C14.9667 7 14.85 7.05 14.75 7.15L13.65 8.2L15.8 10.35Z" fill={item.selected ? '#003F2D' : '#5A5A5A'}/>
                  )}
                </svg>
              </div>
              {navExpanded && (
                <div className="nav-label">{item.label}</div>
              )}
            </div>
          ))}
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

      {/* Main Wrap - contains page header and body */}
      <div className="main-wrap">
        {/* Page Header - Full Width */}
        <div className="page-header">
          <div className="panel-header">
            <h1 className="panel-title">Instruments</h1>
            <EmeraldButton
              label="Add Instrument"
              variant="Primary"
              leftIcon="add"
              size="Medium"
            />
          </div>

          {/* Status Metrics */}
          <div className="status-metrics">
            {statusMetrics.map((metric, index) => (
              <div 
                key={index} 
                className={`metric-item metric-${metric.color} ${metric.active ? 'metric-active' : ''}`}
              >
                <div className="metric-count">{metric.count}</div>
                <div className="metric-label">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Page Body - Table and Details Pane Side by Side */}
        <div className="page-body">
          {/* Table Container */}
          <div className="table-container">
            {/* Search and Actions */}
            <div className="search-actions">
              <div className="search-container">
                <EmeraldInput
                  type={EmeraldInputType.Search}
                  placeholder="Search by Instrument ID"
                  value={searchValue}
                  onChange={(event, value) => setSearchValue(value as string)}
                  outlined
                />
              </div>
              <div className="action-buttons">
                <EmeraldIconButton icon="view_column" type="Icon" title="Manage columns" />
                <EmeraldIconButton icon="density_medium" type="Icon" title="Compact rows" />
                <EmeraldIconButton icon="filter_alt" type="Icon" title="Filter" />
                <EmeraldIconButton icon="download" type="Icon" title="Download as CSV" />
              </div>
            </div>

            {/* Scrollable List */}
            <div className="scrollable-list">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="list-item">
                  Scrollable content in here
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <div className="pagination-info">
                <span>Records</span>
                <span style={{ color: '#1A1A1A' }}>1-5 of 256</span>
                <span className="pagination-dot"></span>
                <span>Per Page</span>
                <select className="page-size-select">
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </div>
              <div className="pagination-controls">
                <EmeraldIconButton 
                  icon="first_page" 
                  type="Icon" 
                  size="Small"
                  disabled
                  title="First page"
                />
                <EmeraldIconButton 
                  icon="chevron_left" 
                  type="Icon" 
                  size="Small"
                  disabled
                  title="Previous page"
                />
                <select className="page-selector">
                  <option>1</option>
                </select>
                <span style={{ color: '#1A1A1A' }}>of</span>
                <span style={{ color: '#1A1A1A' }}>1</span>
                <span style={{ color: '#1A1A1A' }}>pages</span>
                <EmeraldIconButton 
                  icon="chevron_right" 
                  type="Icon" 
                  size="Small"
                  disabled
                  title="Next page"
                />
                <EmeraldIconButton 
                  icon="last_page" 
                  type="Icon" 
                  size="Small"
                  disabled
                  title="Last page"
                />
              </div>
            </div>
          </div>

          {/* Details Pane */}
          <div className="details-pane">
            <div className="details-header">
              <h2 className="details-title">Details pane</h2>
              <div className="status-badge">
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#50AF78'
                }}></div>
                <span className="status-text">Active</span>
              </div>
            </div>

            <div className="details-actions">
              <EmeraldButton
                label="New request"
                variant="Light"
                leftIcon="add"
                rightIcon="arrow_drop_down"
                size="Medium"
                style={{ flex: 1 }}
              />
            </div>

            {/* Scrollable Details */}
            <div className="scrollable-details">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="detail-item">
                  Scrollable content in here
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
