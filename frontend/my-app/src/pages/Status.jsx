import { useState } from 'react';
import axios from 'axios';

const Status = () => {
  const [aadhar, setAadhar] = useState('');
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');

  const checkStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/status/${aadhar}`);
      setData(res.data);
      setMessage('');
    } catch (err) {
      setMessage('Not found');
      setData(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold text-center">Check Application Status</h2>
        <input
          required
          type="text"
          placeholder="Enter Aadhar Number"
          className="w-full border border-gray-300 rounded p-2"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
        />
        <button
          onClick={checkStatus}
          // className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
          disabled={!/^\d{12}$/.test(aadhar)}
  className={`py-2 px-4 rounded w-full text-white transition 
    ${!/^\d{12}$/.test(aadhar) ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          Check
        </button>

        {message && <p className="text-center text-red-500">{message}</p>}
        {data && (
          <div className="mt-4 text-sm">
            <p><strong>Status:</strong> {data.status}</p>
            {data.status === 'Rejected' && <p><strong>Reason:</strong> {data.reason}</p>}
            {data.status === 'Approved' && (
              <>
                <p>
                 <p> <strong>Name:</strong> {data.name}</p>
                <strong>Expected Connection Date:</strong>{" "}
                {new Date(data.expectedConnectionDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric"
                })}
              </p>

                <p><strong>Officer:</strong> {data.officer.name} ({data.officer.contact})</p>
                <p><strong>Subsidy:</strong> ₹{data.subsidyAmount} ({data.subsidyPercentage}%)</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;
