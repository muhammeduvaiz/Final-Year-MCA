# KSRTC Database Documentation

## 📊 **Database Overview**

The KSRTC Transportation Management System uses **MongoDB** as its primary database with **Mongoose ODM** for schema management. The database is designed to handle user authentication, ticket management, accident reporting, and rapid response team coordination.

## 🗄️ **Database Collections (Tables)**

### 1. **Users Collection** (`users`)

**Purpose**: Stores user account information for bus conductors and staff members.

| Field Name | Data Type | Required | Unique | Default | Description |
|------------|-----------|----------|--------|---------|-------------|
| `_id` | ObjectId | Yes | Yes | Auto-generated | Primary key |
| `name` | String | Yes | No | - | Full name of the user |
| `username` | String | Yes | Yes | - | Unique username for login |
| `password` | String | Yes | No | - | Hashed password using bcrypt |
| `confirmpassword` | String | Yes | No | - | Password confirmation field |
| `phone` | String | Yes | No | - | Contact phone number |
| `age` | Number | No | No | - | User's age (optional) |
| `gender` | String | No | No | - | Gender (male/female/other) |
| `isActive` | Boolean | No | No | `true` | Account active status |
| `isDeleted` | Boolean | No | No | `false` | Soft delete flag |
| `createdAt` | Date | Yes | No | Auto-generated | Record creation timestamp |
| `updatedAt` | Date | Yes | No | Auto-generated | Record update timestamp |

**Indexes**:
- `username` (Unique)
- `isActive` + `isDeleted` (Compound index for active users)

