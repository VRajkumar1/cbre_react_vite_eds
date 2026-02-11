import { useState } from "react";
import { EmeraldButton } from "@emerald-react/button";
import { EmeraldInput } from "@emerald-react/input";
import { EmeraldInputType } from "@emerald/nxcore";
import { EmeraldIconButton } from "@emerald-react/icon-button";
import "./Instruments.css";

interface Instrument {
  id: string;
  serialNumber: string;
  manufacturer: string;
  system: string;
  status: string;
  location: string;
  lastCalibration: string;
  nextCalibration: string;
}

const mockInstruments: Instrument[] = [
  {
    id: "INS-001",
    serialNumber: "SN-2024-001",
    manufacturer: "Agilent Technologies",
    system: "HPLC",
    status: "Active",
    location: "Lab A - Room 101",
    lastCalibration: "2024-01-15",
    nextCalibration: "2024-07-15",
  },
  {
    id: "INS-002",
    serialNumber: "SN-2024-002",
    manufacturer: "Thermo Fisher",
    system: "Mass Spectrometer",
    status: "Active",
    location: "Lab B - Room 205",
    lastCalibration: "2024-02-01",
    nextCalibration: "2024-08-01",
  },
  {
    id: "INS-003",
    serialNumber: "SN-2023-045",
    manufacturer: "Waters Corporation",
    system: "UPLC",
    status: "Inactive",
    location: "Lab A - Room 103",
    lastCalibration: "2023-11-20",
    nextCalibration: "2024-05-20",
  },
  {
    id: "INS-004",
    serialNumber: "SN-2024-003",
    manufacturer: "PerkinElmer",
    system: "Spectrophotometer",
    status: "Active",
    location: "Lab C - Room 301",
    lastCalibration: "2024-01-10",
    nextCalibration: "2024-07-10",
  },
  {
    id: "INS-005",
    serialNumber: "SN-2023-089",
    manufacturer: "Agilent Technologies",
    system: "GC-MS",
    status: "Active",
    location: "Lab B - Room 208",
    lastCalibration: "2024-02-15",
    nextCalibration: "2024-08-15",
  },
];

type SortField = keyof Instrument;
type SortOrder = "asc" | "desc";

