import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Apply = () => {
  const [aadharNumber, setAadharNumber] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/apply", { aadharNumber });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message || "Error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form onSubmit={handleApply} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold text-center">Apply for Connection</h2>
        <input
          required
          type="text"
          placeholder="Enter Aadhar Number"
          className="w-full border border-gray-300 rounded p-2"
          value={aadharNumber}
          onChange={(e) => setAadharNumber(e.target.value)}
        />
        <button
            type="submit"
            disabled={!/^\d{12}$/.test(aadharNumber)}
            className={`py-2 px-4 rounded w-full text-white transition 
              ${!/^\d{12}$/.test(aadharNumber) ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            Submit
        </button>

        {message && <p className="text-center text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default Apply;
