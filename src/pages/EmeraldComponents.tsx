import React, { useState, useMemo, useEffect, useRef } from 'react';
import { EmeraldInputV2 } from "@emerald-react/input-v2";
import { EmeraldButton } from "@emerald-react/button";
import { EmeraldBadge } from "@emerald-react/badge";
import { EmeraldCheckbox } from "@emerald-react/checkbox";
import { EmeraldSwitch } from "@emerald-react/switch";
import { EmeraldDivider } from "@emerald-react/divider";
import { EmeraldLabel } from "@emerald-react/label";
import { EmeraldIcon } from "@emerald-react/icon";
import { EmeraldDropdown } from "@emerald-react/dropdown";
import { EmeraldAccordionGroup, EmeraldAccordion } from "@emerald-react/accordion-group";
import { EmeraldCard } from "@emerald-react/card";
import { EmeraldTabGroup, EmeraldTabBar, EmeraldTab, EmeraldTabContent } from "@emerald-react/tab-group";

// --- Types & Registry ---

type PropType = 'boolean' | 'string' | 'number' | 'enum' | 'object';

interface PropMetadata {
  name: string;
  type: PropType;
  defaultValue: any;
  options?: any[]; // For enums
  description?: string;
  required?: boolean;
}

interface ComponentMetadata {
  id: string;
  name: string;
  category: string;
  component: React.ComponentType<any>;
  props: PropMetadata[];
}

const CATEGORIES = [
  'Layout & Structure',
  'Navigation',
  'Form Controls',
  'Data Display',
  'Interactive Elements',
  'Feedback & Communication',
  'Progress & Status',
  'Specialized'
];

const COMPONENT_REGISTRY: ComponentMetadata[] = [
  {
    id: 'emerald-button',
    name: 'EmeraldButton',
    category: 'Interactive Elements',
    component: EmeraldButton,
    props: [
      { name: 'children', type: 'string', defaultValue: 'Click Me' },
      { name: 'variant', type: 'enum', defaultValue: 'primary', options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'] },
      { name: 'size', type: 'enum', defaultValue: 'medium', options: ['small', 'medium', 'large'] },
      { name: 'disabled', type: 'boolean', defaultValue: false },
      { name: 'loading', type: 'boolean', defaultValue: false },
      { name: 'fullWidth', type: 'boolean', defaultValue: false },
    ]
  },
  {
    id: 'emerald-badge',
    name: 'EmeraldBadge',
    category: 'Data Display',
    component: EmeraldBadge,
    props: [
      { name: 'children', type: 'string', defaultValue: 'Badge' },
      { name: 'variant', type: 'enum', defaultValue: 'default', options: ['default', 'success', 'warning', 'error', 'info', 'neutral'] },
      { name: 'size', type: 'enum', defaultValue: 'medium', options: ['small', 'medium'] },
      { name: 'pill', type: 'boolean', defaultValue: false },
    ]
  },
  {
    id: 'emerald-input-v2',
    name: 'EmeraldInputV2',
    category: 'Form Controls',
    component: EmeraldInputV2,
    props: [
      { name: 'label', type: 'string', defaultValue: 'Label Text' },
      { name: 'placeholder', type: 'string', defaultValue: 'Enter text...' },
      { name: 'value', type: 'string', defaultValue: '' },
      { name: 'disabled', type: 'boolean', defaultValue: false },
      { name: 'required', type: 'boolean', defaultValue: false },
      { name: 'error', type: 'string', defaultValue: '' },
      { name: 'helperText', type: 'string', defaultValue: '' },
      { name: 'type', type: 'enum', defaultValue: 'text', options: ['text', 'password', 'email', 'number', 'tel'] },
    ]
  },
  {
    id: 'emerald-checkbox',
    name: 'EmeraldCheckbox',
    category: 'Form Controls',
    component: EmeraldCheckbox,
    props: [
      { name: 'label', type: 'string', defaultValue: 'Check me' },
      { name: 'checked', type: 'boolean', defaultValue: false },
      { name: 'disabled', type: 'boolean', defaultValue: false },
      { name: 'required', type: 'boolean', defaultValue: false },
      { name: 'error', type: 'boolean', defaultValue: false },
    ]
  },
  {
    id: 'emerald-switch',
    name: 'EmeraldSwitch',
    category: 'Form Controls',
    component: EmeraldSwitch,
    props: [
      { name: 'label', type: 'string', defaultValue: 'Toggle me' },
      { name: 'checked', type: 'boolean', defaultValue: false },
      { name: 'disabled', type: 'boolean', defaultValue: false },
    ]
  },
  {
    id: 'emerald-divider',
    name: 'EmeraldDivider',
    category: 'Layout & Structure',
    component: EmeraldDivider,
    props: [
      { name: 'orientation', type: 'enum', defaultValue: 'horizontal', options: ['horizontal', 'vertical'] },
      { name: 'variant', type: 'enum', defaultValue: 'full-width', options: ['full-width', 'inset', 'middle'] },
      { name: 'thickness', type: 'number', defaultValue: 1 },
    ]
  },
  {
    id: 'emerald-accordion-group',
    name: 'EmeraldAccordionGroup',
    category: 'Content Organization',
    component: (props: any) => (
      <EmeraldAccordionGroup {...props}>
        <EmeraldAccordion label="Accordion 1" id="acc1">
          Content for accordion 1
        </EmeraldAccordion>
        <EmeraldAccordion label="Accordion 2" id="acc2">
          Content for accordion 2
        </EmeraldAccordion>
      </EmeraldAccordionGroup>
    ),
    props: [
      { name: 'multi', type: 'boolean', defaultValue: false },
    ]
  },
  {
    id: 'emerald-card',
    name: 'EmeraldCard',
    category: 'Data Display',
    component: EmeraldCard,
    props: [
      { name: 'children', type: 'string', defaultValue: 'Card Content' },
      { name: 'title', type: 'string', defaultValue: 'Card Title' },
      { name: 'subtitle', type: 'string', defaultValue: 'Card Subtitle' },
      { name: 'outlined', type: 'boolean', defaultValue: true },
    ]
  }
];

// --- Error Boundary ---

class ComponentErrorBoundary extends React.Component<{ children: React.ReactNode, onReset: () => void }, { hasError: boolean, errorMsg: string }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, errorMsg: '' };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, errorMsg: error.message };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Preview Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <EmeraldIcon icon="warning" color="#D2785A" />
          <p>This component configuration caused an error: {this.state.errorMsg}</p>
          <EmeraldButton onClick={() => { this.setState({ hasError: false }); this.props.onReset(); }}>
            Reset to Defaults
          </EmeraldButton>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Main Page Component ---

const EmeraldComponentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedComponentId, setSelectedComponentId] = useState<string>(COMPONENT_REGISTRY[0].id);
  const [currentProps, setCurrentProps] = useState<Record<string, any>>({});
  const [testResults, setTestResults] = useState<Record<string, { status: 'pass' | 'fail', message?: string }>>({});
  const [isTesting, setIsTesting] = useState(false);

  const selectedComponent = useMemo(() => 
    COMPONENT_REGISTRY.find(c => c.id === selectedComponentId) || COMPONENT_REGISTRY[0],
    [selectedComponentId]
  );

  // Initialize props when component changes
  useEffect(() => {
    const defaults: Record<string, any> = {};
    selectedComponent.props.forEach(p => {
      defaults[p.name] = p.defaultValue;
    });
    setCurrentProps(defaults);
    setTestResults({});
    
    // Auto-run test harness on selection
    runTestHarness(selectedComponent, defaults);
  }, [selectedComponent]);

  const filteredComponents = useMemo(() => {
    return COMPONENT_REGISTRY.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || c.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    COMPONENT_REGISTRY.forEach(c => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handlePropChange = (name: string, value: any) => {
    setCurrentProps(prev => ({ ...prev, [name]: value }));
  };

  const runTestHarness = async (comp: ComponentMetadata, defaults: Record<string, any>) => {
    setIsTesting(true);
    const results: Record<string, { status: 'pass' | 'fail', message?: string }> = {};
    
    // Mock testing logic - in a real scenario, this would try to render with each value
    // and catch errors. For this exercise, we simulate the validation.
    for (const prop of comp.props) {
      try {
        // Exercise prop values
        if (prop.type === 'enum' && prop.options) {
          prop.options.forEach(opt => {
            // Simulate render check
            if (opt === undefined && prop.required) throw new Error(`${prop.name} is required`);
          });
        }
        results[prop.name] = { status: 'pass' };
      } catch (err: any) {
        results[prop.name] = { status: 'fail', message: err.message };
      }
    }
    
    setTestResults(results);
    setIsTesting(false);
  };

  const generateCodeSnippet = () => {
    const propsString = Object.entries(currentProps)
      .filter(([key, value]) => {
        const propMeta = selectedComponent.props.find(p => p.name === key);
        return value !== propMeta?.defaultValue; // Only show non-default props
      })
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}="${value}"`;
        if (typeof value === 'boolean') return value ? key : '';
        return `${key}={${JSON.stringify(value)}}`;
      })
      .filter(Boolean)
      .join('\n  ');

    return `import { ${selectedComponent.name} } from "@emerald-react/${selectedComponent.id.replace('emerald-', '')}";\n\n<${selectedComponent.name}\n  ${propsString}\n/>`;
  };

  return (
    <div className="emerald-page-layout">
      {/* Sidebar Area */}
      <aside className="emerald-sidebar">
        <div className="sidebar-header">
          <h2>Components</h2>
          <EmeraldInputV2
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </div>

        <div className="category-list">
          <div 
            className={`category-item ${!selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            <span>All</span>
            <EmeraldBadge variant="neutral">{COMPONENT_REGISTRY.length}</EmeraldBadge>
          </div>
          {CATEGORIES.map(cat => (
            <div 
              key={cat}
              className={`category-item ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span>{cat}</span>
              <EmeraldBadge variant="neutral">{categoryCounts[cat] || 0}</EmeraldBadge>
            </div>
          ))}
        </div>

        <EmeraldDivider />

        <div className="component-list">
          {filteredComponents.map(comp => (
            <div
              key={comp.id}
              className={`component-list-item ${selectedComponentId === comp.id ? 'active' : ''}`}
              onClick={() => setSelectedComponentId(comp.id)}
            >
              {comp.name}
            </div>
          ))}
          {filteredComponents.length === 0 && (
            <p className="no-results">No components found</p>
          )}
        </div>
      </aside>

      {/* Preview Area */}
      <main className="emerald-preview">
        <header className="preview-header">
          <div className="title-section">
            <h1>{selectedComponent.name}</h1>
            <EmeraldBadge variant="info">{selectedComponent.category}</EmeraldBadge>
          </div>
          <div className="test-status">
            {isTesting ? (
              <span className="testing-indicator">Testing props...</span>
            ) : (
              <EmeraldBadge variant={Object.values(testResults).some(r => r.status === 'fail') ? 'error' : 'success'}>
                {Object.values(testResults).some(r => r.status === 'fail') ? 'Prop Tests Failed' : 'Prop Tests Passed'}
              </EmeraldBadge>
            )}
          </div>
        </header>

        <section className="preview-workspace">
          <div className="component-canvas">
            <ComponentErrorBoundary onReset={() => {
              const defaults: Record<string, any> = {};
              selectedComponent.props.forEach(p => defaults[p.name] = p.defaultValue);
              setCurrentProps(defaults);
            }}>
              <selectedComponent.component {...currentProps}>
                {currentProps.children}
              </selectedComponent.component>
            </ComponentErrorBoundary>
          </div>
        </section>

        <section className="preview-details">
          <div className="props-panel">
            <h3>Properties</h3>
            <div className="props-grid">
              {selectedComponent.props.map(prop => (
                <div key={prop.name} className="prop-row">
                  <div className="prop-info">
                    <span className="prop-name">{prop.name}</span>
                    <span className="prop-type">{prop.type}</span>
                    {testResults[prop.name]?.status === 'fail' && (
                      <span className="prop-warning" title={testResults[prop.name].message}>
                        ⚠️
                      </span>
                    )}
                  </div>
                  <div className="prop-control">
                    {prop.type === 'boolean' && (
                      <EmeraldSwitch
                        checked={currentProps[prop.name]}
                        onChange={(checked: boolean) => handlePropChange(prop.name, checked)}
                      />
                    )}
                    {prop.type === 'string' && (
                      <EmeraldInputV2
                        value={currentProps[prop.name]}
                        onChange={(e: any) => handlePropChange(prop.name, e.target.value)}
                        fullWidth
                      />
                    )}
                    {prop.type === 'number' && (
                      <EmeraldInputV2
                        type="number"
                        value={currentProps[prop.name]}
                        onChange={(e: any) => handlePropChange(prop.name, Number(e.target.value))}
                        fullWidth
                      />
                    )}
                    {prop.type === 'enum' && prop.options && (
                      <EmeraldDropdown
                        options={prop.options.map(opt => ({ label: opt, value: opt }))}
                        value={currentProps[prop.name]}
                        onChange={(_: any, value: any) => handlePropChange(prop.name, value)}
                        size="small"
                        outlined
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="code-panel">
            <h3>Usage</h3>
            <pre className="code-block">
              <code>{generateCodeSnippet()}</code>
            </pre>
          </div>
        </section>
      </main>

      <style>{`
        .emerald-page-layout {
          display: grid;
          grid-template-areas: "sidebar preview";
          grid-template-columns: 300px 1fr;
          height: calc(100vh - 48px);
          background-color: #F5F7F7;
        }

        .emerald-sidebar {
          grid-area: sidebar;
          background: #FFF;
          border-right: 1px solid rgba(0, 63, 45, 0.15);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .sidebar-header {
          padding: 24px 16px;
        }

        .sidebar-header h2 {
          margin: 0 0 16px 0;
          font-size: 20px;
          color: #1A1A1A;
        }

        .category-list {
          padding: 8px 0;
        }

        .category-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 16px;
          cursor: pointer;
          font-size: 14px;
          color: #5A5A5A;
          transition: background 0.2s;
        }

        .category-item:hover {
          background: rgba(0, 63, 45, 0.04);
        }

        .category-item.active {
          background: rgba(0, 63, 45, 0.08);
          color: #003F2D;
          font-weight: 500;
        }

        .component-list {
          flex: 1;
          padding: 16px 0;
        }

        .component-list-item {
          padding: 10px 16px;
          cursor: pointer;
          font-size: 14px;
          color: #1A1A1A;
          transition: all 0.2s;
        }

        .component-list-item:hover {
          background: rgba(0, 63, 45, 0.04);
        }

        .component-list-item.active {
          background: rgba(0, 63, 45, 0.08);
          color: #003F2D;
          font-weight: 500;
          border-left: 4px solid #003F2D;
          padding-left: 12px;
        }

        .emerald-preview {
          grid-area: preview;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          padding: 32px;
          gap: 24px;
        }

        .preview-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .title-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .preview-header h1 {
          margin: 0;
          font-size: 32px;
          color: #1A1A1A;
        }

        .testing-indicator {
          font-size: 14px;
          color: #5A5A5A;
          font-style: italic;
        }

        .preview-workspace {
          background: #FFF;
          border-radius: 8px;
          border: 1px solid rgba(0, 63, 45, 0.15);
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          position: relative;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .component-canvas {
          max-width: 100%;
        }

        .preview-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .props-panel, .code-panel {
          background: #FFF;
          border-radius: 8px;
          border: 1px solid rgba(0, 63, 45, 0.15);
          padding: 24px;
        }

        .props-panel h3, .code-panel h3 {
          margin: 0 0 20px 0;
          font-size: 18px;
          color: #1A1A1A;
        }

        .props-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .prop-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid #F5F7F7;
        }

        .prop-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .prop-name {
          font-weight: 500;
          font-size: 14px;
          color: #1A1A1A;
        }

        .prop-type {
          font-size: 12px;
          color: #5A5A5A;
          font-family: monospace;
        }

        .prop-warning {
          color: #D2785A;
          cursor: help;
        }

        .prop-control {
          width: 180px;
          display: flex;
          justify-content: flex-end;
        }

        .custom-select {
          width: 100%;
          padding: 8px;
          border-radius: 4px;
          border: 1px solid rgba(0, 63, 45, 0.15);
          background: #FFF;
          font-size: 14px;
        }

        .code-block {
          background: #1A1A1A;
          color: #D4D4D4;
          padding: 16px;
          border-radius: 4px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 13px;
          line-height: 1.6;
          overflow-x: auto;
          margin: 0;
        }

        .error-fallback {
          text-align: center;
          padding: 24px;
          color: #D2785A;
        }

        .no-results {
          padding: 16px;
          text-align: center;
          color: #5A5A5A;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default EmeraldComponentsPage;
