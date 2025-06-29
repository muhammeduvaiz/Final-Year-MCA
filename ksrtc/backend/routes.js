const { addAccidentData, checkAccidentPNR, getAllAccidentReports, updateAccidentStatus, deleteAccidentReport } = require('./Controller/accidentController');
const { addTicket} = require('./Controller/ticketController');
const { ticketveri } = require('./Controller/ticketveriController');
const { addRrtRequest, getAllRrtRequests, updateRrtStatus, deleteRrtRequest } = require('./Controller/rrtController');
const upload = require('./Middlewares/multer');
const userRouter = require('./userRoutes');
const adminRouter = require('./adminRoutes'); 
const rrtRouter = require('./rrtRoutes');

const router = require('express').Router();

// User routes
router.use('/user', userRouter);
//admin routes
router.use('/admin', adminRouter);
// RRT routes
router.use('/rrt', rrtRouter);
// Ticket routes
router.post('/addTicket', addTicket);

// Accident report routes - handle multiple images
router.post('/addAccidentData', upload.array('images', 2), addAccidentData);

router.post('/ticketverify',ticketveri)

// PNR comparison route
router.get('/checkAccidentPNR/:pnr', checkAccidentPNR)

// RRT routes
router.post('/addRrtRequest', addRrtRequest);
router.get('/getAllRrtRequests', getAllRrtRequests);
router.put('/updateRrtStatus/:id', updateRrtStatus);
router.delete('/deleteRrtRequest/:id', deleteRrtRequest);

// Accident admin routes
router.get('/getAllAccidentReports', getAllAccidentReports);
router.put('/updateAccidentStatus/:id', updateAccidentStatus);
router.delete('/deleteAccidentReport/:id', deleteAccidentReport);

module.exports = router;