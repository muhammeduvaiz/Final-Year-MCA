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

   // Get all active PNRs from ticket database
   getActivePnrList: async (req, res) => {
       try {
           const tickets = await TicketModel.find({ 
               isActive: true, 
               isDeleted: false 
           }).select('pnr source destination date');
           
           res.status(200).json({
               success: true,
               message: "PNR list fetched successfully",
               statusCode: 200,
               data: tickets
           });
       } catch (error) {
           res.status(500).json({
               success: false,
               message: "Internal Server Error",
               statusCode: 500,
               error: error.message
           });
       }
   }
   
};

