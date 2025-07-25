import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [reason, setReason] = useState('');

useEffect(() => {
axios.get(`http://localhost:5000/api/application/${id}`)
    .then((res) => setData(res.data))
    .catch(console.error);
}, [id]);


  const approve = async () => {
    await axios.put(`http://localhost:5000/api/application/${id}/approve`,{
    expectedConnectionDate: data.expectedConnectionDate})
    navigate("/admin");
  };

  const reject = async () => {
    await axios.put(`http://localhost:5000/api/application/${id}/reject`, { reason });
    navigate("/admin");
  };

  if (!data) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
<span
  className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
  onClick={() => navigate("/admin")}
>
  ← Back
</span>
      <h2 className="text-2xl font-semibold mb-4">Application Details</h2>
      <p><strong>Aadhar Number:</strong> {data.aadharNumber}</p>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Income:</strong> ₹{data.income}</p>
      <p><strong>Status:</strong> {data.status}</p>
      
      {data.status === "Approved" && (
  <div className="mt-4">
    <label className="block font-medium mb-1">Expected Connection Date:</label>
    <input
      type="date"
      value={data.expectedConnectionDate ? data.expectedConnectionDate.slice(0, 10) : ""}
      onChange={(e) =>
        setData({ ...data, expectedConnectionDate: e.target.value })
      }
      min={new Date().toISOString().split("T")[0]}
      className="border p-2 rounded"
    />
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded ml-2 mt-2"
      onClick={async () => {
        await axios.put(`http://localhost:5000/api/application/${id}/update-date`, {
          expectedConnectionDate: data.expectedConnectionDate
        });
        alert("Date updated successfully!");
        navigate("/admin");
      }}
    >
      Update Date
    </button>
  </div>
)}

  
  {data.status === "Pending" && (
      <input
        type="date"
        value={data.expectedConnectionDate ? data.expectedConnectionDate.slice(0, 10) : ""}
        onChange={(e) =>
          setData({ ...data, expectedConnectionDate: e.target.value })
        }
        min={new Date().toISOString().split("T")[0]}
      />
      )}

      {data.status === "Pending" && (
        <div className="mt-4 space-x-2">
          <button onClick={approve} className="bg-green-600 text-white px-4 py-2 rounded">
            Approve
          </button>

          <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-200">
  <input
    type="text"
    placeholder="Rejection Reason"
    value={reason}
    onChange={(e) => setReason(e.target.value)}
    className="border border-gray-300 p-2 rounded w-full sm:w-auto flex-1"
  />
  <button
    onClick={reject}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-200"
  >
    Reject
  </button>
</div>

        </div>
      )}
    </div>
  );
};

export default ApplicationDetails;
