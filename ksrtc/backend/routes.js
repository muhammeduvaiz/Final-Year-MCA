const { addAccidentData, getActivePnrList } = require('./Controller/accidentController');
const { addTicket } = require('./Controller/ticketController');
const upload = require('./Middlewares/multer');


const router = require('express').Router();

router.post('/addTicket',addTicket);

// Accident report routes
router.post('/addAccidentData',upload.single('image'),addAccidentData);
router.get('/getActivePnrList', getActivePnrList);

module.exports = router;