const TicketvriModel = require('../Models/ticketvriModel');

module.exports = {
    ticketveri: async (req, res) => {
        try {
            const { pnr } = req.body;
            const ticketveri = new TicketvriModel({ pnr });
            await ticketveri.save();
            res.status(200).json({
                success: true,
                message: "Ticket verified successfully",
                statusCode: 200,
                ticketvri
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
}

