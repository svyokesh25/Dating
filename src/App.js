import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page1 from './pages/Page1.jsx';
import Page2 from './pages/Page2.jsx';
import Page3 from './pages/Page3.jsx';
import Page4 from './pages/Page4.jsx';
import Page5 from './pages/Page5.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/page4" element={<Page4 />} />
        <Route path="/page5" element={<Page5 />} />
      </Routes>
    </Router>
  );
}

export default App;