# Ticket Verification System

## Overview
The ticket verification system allows users to verify ticket details by entering a PNR (Passenger Name Record) number. The system checks the PNR against the tickets database in MongoDB and displays ticket details in a popup if found, or shows an "Invalid PNR" message if not found.

## Features

### ✅ Implemented Features
1. **PNR Verification**: Check if PNR exists in the tickets database
2. **Ticket Details Display**: Show complete ticket information in a popup
3. **Public Access**: No authentication required - anyone can access ticket verification
4. **User-Friendly Interface**: Clean, modern UI with proper error handling
5. **Responsive Design**: Works on different screen sizes

### 📋 Ticket Details Displayed
- PNR Number
- Date
- Source
- Destination
- Number of Adults
- Number of Children
- Price

## How to Use

### For Users
1. Navigate to `/tverification` in your browser
2. Enter a PNR number (e.g., PNR1001)
3. Click "Verify PNR"
4. If PNR is found, a popup will show ticket details
5. If PNR is not found, an "Invalid PNR" message will be displayed

### For Testing
Use these sample PNRs for testing:
- PNR1001
- PNR1002
- PNR1003
- PNR1004
- PNR1005

## Technical Implementation

### Backend Changes
- **File**: `backend/Controller/ticketveriController.js`
- **Functionality**: 
  - Checks PNR against tickets database
  - Returns ticket details if found
  - Returns 404 error if not found
  - Saves verification record for audit

### Frontend Changes
- **File**: `src/Components/User/TVerification.js`
- **Functionality**:
  - Modern popup interface for ticket details
  - Proper error handling and user feedback
  - Responsive design with backdrop blur effect

### Database Schema
The system uses the existing `Ticket` model with fields:
- `pnr` (String, required, unique)
- `source` (String, required)
- `destination` (String, required)
- `date` (String)
- `price` (Number, required)
- `adult` (Number, required)
- `child` (Number, required)
- `isDeleted` (Boolean, default: false)
- `isActive` (Boolean, default: true)

## API Endpoints

### POST `/ticketverify`
- **Purpose**: Verify PNR and return ticket details
- **Request Body**: `{ "pnr": "PNR1001" }`
- **Response (Success)**:
  ```json
  {
    "success": true,
    "message": "Ticket verified successfully",
    "statusCode": 200,
    "ticketDetails": {
      "pnr": "PNR1001",
      "date": "2024-01-15",
      "source": "Bangalore",
      "destination": "Mysore",
      "adult": 2,
      "child": 1,
      "price": 450
    }
  }
  ```
- **Response (Error)**:
  ```json
  {
    "success": false,
    "message": "Invalid PNR - Ticket not found",
    "statusCode": 404
  }
  ```

## Setup Instructions

1. **Start MongoDB**: Ensure MongoDB is running on your system
2. **Install Dependencies**: 
   ```bash
   cd ksrtc/backend
   npm install
   ```
3. **Add Sample Data** (optional):
   ```bash
   node testData.js
   ```
4. **Start Backend Server**:
   ```bash
   npm start
   ```
5. **Start Frontend** (in another terminal):
   ```bash
   cd ksrtc
   npm start
   ```
6. **Access Application**: Navigate to `http://localhost:3000/tverification`

## Security Considerations
- No authentication required for ticket verification (as per requirements)
- PNR validation is case-insensitive
- Only active, non-deleted tickets are considered
- Verification attempts are logged for audit purposes

## Future Enhancements
- Add rate limiting to prevent abuse
- Implement PNR format validation
- Add search history for users
- Include ticket status (confirmed, cancelled, etc.)
- Add QR code generation for verified tickets 