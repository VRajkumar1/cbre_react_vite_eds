import { EmeraldButton } from "@emerald-react/button";
import "./Dashboard.css";

export default function Dashboard() {
  const kpiData = [
    { label: "Total Instruments", value: "356", change: "+12%", trend: "up" },
    { label: "Active Requests", value: "48", change: "+8%", trend: "up" },
    { label: "Completed This Month", value: "124", change: "-3%", trend: "down" },
    { label: "Pending Review", value: "15", change: "+5%", trend: "up" },
  ];

  return (
    <div className="main-wrap">
      {/* Page Header */}
      <div className="page-header">
        <div className="panel-header">
          <h1 className="panel-title">Dashboard</h1>
          <EmeraldButton
            label="Generate Report"
            variant="Primary"
            leftIcon="assessment"
            size="Medium"
          />
        </div>
      </div>

      {/* Dashboard Body */}
      <div className="dashboard-body">
        {/* KPI Cards */}
        <div className="kpi-grid">
          {kpiData.map((kpi, index) => (
            <div key={index} className="kpi-card">
              <div className="kpi-label">{kpi.label}</div>
              <div className="kpi-value">{kpi.value}</div>
              <div className={`kpi-change ${kpi.trend}`}>
                <span className="material-icons">
                  {kpi.trend === "up" ? "trending_up" : "trending_down"}
                </span>
                {kpi.change}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Masonry Layout */}
        <div className="masonry-container">
          {/* Chart Card 1 - Instruments by Status */}
          <div className="chart-card chart-medium">
            <div className="chart-header">
              <h3 className="chart-title">Instruments by Status</h3>
            </div>
            <div className="chart-content">
              <div className="donut-chart">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#50AF78"
                    strokeWidth="40"
                    strokeDasharray="308 440"
                    transform="rotate(-90 100 100)"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#D2785A"
                    strokeWidth="40"
                    strokeDasharray="44 440"
                    strokeDashoffset="-308"
                    transform="rotate(-90 100 100)"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#DBD99A"
                    strokeWidth="40"
                    strokeDasharray="88 440"
                    strokeDashoffset="-352"
                    transform="rotate(-90 100 100)"
                  />
                  <text x="100" y="105" textAnchor="middle" fontSize="32" fontWeight="500" fill="#1A1A1A">
                    356
                  </text>
                  <text x="100" y="125" textAnchor="middle" fontSize="14" fill="rgba(26, 26, 26, 0.65)">
                    Total
                  </text>
                </svg>
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: "#50AF78" }}></div>
                  <span className="legend-label">Active (256)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: "#D2785A" }}></div>
                  <span className="legend-label">Inactive (25)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: "#DBD99A" }}></div>
                  <span className="legend-label">Decommissioned (50)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: "#3E7CA6" }}></div>
                  <span className="legend-label">Other (25)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Card 2 - Recent Activity */}
          <div className="chart-card chart-tall">
            <div className="chart-header">
              <h3 className="chart-title">Recent Activity</h3>
            </div>
            <div className="chart-content">
              <div className="activity-list">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="activity-item">
                    <div className="activity-icon">
                      <span className="material-icons">check_circle</span>
                    </div>
                    <div className="activity-details">
                      <div className="activity-title">Request #{1000 + i} completed</div>
                      <div className="activity-time">{i + 1} hours ago</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Card 3 - Monthly Trends */}
          <div className="chart-card chart-wide">
            <div className="chart-header">
              <h3 className="chart-title">Monthly Trends</h3>
            </div>
            <div className="chart-content">
              <div className="bar-chart">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, index) => (
                  <div key={index} className="bar-group">
                    <div className="bar-container">
                      <div
                        className="bar"
                        style={{
                          height: `${Math.random() * 80 + 20}%`,
                          backgroundColor: "#50AF78",
                        }}
                      ></div>
                    </div>
                    <div className="bar-label">{month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Card 4 - System Performance */}
          <div className="chart-card chart-medium">
            <div className="chart-header">
              <h3 className="chart-title">System Performance</h3>
            </div>
            <div className="chart-content">
              <div className="performance-metrics">
                <div className="performance-item">
                  <div className="performance-label">Uptime</div>
                  <div className="performance-value">99.8%</div>
                  <div className="performance-bar">
                    <div className="performance-fill" style={{ width: "99.8%" }}></div>
                  </div>
                </div>
                <div className="performance-item">
                  <div className="performance-label">Response Time</div>
                  <div className="performance-value">142ms</div>
                  <div className="performance-bar">
                    <div className="performance-fill" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div className="performance-item">
                  <div className="performance-label">Success Rate</div>
                  <div className="performance-value">97.2%</div>
                  <div className="performance-bar">
                    <div className="performance-fill" style={{ width: "97.2%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Card 5 - Upcoming Maintenance */}
          <div className="chart-card chart-small">
            <div className="chart-header">
              <h3 className="chart-title">Upcoming Maintenance</h3>
            </div>
            <div className="chart-content">
              <div className="stat-number">12</div>
              <div className="stat-label">Scheduled this week</div>
            </div>
          </div>

          {/* Chart Card 6 - Priority Requests */}
          <div className="chart-card chart-small">
            <div className="chart-header">
              <h3 className="chart-title">High Priority</h3>
            </div>
            <div className="chart-content">
              <div className="stat-number">5</div>
              <div className="stat-label">Require attention</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
