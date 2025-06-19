const AccidentModel = require('../Models/accidentModel');
const TicketModel = require('../Models/ticketModel');

module.exports = { 
    addAccidentData: async (req, res) => {
       try{
        const {location, accidentDescription, accidentDate, accidentTime, casualties} = req.body;
        const image = req.file.path;
        
        // Automatically fetch all active PNRs from ticket database
        const activeTickets = await TicketModel.find({ 
            isActive: true, 
            isDeleted: false 
        }).select('pnr');
        
        const allPnrList = activeTickets.map(ticket => ticket.pnr);

        const accidentData = new AccidentModel({
            location, 
            accidentDescription, 
            accidentDate, 
            accidentTime, 
            casualties, 
            image,
            pnr: allPnrList // Store all active PNRs automatically
        });
        
        await accidentData.save();
        console.log(req.file);
        res.status(200).json({
            success: true,
            message: "Accident report added successfully",
            statusCode: 200,
            image: req.file.path,
            pnrCount: allPnrList.length,
            pnrList: allPnrList
        });
       }catch(error){
           res.status(500).json({
               success: false,
               message: "Internal Server Error",
               statusCode: 500,
               error: error.message,
               
           });
           console.log(error)
       }
   },
 comparePNR: async (req, res) => {
    try {
      const { pnr } = req.body; // Get PNR from request body

      if (!pnr) {
        return res.status(400).json({
          success: false,
          message: 'PNR is required in the request body.'
        });
      }

      // Check if the PNR exists in the accident database
      const accident = await AccidentModel.findOne({ pnr: pnr });

      if (accident) {
        return res.status(200).json({
          success: true,
          match: true,
          message: 'PNR found in accident database.'
        });
      } else {
        return res.status(200).json({
          success: true,
          match: false,
          message: 'PNR not found in accident database.'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message
      });
    }
  },
  checkAccidentPNR: async (req, res) => {
    try {
      const { pnr } = req.params; // Get PNR from URL parameters

      if (!pnr) {
        return res.status(400).json({
          success: false,
          message: 'PNR is required in the URL parameters.'
        });
      }

      // Check if the PNR exists in any accident record's PNR array
      const accident = await AccidentModel.findOne({ 
        pnr: { $in: [pnr] },
        isActive: true,
        isDeleted: false
      });

      if (accident) {
        return res.status(200).json({
          success: true,
          exists: true,
          message: 'PNR found in accident database.',
          accidentId: accident._id,
          location: accident.location,
          accidentDate: accident.accidentDate
        });
      } else {
        return res.status(200).json({
          success: true,
          exists: false,
          message: 'PNR not found in accident database.'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message
      });
    }
  }
   
   
};

