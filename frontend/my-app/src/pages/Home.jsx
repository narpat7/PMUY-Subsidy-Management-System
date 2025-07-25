import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-400">
      <h1 className="text-4xl font-bold text-white text-center p-6">
        Welcome to PMUY LPG Connection Portal
      </h1>

      <button
        onClick={() => navigate("/apply")}
        className="mt-6 bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-100 transition"
      >
        Apply Now
      </button>
    </section>
  );
};

export default Home;
