const rrtModel = require('../Models/rrtModel');
const ticketModel = require('../Models/ticketModel');

// Add RRT request with automatic passenger ticket inclusion
const addRrtRequest = async (req, res) => {
    try {
        const { location, description, date, time } = req.body;
        
        if (!location || !description || !date || !time) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }

        // Get conductor details from user info (assuming it's passed in request)
        const conductorDetails = {
            name: req.body.conductorName || 'Unknown',
            phone: req.body.conductorPhone || 'Unknown',
            username: req.body.conductorUsername || 'Unknown'
        };

        // Get all active tickets from the database
        const activeTickets = await ticketModel.find({ 
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

        // Create new RRT request
        const newRrtRequest = new rrtModel({
            location,
            description,
            date,
            time,
            passengerTickets,
            conductorDetails,
            status: 'pending'
        });

        const savedRequest = await newRrtRequest.save();

        if (savedRequest) {
            res.status(200).json({
                success: true,
                message: `RRT request submitted successfully! ${passengerTickets.length} passenger tickets automatically included.`,
                pnrCount: passengerTickets.length,
                data: savedRequest
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to submit RRT request'
            });
        }

    } catch (error) {
        console.error('Error submitting RRT request:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get all RRT requests (for admin)
const getAllRrtRequests = async (req, res) => {
    try {
        const requests = await rrtModel.find({ 
            isDeleted: false 
        }).sort({ createdAt: -1 }); // Latest first

        res.status(200).json({
            success: true,
            data: requests
        });

    } catch (error) {
        console.error('Error fetching RRT requests:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Update RRT request status (accept/reject)
const updateRrtStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, adminResponse } = req.body;

        if (!status || !['pending', 'accepted', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Valid status is required (pending, accepted, rejected)'
            });
        }

        const updatedRequest = await rrtModel.findByIdAndUpdate(
            id,
            {
                status,
                adminResponse: adminResponse || '',
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({
                success: false,
                message: 'RRT request not found'
            });
        }

        res.status(200).json({
            success: true,
            message: `RRT request ${status} successfully`,
            data: updatedRequest
        });

    } catch (error) {
        console.error('Error updating RRT status:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Delete RRT request (soft delete)
const deleteRrtRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRequest = await rrtModel.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );

        if (!deletedRequest) {
            return res.status(404).json({
                success: false,
                message: 'RRT request not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'RRT request deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting RRT request:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    addRrtRequest,
    getAllRrtRequests,
    updateRrtStatus,
    deleteRrtRequest
};