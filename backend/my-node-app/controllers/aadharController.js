import Application from '../models/Application.js';
import aadharDB from"../data/aadharDB.js";

const getSubsidy = (income) => {
  if (income === 0) return 50;
  if (income <= 25000) return 40;
  if (income <= 50000) return 30;
  if (income <= 75000) return 20;   
  if (income <= 100000) return 10;
  return 0;
};

export const applyConnection = async (req, res) => {
  const { aadharNumber } = req.body;
  const user = aadharDB.find((u) => u.aadharNumber === aadharNumber);

  if (!user) return res.status(404).json({ message: "Aadhar not found" });

   if (user.income > 100000) {
    return res.status(403).json({ message: "Income must be below ₹100000 to apply" });
  }

  const exists = await Application.findOne({ aadharNumber });
  if (exists) return res.status(400).json({ message: "Already applied" });

  const subsidy = getSubsidy(user.income);
  const subsidyAmount = subsidy * 10;

  const newApp = new Application({
    name: user.name,
    aadharNumber,
    income: user.income,
    subsidyPercentage: subsidy,
    subsidyAmount
  });

  await newApp.save();
  res.json({ message: "Application submitted", appId: newApp._id });
};

export const checkStatus = async (req, res) => {
  const { aadhar } = req.params;
  console.log("Checking status for Aadhar:", aadhar);
  const appData = await Application.findOne({ aadharNumber: aadhar });
  if (!appData) {
    console.log("Not found for Aadhar:", aadhar);
    return res.status(404).json({ message: "Not found" });
  }
  res.json(appData);
};

export const getApplicationById = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: "Application not found" });
    res.json(app);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAllApplications = async (req, res) => {
  const allApps = await Application.find();
  res.json(allApps);
};

export const approveApplication = async (req, res) => {
  const { id } = req.params;
  const { expectedConnectionDate } = req.body;
  const updated = await Application.findByIdAndUpdate(
    id,
    {
      status: "Approved",
      expectedConnectionDate,
      officer: {
        name: "Officer Raj",
        contact: "📞:- 9876543210"
      }
    },
    { new: true }
  );
  res.json(updated);
};

export const rejectApplication = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  const updated = await Application.findByIdAndUpdate(
    id,
    { status: "Rejected", reason },
    { new: true }
  );
  res.json(updated);
};

export const updateDate = async (req, res) => {
  const { id } = req.params;
  const { expectedConnectionDate } = req.body;

  const updated = await Application.findByIdAndUpdate(
    id,
    { expectedConnectionDate },
    { new: true }
  );

  res.json(updated);
}