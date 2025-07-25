import { useNavigate } from 'react-router-dom';

const ApplicationCard = ({ application }) => {
  const navigate = useNavigate();
  return (
      <div 
       className="bg-white shadow-md rounded-lg p-4 h-40 hover:bg-blue-50 transition duration-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{application.name}</h3>
          <span
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              application.status === "Approved"
                ? "bg-green-100 text-green-700"
                : application.status === "Rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {application.status}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Aadhar:</strong> {application.aadharNumber}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Income:</strong> ₹{application.income}
        </p>
        {application.status === "Approved" && (
          <p className="text-sm text-gray-700 mt-1">
            <strong>Subsidy:</strong> ₹{application.subsidyAmount} (
            {application.subsidyPercentage}%)
          </p>
        )}
      </div>
  );
};

export default ApplicationCard;
