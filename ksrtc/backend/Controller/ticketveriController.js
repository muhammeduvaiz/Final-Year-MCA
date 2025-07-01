const TicketvriModel = require('../Models/ticketvriModel');
const TicketModel = require('../Models/ticketModel');

module.exports = {
    ticketveri: async (req, res) => {
        try {
            const { pnr } = req.body;
            
            if (!pnr) {
                return res.status(400).json({
                    success: false,
                    message: "PNR is required",
                    statusCode: 400
                });
            }

            // Check if PNR exists in tickets database
            const ticket = await TicketModel.findOne({ pnr: pnr.toUpperCase(), isDeleted: false, isActive: true });
            
            if (!ticket) {
                return res.status(404).json({
                    success: false,
                    message: "Invalid PNR - Ticket not found",
                    statusCode: 404
                });
            }

            // Save verification record
            const ticketveri = new TicketvriModel({ pnr });
            await ticketveri.save();

            // Return ticket details
            res.status(200).json({
                success: true,
                message: "Ticket verified successfully",
                statusCode: 200,
                ticketDetails: {
                    pnr: ticket.pnr,
                    date: ticket.date,
                    source: ticket.source,
                    destination: ticket.destination,
                    adult: ticket.adult,
                    child: ticket.child,
                    price: ticket.price
                }
            });
        } catch (error) {
            console.error('Ticket verification error:', error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                statusCode: 500,
                error: error.message
            });
        }
    }
}