export default function Instruments() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument>(mockInstruments[0]);
  const [sortField, setSortField] = useState<SortField>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const statusMetrics = [
    { count: 356, label: "All Instruments", color: "default" },
    { count: 256, label: "Active", color: "success", active: true },
    { count: 25, label: "Inactive", color: "warning" },
    { count: 50, label: "Decommissioned", color: "decommissioned" },
    { count: 15, label: "Storage", color: "info" },
    { count: 10, label: "Out of service", color: "neutral" },
  ];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredInstruments = mockInstruments
    .filter((instrument) =>
      instrument.id.toLowerCase().includes(searchValue.toLowerCase()) ||
      instrument.serialNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
      instrument.manufacturer.toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const multiplier = sortOrder === "asc" ? 1 : -1;
      return aValue > bValue ? multiplier : -multiplier;
    });

  return (
    <div className="main-wrap">
      {/* Page Header */}
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
              className={`metric-item metric-${metric.color} ${metric.active ? "metric-active" : ""}`}
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

          {/* Data Table */}
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("id")} className="sortable-header">
                    <div className="header-content">
                      <span>Instrument ID</span>
                      <span className="material-icons sort-icon">
                        {sortField === "id" ? (sortOrder === "asc" ? "arrow_upward" : "arrow_downward") : "unfold_more"}
                      </span>
                    </div>
                  </th>
                  <th onClick={() => handleSort("serialNumber")} className="sortable-header">
                    <div className="header-content">
                      <span>Serial Number</span>
                      <span className="material-icons sort-icon">
                        {sortField === "serialNumber" ? (sortOrder === "asc" ? "arrow_upward" : "arrow_downward") : "unfold_more"}
                      </span>
                    </div>
                  </th>
                  <th onClick={() => handleSort("manufacturer")} className="sortable-header">
                    <div className="header-content">
                      <span>Manufacturer</span>
                      <span className="material-icons sort-icon">
                        {sortField === "manufacturer" ? (sortOrder === "asc" ? "arrow_upward" : "arrow_downward") : "unfold_more"}
                      </span>
                    </div>
                  </th>
                  <th onClick={() => handleSort("system")} className="sortable-header">
                    <div className="header-content">
                      <span>System</span>
                      <span className="material-icons sort-icon">
                        {sortField === "system" ? (sortOrder === "asc" ? "arrow_upward" : "arrow_downward") : "unfold_more"}
                      </span>
                    </div>
                  </th>
                  <th onClick={() => handleSort("status")} className="sortable-header">
                    <div className="header-content">
                      <span>Status</span>
                      <span className="material-icons sort-icon">
                        {sortField === "status" ? (sortOrder === "asc" ? "arrow_upward" : "arrow_downward") : "unfold_more"}
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInstruments.map((instrument) => (
                  <tr
                    key={instrument.id}
                    className={selectedInstrument.id === instrument.id ? "selected" : ""}
                    onClick={() => setSelectedInstrument(instrument)}
                  >
                    <td>{instrument.id}</td>
                    <td>{instrument.serialNumber}</td>
                    <td>{instrument.manufacturer}</td>
                    <td>{instrument.system}</td>
                    <td>
                      <span className={`status-badge status-${instrument.status.toLowerCase()}`}>
                        {instrument.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <div className="pagination-info">
              <span>Records</span>
              <span style={{ color: "#1A1A1A" }}>1-5 of {filteredInstruments.length}</span>
              <span className="pagination-dot"></span>
              <span>Per Page</span>
              <select className="page-size-select">
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
            <div className="pagination-controls">
              <EmeraldIconButton icon="first_page" type="Icon" size="Small" disabled title="First page" />
              <EmeraldIconButton icon="chevron_left" type="Icon" size="Small" disabled title="Previous page" />
              <select className="page-selector">
                <option>1</option>
              </select>
              <span style={{ color: "#1A1A1A" }}>of</span>
              <span style={{ color: "#1A1A1A" }}>1</span>
              <span style={{ color: "#1A1A1A" }}>pages</span>
              <EmeraldIconButton icon="chevron_right" type="Icon" size="Small" disabled title="Next page" />
              <EmeraldIconButton icon="last_page" type="Icon" size="Small" disabled title="Last page" />
            </div>
          </div>
        </div>

        {/* Details Pane */}
        <div className="details-pane">
          <div className="details-header">
            <h2 className="details-title">{selectedInstrument.id}</h2>
            <div className="status-badge">
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: selectedInstrument.status === "Active" ? "#50AF78" : "#D2785A",
                }}
              ></div>
              <span className="status-text">{selectedInstrument.status}</span>
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

          {/* Instrument Information */}
          <div className="details-section">
            <h3 className="section-title">Instrument Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Serial Number</div>
                <div className="info-value">{selectedInstrument.serialNumber}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Manufacturer</div>
                <div className="info-value">{selectedInstrument.manufacturer}</div>
              </div>
              <div className="info-item">
                <div className="info-label">System</div>
                <div className="info-value">{selectedInstrument.system}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Location</div>
                <div className="info-value">{selectedInstrument.location}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Last Calibration</div>
                <div className="info-value">{selectedInstrument.lastCalibration}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Next Calibration</div>
                <div className="info-value">{selectedInstrument.nextCalibration}</div>
              </div>
            </div>
          </div>

          {/* Entitlements */}
          <div className="details-section">
            <h3 className="section-title">Entitlements</h3>
            <div className="entitlements-list">
              <div className="entitlement-item">
                <span className="material-icons">check_circle</span>
                <span>Full maintenance coverage</span>
              </div>
              <div className="entitlement-item">
                <span className="material-icons">check_circle</span>
                <span>24/7 technical support</span>
              </div>
              <div className="entitlement-item">
                <span className="material-icons">check_circle</span>
                <span>Calibration services</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
