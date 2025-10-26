import Document from "../models/document.js";

export const trackDocController = async (req, res) => {
  try {
    const {
      owner,
      vehicleNumber,
      cfStart,
      cfEnd,
      npStart,
      npEnd,
      authStart,
      authEnd,
    } = req.query;

    const query = {};

    if (owner) query.owner = { $regex: owner, $options: "i" }; // partial match ok
    if (vehicleNumber) query.vehicleNumber = vehicleNumber.trim(); // exact match

    if (cfStart || cfEnd) {
      query.cf = {};
      if (cfStart) query.cf.$gte = new Date(cfStart);
      if (cfEnd) {
        const end = new Date(cfEnd);
        end.setHours(23, 59, 59, 999); // include entire end day
        query.cf.$lte = end;
      }
    }

    if (npStart || npEnd) {
      query.np = {};
      if (npStart) query.np.$gte = new Date(npStart);
      if (npEnd) {
        const end = new Date(npEnd);
        end.setHours(23, 59, 59, 999);
        query.np.$lte = end;
      }
    }

    if (authStart || authEnd) {
      query.auth = {};
      if (authStart) query.auth.$gte = new Date(authStart);
      if (authEnd) {
        const end = new Date(authEnd);
        end.setHours(23, 59, 59, 999);
        query.auth.$lte = end;
      }
    }

    const documents = await Document.find(query).sort({ createdAt: -1 });
    res.status(200).json({ documents });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
