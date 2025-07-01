# KSRTC Database Tables Documentation

## Overview

The KSRTC Transportation Management System uses MongoDB with six main collections to manage user authentication, ticket booking, accident reporting, rapid response team coordination, and administrative functions. Each collection is designed with proper data types, constraints, and relationships to ensure data integrity and system performance.

## Database Collections

### 1. Users Collection

The Users collection stores account information for bus conductors and staff members. It includes personal details, authentication credentials, and account status information.

| Attribute | Data Type | Constraints | Description |
|-----------|-----------|-------------|-------------|
| _id | ObjectId | Primary Key, Auto-generated | Unique identifier for each user |
| name | String | Required | Full name of the user |
| username | String | Required, Unique | Login username for authentication |
| password | String | Required | Hashed password using bcrypt |
| confirmpassword | String | Required | Password confirmation field |
| phone | String | Required | Contact phone number |
| age | Number | Optional | User's age |
| gender | String | Optional | Gender (male/female/other) |
| isActive | Boolean | Default: true | Account active status flag |
| isDeleted | Boolean | Default: false | Soft delete flag |
| createdAt | Date | Auto-generated | Record creation timestamp |
| updatedAt | Date | Auto-generated | Record update timestamp |

### 2. Tickets Collection

The Tickets collection manages bus ticket information including booking details, pricing, passenger counts, and route information. Each ticket has a unique PNR for identification.

| Attribute | Data Type | Constraints | Description |
|-----------|-----------|-------------|-------------|
| _id | ObjectId | Primary Key, Auto-generated | Unique identifier for each ticket |
| pnr | String | Required, Unique | Passenger Name Record identifier |
| source | String | Required | Departure city/location |
| destination | String | Required | Arrival city/location |
| date | String | Optional | Journey date (DD/MM/YYYY format) |
| price | Number | Required | Total ticket price in INR |
| adult | Number | Required | Number of adult passengers |
| child | Number | Required | Number of child passengers |
| isDeleted | Boolean | Default: false | Soft delete flag |
| isActive | Boolean | Default: true | Ticket active status |

### 3. Accidents Collection

The Accidents collection stores comprehensive accident reports including location details, descriptions, images, casualty information, and automatically integrated passenger ticket data.

| Attribute | Data Type | Constraints | Description |
|-----------|-----------|-------------|-------------|
| _id | ObjectId | Primary Key, Auto-generated | Unique identifier for each accident |
| location | String | Required | Accident location details |
| accidentDescription | String | Required | Detailed accident description |
| accidentDate | String | Optional | Date of accident occurrence |
| accidentTime | String | Required | Time of accident occurrence |
| images | Array[String] | Required | Array of image file paths |
| casualties | Number | Optional | Number of casualties involved |
| passengerTickets | Array[Object] | Required | Array of passenger ticket objects |
| conductorDetails | Object | Required | Conductor information object |
| status | String | Default: "pending" | Status: pending/accepted/rejected |
| adminResponse | String | Default: "" | Admin's response or notes |
| isDeleted | Boolean | Default: false | Soft delete flag |
| isActive | Boolean | Default: true | Record active status |
| createdAt | Date | Auto-generated | Record creation timestamp |
| updatedAt | Date | Auto-generated | Record update timestamp |

**Nested Objects in Accidents Collection:**

**passengerTickets Array Elements:**
| Attribute | Data Type | Constraints | Description |
|-----------|-----------|-------------|-------------|
| pnr | String | Required | Passenger Name Record |
| source | String | Required | Departure location |
| destination | String | Required | Arrival location |
| adult | Number | Required | Number of adults |
| child | Number | Required | Number of children |
| price | Number | Required | Ticket price |

**conductorDetails Object:**
| Attribute | Data Type | Constraints | Description |
|-----------|-----------|-------------|-------------|
| name | String | Required | Conductor's full name |
| phone | String | Required | Conductor's phone number |
| username | String | Required | Conductor's username |

### 4. RRT Collection

