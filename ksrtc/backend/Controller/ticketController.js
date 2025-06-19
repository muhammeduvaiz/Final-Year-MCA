const TicketModel = require('../Models/ticketModel');

module.exports = {
   addTicket: async (req, res) => {
       try{
        const { pnr, source, destination, date, price, adult, child } = req.body;
        const ticket = new TicketModel({ pnr, source, destination, date, price, adult, child });
        await ticket.save();
        res.status(200).json({ message: "Ticket added successfully", ticket });
       }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            statusCode: 500,
            error: error.message
        });
       }
   }
}
