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
    { count: 356, label: "All instruments", color: "default" },
    { count: 256, label: "Active", color: "success" },
    { count: 25, label: "Inactive", color: "warning" },
    { count: 50, label: "Decommissioned", color: "neutral" },
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
            icon="help_outline" 
            type="Icon" 
            title="Help"
          />
          <EmeraldIconButton 
            icon="settings" 
            type="Icon" 
            title="Settings"
          />
          <EmeraldIconButton 
            icon="apps" 
            type="Icon" 
            title="Apps"
          />
        </div>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        <EmeraldIconButton 
          icon="menu" 
          type="Icon" 
          size="Medium"
          title="Menu"
        />
        <EmeraldIconButton 
          icon="edit" 
          type="Icon" 
          size="Medium"
          title="Edit"
        />
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
            <div key={index} className={`metric-item metric-${metric.color}`}>
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
              leadingIcon="search"
              showClearIcon={true}
              outlined
            />
          </div>
          <div className="action-buttons">
            <EmeraldIconButton icon="view_module" type="Icon" title="Grid view" />
            <EmeraldIconButton icon="list" type="Icon" title="List view" />
            <EmeraldIconButton icon="filter_list" type="Icon" title="Filter" />
            <EmeraldIconButton icon="download" type="Icon" title="Download" />
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
          <span className="pagination-info">Records 1-5 of 256 • Per Page</span>
          <select className="page-size-select">
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span className="pagination-controls">
            <select className="page-selector">
              <option>1</option>
            </select>
            <span className="page-total">of 1 pages</span>
          </span>
        </div>
      </main>

      {/* Main Right Panel */}
      <aside className="main-right">
        <div className="details-header">
          <h2 className="details-title">Details pane</h2>
          <div className="status-badge">
            <EmeraldBadge
              size={EmeraldBadgeSize.SMALL}
              variant={EmeraldBadgeVariant.DOT}
              title="Active"
            />
            <span className="status-text">Active</span>
          </div>
        </div>

        <div className="details-actions">
          <EmeraldButton
            label="New request"
            variant="Primary"
            leftIcon="add"
            size="Medium"
          />
          <EmeraldIconButton 
            icon="expand_more" 
            type="Icon" 
            title="More options"
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