The RRT (Rapid Response Team) collection manages emergency response requests including location details, emergency descriptions, and automatically integrated passenger information for quick response coordination.

| Attribute | Data Type | Constraints | Description |
|-----------|-----------|-------------|-------------|
| _id | ObjectId | Primary Key, Auto-generated | Unique identifier for each RRT request |
| location | String | Required | Emergency location details |
| description | String | Required | Emergency description |
| date | String | Required | Date of emergency |
| time | String | Required | Time of emergency |
| passengerTickets | Array[Object] | Required | Array of passenger ticket objects |
| conductorDetails | Object | Required | Conductor information object |
| status | String | Default: "pending" | Status: pending/accepted/rejected |
| adminResponse | String | Default: "" | Admin's response or notes |
| isActive | Boolean | Default: true | Record active status |
| isDeleted | Boolean | Default: false | Soft delete flag |
| createdAt | Date | Auto-generated | Record creation timestamp |
| updatedAt | Date | Auto-generated | Record update timestamp |

**Nested Objects in RRT Collection:**

**passengerTickets Array Elements:**
| Attribute | Data Type | Constraints | Description |
|-----------|-----------|-------------|-------------|
| pnr | String | Required | Passenger Name Record |
| source | String | Required | Departure location |
| destination | String | Required | Arrival location |
| adult | Number | Required | Number of adults |
| child | Number | Required | Number of children |
| price | Number | Required | Ticket price |

**conductorDetails Object:**
| Attribute | Data Type | Constraints | Description |
|-----------|-----------|-------------|-------------|
| name | String | Required | Conductor's full name |
| phone | String | Required | Conductor's phone number |
| username | String | Required | Conductor's username |

### 5. Admins Collection

The Admins collection stores administrator account information for system management and administrative access control.

| Attribute | Data Type | Constraints | Description |
|-----------|-----------|-------------|-------------|
| _id | ObjectId | Primary Key, Auto-generated | Unique identifier for each admin |
| email | String | Required, Unique | Admin email address |
| password | String | Required | Hashed password using bcrypt |
| createdAt | Date | Auto-generated | Record creation timestamp |
| updatedAt | Date | Auto-generated | Record update timestamp |

### 6. Ticket Verification Collection

The Ticket Verification collection maintains an audit trail of all ticket verification attempts for security and monitoring purposes.

| Attribute | Data Type | Constraints | Description |
|-----------|-----------|-------------|-------------|
| _id | ObjectId | Primary Key, Auto-generated | Unique identifier for each verification |
| pnr | String | Required | PNR number that was verified |

## Key Database Features

### Data Integrity
- **Primary Keys**: All collections use MongoDB's auto-generated ObjectId as primary keys
- **Unique Constraints**: Username, PNR, and email fields are unique across their respective collections
- **Required Fields**: Critical business fields are marked as required to prevent data inconsistencies
- **Soft Delete**: All major collections implement soft delete using isDeleted and isActive flags

### Relationships
- **Users to Tickets**: One-to-many relationship through conductor details
- **Users to Accidents**: One-to-many relationship through conductor details
- **Users to RRT**: One-to-many relationship through conductor details
- **Tickets to Accidents**: Many-to-many relationship through passengerTickets arrays
- **Tickets to RRT**: Many-to-many relationship through passengerTickets arrays

### Performance Optimizations
- **Indexing**: Unique indexes on username, PNR, and email fields
- **Compound Indexes**: Combined indexes on isActive + isDeleted for efficient filtering
- **Query Optimization**: Route-based indexes on source + destination for ticket queries

### Security Measures
- **Password Hashing**: All passwords are hashed using bcrypt for security
- **JWT Authentication**: Token-based authentication for secure access
- **Input Validation**: Server-side validation for all user inputs
- **Audit Trail**: Comprehensive logging of ticket verifications and system activities

This database design ensures efficient data management, maintains data integrity, and provides the foundation for a robust transportation management system that can handle the daily operations of a state-run bus transportation corporation. 