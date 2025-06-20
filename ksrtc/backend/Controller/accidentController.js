const AccidentModel = require('../Models/accidentModel');
const TicketModel = require('../Models/ticketModel');

module.exports = { 
    addAccidentData: async (req, res) => {
       try{
        const {location, accidentDescription, accidentDate, accidentTime, casualties} = req.body;
        
        // Handle multiple images
        const images = req.files ? req.files.map(file => file.path) : [];
        
        if (images.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one image is required"
            });
        }
        
        // Get conductor details from user info (assuming it's passed in request)
        const conductorDetails = {
            name: req.body.conductorName || 'Unknown',
            phone: req.body.conductorPhone || 'Unknown',
            username: req.body.conductorUsername || 'Unknown'
        };
        
        // Automatically fetch all active tickets from ticket database
        const activeTickets = await TicketModel.find({ 
            isActive: true, 
            isDeleted: false 
        });

        // Transform tickets to passenger information format
        const passengerTickets = activeTickets.map(ticket => ({
            pnr: ticket.pnr,
            source: ticket.source,
            destination: ticket.destination,
            adult: ticket.adult,
            child: ticket.child,
            price: ticket.price
        }));

        const accidentData = new AccidentModel({
            location, 
            accidentDescription, 
            accidentDate, 
            accidentTime, 
            casualties, 
            images,
            passengerTickets,
            conductorDetails,
            status: 'pending'
        });
        
        await accidentData.save();
        
        res.status(200).json({
            success: true,
            message: "Accident report added successfully",
            statusCode: 200,
            images: images,
            pnrCount: passengerTickets.length,
            passengerTickets: passengerTickets
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
      const accident = await AccidentModel.findOne({ 
        'passengerTickets.pnr': pnr,
        isActive: true,
        isDeleted: false
      });

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

      // Check if the PNR exists in any accident record's passenger tickets
      const accident = await AccidentModel.findOne({ 
        'passengerTickets.pnr': pnr,
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
  },

  // Get all accident reports (for admin)
  getAllAccidentReports: async (req, res) => {
    try {
      const reports = await AccidentModel.find({ 
        isDeleted: false 
      }).sort({ createdAt: -1 }); // Latest first

      res.status(200).json({
        success: true,
        data: reports
      });

    } catch (error) {
      console.error('Error fetching accident reports:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Update accident report status (accept/reject)
  updateAccidentStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, adminResponse } = req.body;

      if (!status || !['pending', 'accepted', 'rejected'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Valid status is required (pending, accepted, rejected)'
        });
      }

      const updatedReport = await AccidentModel.findByIdAndUpdate(
        id,
        {
          status,
          adminResponse: adminResponse || '',
          updatedAt: new Date()
        },
        { new: true }
      );

      if (!updatedReport) {
        return res.status(404).json({
          success: false,
          message: 'Accident report not found'
        });
      }

      res.status(200).json({
        success: true,
        message: `Accident report ${status} successfully`,
        data: updatedReport
      });

    } catch (error) {
      console.error('Error updating accident status:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Delete accident report (soft delete)
  deleteAccidentReport: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedReport = await AccidentModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );

      if (!deletedReport) {
        return res.status(404).json({
          success: false,
          message: 'Accident report not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Accident report deleted successfully'
      });

    } catch (error) {
      console.error('Error deleting accident report:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
   
   
};

