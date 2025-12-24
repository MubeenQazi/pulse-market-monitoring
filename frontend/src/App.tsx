import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@components/layout/Layout';
import Dashboard from '@pages/Dashboard';
import Assets from '@pages/Assets';
import News from '@pages/News';
import Alerts from '@pages/Alerts';
import Portfolio from '@pages/Portfolio';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/news" element={<News />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
