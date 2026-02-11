import { useState } from "react";
import { EmeraldButton } from "@emerald-react/button";
import { EmeraldInput } from "@emerald-react/input";
import { EmeraldInputType } from "@emerald/nxcore";
import { EmeraldIconButton } from "@emerald-react/icon-button";
import "./Requests.css";

interface Request {
  id: string;
  type: string;
  status: string;
  instrument: string;
  date: string;
  priority: string;
  assignedTo: string;
  description: string;
  estimatedCompletion: string;
}

const mockRequests: Request[] = [
  {
    id: "REQ-001",
    type: "Calibration",
    status: "In Progress",
    instrument: "INS-001",
    date: "2024-02-01",
    priority: "High",
    assignedTo: "John Smith",
    description: "Annual calibration service for HPLC system",
    estimatedCompletion: "2024-02-05",
  },
  {
    id: "REQ-002",
    type: "Maintenance",
    status: "Pending",
    instrument: "INS-003",
    date: "2024-02-02",
    priority: "Medium",
    assignedTo: "Sarah Johnson",
    description: "Routine maintenance and inspection",
    estimatedCompletion: "2024-02-10",
  },
  {
    id: "REQ-003",
    type: "Repair",
    status: "Completed",
    instrument: "INS-002",
    date: "2024-01-28",
    priority: "High",
    assignedTo: "Mike Chen",
    description: "Replace faulty detector module",
    estimatedCompletion: "2024-01-30",
  },
  {
    id: "REQ-004",
    type: "Calibration",
    status: "Scheduled",
    instrument: "INS-004",
    date: "2024-02-05",
    priority: "Low",
    assignedTo: "Emily Davis",
    description: "Quarterly calibration check",
    estimatedCompletion: "2024-02-08",
  },
  {
    id: "REQ-005",
    type: "Installation",
    status: "In Progress",
    instrument: "INS-005",
    date: "2024-02-03",
    priority: "High",
    assignedTo: "David Wilson",
    description: "Software update and system configuration",
    estimatedCompletion: "2024-02-06",
  },
];

type SortField = keyof Request;
type SortOrder = "asc" | "desc";

