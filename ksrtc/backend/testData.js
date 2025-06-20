const mongoose = require('mongoose');
const TicketModel = require('./Models/ticketModel');
require('dotenv').config();

// Connect to MongoDB using the same connection string as the server
const mongouri = process.env.MONGO_URI || 'mongodb://localhost:27017/ksrtc';

const sampleTickets = [
  {
    pnr: 'PNR1001',
    source: 'Bangalore',
    destination: 'Mysore',
    date: '2024-01-15',
    price: 450,
    adult: 2,
    child: 1
  },
  {
    pnr: 'PNR1002',
    source: 'Chennai',
    destination: 'Coimbatore',
    date: '2024-01-20',
    price: 380,
    adult: 1,
    child: 0
  },
  {
    pnr: 'PNR1003',
    source: 'Hyderabad',
    destination: 'Vijayawada',
    date: '2024-01-25',
    price: 520,
    adult: 3,
    child: 2
  },
  {
    pnr: 'PNR1004',
    source: 'Kerala',
    destination: 'Tamil Nadu',
    date: '2024-01-30',
    price: 600,
    adult: 2,
    child: 0
  },
  {
    pnr: 'PNR1005',
    source: 'Delhi',
    destination: 'Agra',
    date: '2024-02-05',
    price: 750,
    adult: 4,
    child: 1
  }
];

async function addSampleTickets() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongouri);
    console.log('Connected to MongoDB successfully');
    
    // Clear existing tickets
    await TicketModel.deleteMany({});
    console.log('Cleared existing tickets');
    
    // Add sample tickets
    const tickets = await TicketModel.insertMany(sampleTickets);
    console.log('Added sample tickets:', tickets.length);
    
    console.log('Sample tickets added successfully!');
    console.log('You can now test with PNRs: PNR1001, PNR1002, PNR1003, PNR1004, PNR1005');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding sample tickets:', error);
    if (mongoose.connection.readyState === 1) {
      mongoose.connection.close();
    }
  }
}

addSampleTickets(); 