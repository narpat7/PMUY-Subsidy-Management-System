import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ApplicationCard from '../components/ApplicationCard'; // reusable card

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/applications");
        setApplications(res.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">All Applications</h2>

      {loading ? (
        <div className="text-center mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading applications...</p>
        </div>
      ) : applications.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">No applications found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <div
              key={app._id}
              onClick={() => navigate(`/admin/application/${app._id}`)}
              className="cursor-pointer"
            >
              <ApplicationCard application={app} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
