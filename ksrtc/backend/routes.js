const { addAccidentData, checkAccidentPNR } = require('./Controller/accidentController');
const { addTicket} = require('./Controller/ticketController');
const { ticketveri } = require('./Controller/ticketveriController');
const upload = require('./Middlewares/multer');
const userRouter = require('./userRoutes');
const adminRouter = require('./adminRoutes'); 


const router = require('express').Router();

// User routes
router.use('/user', userRouter);
//admin routes
router.use('/admin', adminRouter);
// Ticket routes
router.post('/addTicket', addTicket);


// Accident report routes
router.post('/addAccidentData', upload.single('image'), addAccidentData);

router.post('/ticketverify',ticketveri)

// PNR comparison route
router.get('/checkAccidentPNR/:pnr', checkAccidentPNR)


module.exports = router;