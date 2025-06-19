const TicketvriModel = require('../Models/accidentvriModel');

module.exports = {
    addTicketvri: async (req, res) => {
        try {
            const { pnr, busNumber, accidentDate } = req.body;
            const ticketvri = new TicketvriModel({ pnr, busNumber, accidentDate });
            await ticketvri.save();
            res.status(200).json({
                success: true,
                message: "Ticketvri added successfully",
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

