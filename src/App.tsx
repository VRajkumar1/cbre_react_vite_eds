import { useState } from "react";
import { EmeraldButton } from "@emerald-react/button";
import { EmeraldInput } from "@emerald-react/input";
import { EmeraldInputType, EmeraldBadgeSize, EmeraldBadgeVariant } from "@emerald/nxcore";
import { EmeraldIconButton } from "@emerald-react/icon-button";
import { EmeraldBadge } from "@emerald-react/badge";
import "./App.css";

function App() {
  const [searchValue, setSearchValue] = useState("");

  const statusMetrics = [
    { count: 356, label: "All Instruments", color: "default" },
    { count: 256, label: "Active", color: "success", active: true },
    { count: 25, label: "Inactive", color: "warning" },
    { count: 50, label: "Decommissioned", color: "decommissioned" },
    { count: 15, label: "Storage", color: "info" },
    { count: 10, label: "Out of service", color: "neutral" },
  ];

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

      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 63, 45, 0.08)',
          borderLeft: '4px solid #003F2D',
          position: 'relative'
        }}>
          <EmeraldIconButton 
            icon="dashboard" 
            type="Icon" 
            size="Medium"
            title="Dashboard"
          />
        </div>
        <div style={{
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <EmeraldIconButton 
            icon="note_alt" 
            type="Icon" 
            size="Medium"
            title="Service request"
          />
        </div>
      </aside>

      {/* Main Left Panel */}
      <main className="main-left">
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
      </main>

      {/* Main Right Panel */}
      <aside className="main-right">
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
      </aside>
    </div>
  );
}

export default App;