**Sample Document**:
```json
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "username": "johndoe123",
  "password": "$2b$10$...",
  "confirmpassword": "$2b$10$...",
  "phone": "+91-9876543210",
  "age": 35,
  "gender": "male",
  "isActive": true,
  "isDeleted": false,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

---

### 2. **Tickets Collection** (`tickets`)

**Purpose**: Stores bus ticket information and booking details.

| Field Name | Data Type | Required | Unique | Default | Description |
|------------|-----------|----------|--------|---------|-------------|
| `_id` | ObjectId | Yes | Yes | Auto-generated | Primary key |
| `pnr` | String | Yes | Yes | - | Passenger Name Record (unique identifier) |
| `source` | String | Yes | No | - | Departure city/location |
| `destination` | String | Yes | No | - | Arrival city/location |
| `date` | String | No | No | - | Journey date (DD/MM/YYYY format) |
| `price` | Number | Yes | No | - | Total ticket price in INR |
| `adult` | Number | Yes | No | - | Number of adult passengers |
| `child` | Number | Yes | No | - | Number of child passengers |
| `isDeleted` | Boolean | No | No | `false` | Soft delete flag |
| `isActive` | Boolean | No | No | `true` | Ticket active status |

**Indexes**:
- `pnr` (Unique)
- `isActive` + `isDeleted` (Compound index for active tickets)
- `source` + `destination` (Compound index for route queries)

**Sample Document**:
```json
{
  "_id": ObjectId("..."),
  "pnr": "PNR1001",
  "source": "Trivandrum",
  "destination": "Kochi",
  "date": "15/01/2024",
  "price": 450,
  "adult": 2,
  "child": 1,
  "isDeleted": false,
  "isActive": true
}
```

---

### 3. **Accidents Collection** (`accidents`)

**Purpose**: Stores accident reports with images and passenger information.

| Field Name | Data Type | Required | Unique | Default | Description |
|------------|-----------|----------|--------|---------|-------------|
| `_id` | ObjectId | Yes | Yes | Auto-generated | Primary key |
| `location` | String | Yes | No | - | Accident location |
| `accidentDescription` | String | Yes | No | - | Detailed accident description |
| `accidentDate` | String | No | No | - | Date of accident |
| `accidentTime` | String | Yes | No | - | Time of accident |
| `images` | Array[String] | Yes | No | - | Array of image file paths |
| `casualties` | Number | No | No | - | Number of casualties |
| `passengerTickets` | Array[Object] | Yes | No | - | Array of passenger ticket objects |
| `conductorDetails` | Object | Yes | No | - | Conductor information object |
| `status` | String | No | No | `"pending"` | Status: pending/accepted/rejected |
| `adminResponse` | String | No | No | `""` | Admin's response/notes |
| `isDeleted` | Boolean | No | No | `false` | Soft delete flag |
| `isActive` | Boolean | No | No | `true` | Record active status |
| `createdAt` | Date | Yes | No | Auto-generated | Record creation timestamp |
| `updatedAt` | Date | Yes | No | Auto-generated | Record update timestamp |

**Nested Objects**:

**passengerTickets Array Elements**:
```json
{
  "pnr": "String (required)",
  "source": "String (required)",
  "destination": "String (required)",
  "adult": "Number (required)",
  "child": "Number (required)",
  "price": "Number (required)"
}
```

**conductorDetails Object**:
```json
{
  "name": "String (required)",
  "phone": "String (required)",
  "username": "String (required)"
}
```

**Indexes**:
- `status` (Index for status-based queries)
- `isActive` + `isDeleted` (Compound index for active records)
- `accidentDate` (Index for date-based queries)

**Sample Document**:
```json
{
  "_id": ObjectId("..."),
  "location": "NH47, Near Kollam",
  "accidentDescription": "Bus collided with truck at intersection",
  "accidentDate": "15/01/2024",
  "accidentTime": "14:30",
  "images": ["uploads/accident1.jpg", "uploads/accident2.jpg"],
  "casualties": 3,
  "passengerTickets": [
    {
      "pnr": "PNR1001",
      "source": "Trivandrum",
      "destination": "Kochi",
      "adult": 2,
      "child": 1,
      "price": 450
    }
  ],
  "conductorDetails": {
    "name": "John Doe",
    "phone": "+91-9876543210",
    "username": "johndoe123"
  },
  "status": "pending",
  "adminResponse": "",
  "isDeleted": false,
  "isActive": true,
  "createdAt": "2024-01-15T14:35:00Z",
  "updatedAt": "2024-01-15T14:35:00Z"
}
```

---

### 4. **RRT Collection** (`rrts`)

**Purpose**: Stores Rapid Response Team requests and coordination data.

| Field Name | Data Type | Required | Unique | Default | Description |
|------------|-----------|----------|--------|---------|-------------|
| `_id` | ObjectId | Yes | Yes | Auto-generated | Primary key |
| `location` | String | Yes | No | - | Emergency location |
| `description` | String | Yes | No | - | Emergency description |
| `date` | String | Yes | No | - | Date of emergency |
| `time` | String | Yes | No | - | Time of emergency |
| `passengerTickets` | Array[Object] | Yes | No | - | Array of passenger ticket objects |
| `conductorDetails` | Object | Yes | No | - | Conductor information object |
| `status` | String | No | No | `"pending"` | Status: pending/accepted/rejected |
| `adminResponse` | String | No | No | `""` | Admin's response/notes |
| `isActive` | Boolean | No | No | `true` | Record active status |
| `isDeleted` | Boolean | No | No | `false` | Soft delete flag |
| `createdAt` | Date | Yes | No | Auto-generated | Record creation timestamp |
| `updatedAt` | Date | Yes | No | Auto-generated | Record update timestamp |

**Nested Objects**:

**passengerTickets Array Elements**:
```json
{
  "pnr": "String (required)",
  "source": "String (required)",
  "destination": "String (required)",
  "adult": "Number (required)",
  "child": "Number (required)",
  "price": "Number (required)"
}
```

**conductorDetails Object**:
```json
{
  "name": "String (required)",
  "phone": "String (required)",
  "username": "String (required)"
}
```

**Indexes**:
- `status` (Index for status-based queries)
- `isActive` + `isDeleted` (Compound index for active records)
- `date` (Index for date-based queries)

**Sample Document**:
```json
{
  "_id": ObjectId("..."),
  "location": "Bus Stand, Ernakulam",
  "description": "Medical emergency - passenger requires immediate attention",
  "date": "15/01/2024",
  "time": "16:45",
  "passengerTickets": [
    {
      "pnr": "PNR1002",
      "source": "Kochi",
      "destination": "Trivandrum",
      "adult": 1,
      "child": 0,
      "price": 380
    }
  ],
  "conductorDetails": {
    "name": "Jane Smith",
    "phone": "+91-9876543211",
    "username": "janesmith456"
  },
  "status": "pending",
  "adminResponse": "",
  "isActive": true,
  "isDeleted": false,
  "createdAt": "2024-01-15T16:50:00Z",
  "updatedAt": "2024-01-15T16:50:00Z"
}
```

---

### 5. **Admins Collection** (`admins`)

**Purpose**: Stores administrator account information.

| Field Name | Data Type | Required | Unique | Default | Description |
|------------|-----------|----------|--------|---------|-------------|
| `_id` | ObjectId | Yes | Yes | Auto-generated | Primary key |
| `email` | String | Yes | Yes | - | Admin email address |
| `password` | String | Yes | No | - | Hashed password using bcrypt |
| `createdAt` | Date | Yes | No | Auto-generated | Record creation timestamp |
| `updatedAt` | Date | Yes | No | Auto-generated | Record update timestamp |

**Indexes**:
- `email` (Unique)

**Sample Document**:
```json
{
  "_id": ObjectId("..."),
  "email": "admin@ksrtc.gov.in",
  "password": "$2b$10$...",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

---

### 6. **Ticket Verification Collection** (`accidentvris`)

**Purpose**: Stores ticket verification audit logs.

| Field Name | Data Type | Required | Unique | Default | Description |
|------------|-----------|----------|--------|---------|-------------|
| `_id` | ObjectId | Yes | Yes | Auto-generated | Primary key |
| `pnr` | String | Yes | No | - | PNR number that was verified |

**Indexes**:
- `pnr` (Index for PNR-based queries)

**Sample Document**:
```json
{
  "_id": ObjectId("..."),
  "pnr": "PNR1001"
}
```

---

## 🔗 **Database Relationships**

### **Logical Relationships**

1. **Users ↔ Tickets**
   - **Relationship**: One-to-Many (Conductor can book multiple tickets)
   - **Connection**: Through conductor details in tickets

2. **Users ↔ Accidents**
   - **Relationship**: One-to-Many (Conductor can report multiple accidents)
   - **Connection**: Through `conductorDetails` in accidents collection

3. **Users ↔ RRT Requests**
   - **Relationship**: One-to-Many (Conductor can make multiple RRT requests)
   - **Connection**: Through `conductorDetails` in RRT collection

4. **Tickets ↔ Accidents**
   - **Relationship**: Many-to-Many (Multiple tickets can be involved in an accident)
   - **Connection**: Through `passengerTickets` array in accidents

5. **Tickets ↔ RRT Requests**
   - **Relationship**: Many-to-Many (Multiple tickets can be involved in an RRT request)
   - **Connection**: Through `passengerTickets` array in RRT collection

6. **Tickets ↔ Ticket Verification**
   - **Relationship**: One-to-Many (One ticket can be verified multiple times)
   - **Connection**: Through PNR number

---

## 📈 **Database Performance Optimizations**

### **Indexing Strategy**

1. **Primary Indexes**
   - `_id` (Auto-generated by MongoDB)
   - `username` (Users collection)
   - `pnr` (Tickets collection)
   - `email` (Admins collection)

2. **Compound Indexes**
   - `isActive` + `isDeleted` (Multiple collections)
   - `source` + `destination` (Tickets collection)
   - `status` + `createdAt` (Accidents and RRT collections)

3. **Query Optimization Indexes**
   - `accidentDate` (Accidents collection)
   - `date` (RRT collection)
   - `createdAt` (All collections with timestamps)

### **Data Integrity Constraints**

1. **Unique Constraints**
   - Username (Users collection)
   - PNR (Tickets collection)
   - Email (Admins collection)

2. **Required Fields**
   - All critical business fields marked as required
   - Proper validation at application level

3. **Data Validation**
   - Enum values for status fields
   - Proper data types for all fields
   - Soft delete implementation

---

## 🔧 **Database Operations**

### **Common Queries**

1. **Get Active Users**
   ```javascript
   db.users.find({ isActive: true, isDeleted: false })
   ```

2. **Get Tickets by Route**
   ```javascript
   db.tickets.find({ 
     source: "Trivandrum", 
     destination: "Kochi",
     isActive: true 
   })
   ```

3. **Get Pending Accidents**
   ```javascript
   db.accidents.find({ 
     status: "pending",
     isActive: true 
   })
   ```

4. **Get RRT Requests by Date**
   ```javascript
   db.rrts.find({ 
     date: "15/01/2024",
     isActive: true 
   })
   ```

### **Aggregation Examples**

1. **Ticket Statistics by Route**
   ```javascript
   db.tickets.aggregate([
     { $match: { isActive: true } },
     { $group: { 
       _id: { source: "$source", destination: "$destination" },
       totalTickets: { $sum: 1 },
       totalRevenue: { $sum: "$price" }
     }}
   ])
   ```

2. **Accident Reports by Status**
   ```javascript
   db.accidents.aggregate([
     { $match: { isActive: true } },
     { $group: { 
       _id: "$status",
       count: { $sum: 1 }
     }}
   ])
   ```

---

## 🛡️ **Database Security**

### **Security Measures**

1. **Authentication**
   - JWT-based authentication
   - Password hashing with bcrypt
   - Session management

2. **Data Protection**
   - Input validation and sanitization
   - SQL injection prevention
   - XSS protection

3. **Access Control**
   - Role-based access control
   - Admin-only operations
   - Protected routes

4. **Audit Trail**
   - Timestamps on all records
   - Verification logging
   - Soft delete implementation

---

## 📊 **Database Statistics**

### **Collection Sizes**
- **Users**: ~100-1000 records (depending on staff size)
- **Tickets**: ~10,000-100,000 records (daily bookings)
- **Accidents**: ~10-100 records (monthly reports)
- **RRT Requests**: ~50-500 records (monthly requests)
- **Admins**: ~5-20 records (administrative staff)
- **Ticket Verification**: ~1,000-10,000 records (daily verifications)

### **Storage Requirements**
- **Estimated Size**: 1-10 GB (depending on image storage)
- **Backup Frequency**: Daily automated backups
- **Retention Policy**: 7 years for business records

---

*This documentation provides a comprehensive overview of the KSRTC database structure, relationships, and operations. For specific implementation details, refer to the Mongoose schema files in the backend/Models directory.* 