export default function Requests() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<Request>(mockRequests[0]);
  const [sortField, setSortField] = useState<SortField>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const statusMetrics = [
    { count: 48, label: "All Requests", color: "default" },
    { count: 12, label: "In Progress", color: "success", active: true },
    { count: 18, label: "Pending", color: "warning" },
    { count: 15, label: "Completed", color: "info" },
    { count: 3, label: "Scheduled", color: "neutral" },
  ];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredRequests = mockRequests
    .filter((request) =>
      request.id.toLowerCase().includes(searchValue.toLowerCase()) ||
      request.type.toLowerCase().includes(searchValue.toLowerCase()) ||
      request.instrument.toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const multiplier = sortOrder === "asc" ? 1 : -1;
      return aValue > bValue ? multiplier : -multiplier;
    });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "#D2785A";
      case "Medium":
        return "#DBD99A";
      case "Low":
        return "#3E7CA6";
      default:
        return "#5A5A5A";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "#50AF78";
      case "Pending":
        return "#DBD99A";
      case "Completed":
        return "#3E7CA6";
      case "Scheduled":
        return "#96B3B6";
      default:
        return "#5A5A5A";
    }
  };

  return (
    <div className="main-wrap">
      {/* Page Header */}
      <div className="page-header">
        <div className="panel-header">
          <h1 className="panel-title">Service Requests</h1>
          <EmeraldButton
            label="New Request"
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
                placeholder="Search by Request ID"
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
                      <span>Request ID</span>
                      <span className="material-icons sort-icon">
                        {sortField === "id" ? (sortOrder === "asc" ? "arrow_upward" : "arrow_downward") : "unfold_more"}
                      </span>
                    </div>
                  </th>
                  <th onClick={() => handleSort("type")} className="sortable-header">
                    <div className="header-content">
                      <span>Type</span>
                      <span className="material-icons sort-icon">
                        {sortField === "type" ? (sortOrder === "asc" ? "arrow_upward" : "arrow_downward") : "unfold_more"}
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
                  <th onClick={() => handleSort("instrument")} className="sortable-header">
                    <div className="header-content">
                      <span>Instrument</span>
                      <span className="material-icons sort-icon">
                        {sortField === "instrument" ? (sortOrder === "asc" ? "arrow_upward" : "arrow_downward") : "unfold_more"}
                      </span>
                    </div>
                  </th>
                  <th onClick={() => handleSort("date")} className="sortable-header">
                    <div className="header-content">
                      <span>Date</span>
                      <span className="material-icons sort-icon">
                        {sortField === "date" ? (sortOrder === "asc" ? "arrow_upward" : "arrow_downward") : "unfold_more"}
                      </span>
                    </div>
                  </th>
                  <th onClick={() => handleSort("priority")} className="sortable-header">
                    <div className="header-content">
                      <span>Priority</span>
                      <span className="material-icons sort-icon">
                        {sortField === "priority" ? (sortOrder === "asc" ? "arrow_upward" : "arrow_downward") : "unfold_more"}
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    className={selectedRequest.id === request.id ? "selected" : ""}
                    onClick={() => setSelectedRequest(request)}
                  >
                    <td>{request.id}</td>
                    <td>{request.type}</td>
                    <td>
                      <span className="status-badge" style={{ backgroundColor: `${getStatusColor(request.status)}15`, color: getStatusColor(request.status) }}>
                        {request.status}
                      </span>
                    </td>
                    <td>{request.instrument}</td>
                    <td>{request.date}</td>
                    <td>
                      <div className="priority-cell">
                        <div
                          className="priority-dot"
                          style={{ backgroundColor: getPriorityColor(request.priority) }}
                        ></div>
                        {request.priority}
                      </div>
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
              <span style={{ color: "#1A1A1A" }}>1-5 of {filteredRequests.length}</span>
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
            <h2 className="details-title">{selectedRequest.id}</h2>
            <div className="status-badge">
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: getStatusColor(selectedRequest.status),
                }}
              ></div>
              <span className="status-text">{selectedRequest.status}</span>
            </div>
          </div>

          <div className="details-actions">
            <EmeraldButton
              label="Edit Request"
              variant="Light"
              leftIcon="edit"
              size="Medium"
              style={{ flex: 1 }}
            />
          </div>

          {/* Request Information */}
          <div className="details-section">
            <h3 className="section-title">Request Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Type</div>
                <div className="info-value">{selectedRequest.type}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Instrument</div>
                <div className="info-value">{selectedRequest.instrument}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Date Created</div>
                <div className="info-value">{selectedRequest.date}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Priority</div>
                <div className="info-value">
                  <div className="priority-cell">
                    <div
                      className="priority-dot"
                      style={{ backgroundColor: getPriorityColor(selectedRequest.priority) }}
                    ></div>
                    {selectedRequest.priority}
                  </div>
                </div>
              </div>
              <div className="info-item">
                <div className="info-label">Assigned To</div>
                <div className="info-value">{selectedRequest.assignedTo}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Est. Completion</div>
                <div className="info-value">{selectedRequest.estimatedCompletion}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="details-section">
            <h3 className="section-title">Description</h3>
            <p className="description-text">{selectedRequest.description}</p>
          </div>

          {/* Activity Timeline */}
          <div className="details-section">
            <h3 className="section-title">Activity</h3>
            <div className="activity-timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-title">Request created</div>
                  <div className="timeline-time">{selectedRequest.date}</div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-title">Assigned to {selectedRequest.assignedTo}</div>
                  <div className="timeline-time">{selectedRequest.date}</div>
                </div>
              </div>
              {selectedRequest.status === "In Progress" && (
                <div className="timeline-item">
                  <div className="timeline-dot active"></div>
                  <div className="timeline-content">
                    <div className="timeline-title">Work in progress</div>
                    <div className="timeline-time">Current</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
