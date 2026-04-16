import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import Dashboard from './pages/Dashboard';
import EMICalculator from './pages/EMICalculator';
import FinancialTools from './pages/FinancialTools';
import About from './pages/About';
import CalculatorSuite from './pages/CalculatorSuite';

function AppContent() {
  const location = useLocation();
  
  const getTitle = () => {
    switch (location.pathname) {
      case '/standard.html': return 'Financial / EMI Calculator';
      case '/financial.html': return 'Financial Calculators';
      case '/suite.html': return 'Calculator Suite';
      case '/support.html': return 'About & Disclaimer';
      default: return undefined;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-surface text-on-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 relative overflow-y-auto">
        <TopBar title={getTitle()} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/index.html" element={<Dashboard />} />
            <Route path="/suite.html" element={<CalculatorSuite />} />
            <Route path="/standard.html" element={<EMICalculator />} />
            <Route path="/financial.html" element={<FinancialTools />} />
            <Route path="/support.html" element={<About />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
