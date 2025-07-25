import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Apply from './pages/Apply';
import Status from './pages/Status';
import AdminDashboard from './pages/AdminDashboard';
import ApplicationDetails from './pages/ApplicationDetails';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/status" element={<Status />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/application/:id" element={<ApplicationDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
