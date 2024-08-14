// // seed.js
// const mongoose = require('mongoose');
// const fs = require('fs');
// const path = require('path');

// // Import Mongoose models
// const Division = require('../models/division');
// const District = require('../models/district');
// const Upazila = require('../models/upazila');
// const Union = require('../models/union');

// // MongoDB connection string
// const mongoURI = 'mongodb://localhost:27017/bangla-geo-api';

// // Connect to MongoDB
// mongoose.connect(mongoURI);

// // Handle connection events
// mongoose.connection.on('connected', () => {
//   console.log('MongoDB connected');
//   seedData();
// });

// mongoose.connection.on('error', (err) => {
//   console.error(`MongoDB connection error: ${err}`);
// });

// // Function to seed data
// const seedData = async () => {
//   try {

//     const divisionsPath = path.join(__dirname, '../json-2/divisions.json');
//     const districtsPath = path.join(__dirname, '../json-2/districts.json');
//     const upazilasPath = path.join(__dirname, '../json-2/upazilas-update.json');
//     const unionsPath = path.join(__dirname, '../json-2/unions-update.json');

//     // Read and parse JSON files
//     const divisions = JSON.parse(fs.readFileSync(divisionsPath, 'utf-8'));
//     const districts = JSON.parse(fs.readFileSync(districtsPath, 'utf-8'));
//     const upazilas = JSON.parse(fs.readFileSync(upazilasPath, 'utf-8'));
//     const unions = JSON.parse(fs.readFileSync(unionsPath, 'utf-8'));

//     // Validate JSON data
//     if (!Array.isArray(divisions.data)) {
//       throw new Error('Invalid data format for divisions');
//     }
//     if (!Array.isArray(districts.data)) {
//       throw new Error('Invalid data format for districts');
//     }
//     if (!Array.isArray(upazilas.data)) {
//       throw new Error('Invalid data format for upazilas');
//     }
//     if (!Array.isArray(unions.data)) {
//       throw new Error('Invalid data format for unions');
//     }

//     // Clear existing data
//     await Division.deleteMany();
//     await District.deleteMany();
//     await Upazila.deleteMany();
//     await Union.deleteMany();

//     // Insert new data
//     const insertedDivisions = await Division.insertMany(divisions.data);
//     console.log('Divisions seeded');

//     // Check and transform district data
//     const districtPromises = districts.data.map(async (district) => {
//       const division = insertedDivisions.find(div => div.id === district.division_id); // Adjust if necessary
//       if (division) {
//         return { ...district, division: division._id };
//       }
//     }).filter(d => d !== undefined); // Filter out undefined entries
//     const districtsWithDivisions = await Promise.all(districtPromises);
//     console.log('Inserting Districts:', districtsWithDivisions);
//     const insertedDistricts = await District.insertMany(districtsWithDivisions);
//     console.log('Districts seeded');

//     // Check and transform upazila data
//     const upazilaPromises = upazilas.data.map(async (upazila) => {
//       const district = insertedDistricts.find(d => d.id === upazila.district_id); // Adjust if necessary
//       if (district) {
//         return { ...upazila, district: district._id };
//       }
//     }).filter(u => u !== undefined); // Filter out undefined entries
//     const upazilasWithDistricts = await Promise.all(upazilaPromises);
//     console.log('Inserting Upazilas:', upazilasWithDistricts);
//     const insertedUpazilas = await Upazila.insertMany(upazilasWithDistricts);
//     console.log('Upazilas seeded');

//     // Check and transform union data
//     const unionPromises = unions.data.map(async (union) => {
//       const upazila = insertedUpazilas.find(up => up.id === union.upazila_id); // Adjust if necessary
//       if (upazila) {
//         return { ...union, upazila: upazila._id };
//       }
//     }).filter(u => u !== undefined); // Filter out undefined entries
//     const unionsWithUpazilas = await Promise.all(unionPromises);
//     console.log('Inserting Unions:', unionsWithUpazilas);
//     await Union.insertMany(unionsWithUpazilas);
//     console.log('Unions seeded');

//     // Close the connection
//     mongoose.connection.close();
//   } catch (error) {
//     console.error('Error seeding data:', error);
//     mongoose.connection.close();
//   }
// };





const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Import Mongoose models
const Division = require('../models/division');
const District = require('../models/district');
const Upazila = require('../models/upazila');
const Union = require('../models/union');

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/bangla-geo-api';

// Connect to MongoDB
mongoose.connect(mongoURI);

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
  seedData();
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Function to seed data
const seedData = async () => {
  try {

    const divisionsPath = path.join(__dirname, '../json-2/divisions.json');
    const districtsPath = path.join(__dirname, '../json-2/districts.json');
    const upazilasPath = path.join(__dirname, '../json-2/upazilas-update.json');
    const unionsPath = path.join(__dirname, '../json-2/unions-update.json');

    // // Update the paths to your JSON files
    // const divisionsPath = path.join(__dirname, '../json-2/divisions.json');
    // const districtsPath = path.join(__dirname, '../json-2/districts.json');
    // const upazilasPath = path.join(__dirname, '../json-2/upazilas.json');
    // const unionsPath = path.join(__dirname, '../json-2/unions.json');

    // Read and parse JSON files
    const divisions = JSON.parse(fs.readFileSync(divisionsPath, 'utf-8')).data;
    const districts = JSON.parse(fs.readFileSync(districtsPath, 'utf-8')).data;
    const upazilas = JSON.parse(fs.readFileSync(upazilasPath, 'utf-8')).data;
    const unions = JSON.parse(fs.readFileSync(unionsPath, 'utf-8')).data;

    // Log JSON data for debugging
    console.log('Divisions data:', divisions);
    console.log('Districts data:', districts);
    console.log('Upazilas data:', upazilas);
    console.log('Unions data:', unions);

    // Validate JSON data
    if (!Array.isArray(divisions) || !Array.isArray(districts) || !Array.isArray(upazilas) || !Array.isArray(unions)) {
      throw new Error('Invalid data format');
    }

    // Clear existing data
    await Division.deleteMany();
    await District.deleteMany();
    await Upazila.deleteMany();
    await Union.deleteMany();

    // Insert divisions and log insertion
    const insertedDivisions = await Division.insertMany(divisions);
    console.log('Divisions seeded');

    // Process and insert districts
    const districtsWithDivisions = districts.map(district => {
      const division = insertedDivisions.find(div => div.id === district.division_id);
      if (division) {
        return { ...district, division: division._id };
      }
      return null;
    }).filter(d => d !== null);
    
    console.log('Inserting Districts:', districtsWithDivisions);
    const insertedDistricts = await District.insertMany(districtsWithDivisions);
    console.log('Districts seeded');

    // Process and insert upazilas
    const upazilasWithDistricts = upazilas.map(upazila => {
      const district = insertedDistricts.find(d => d.id === upazila.district_id);
      if (district) {
        return { ...upazila, district: district._id };
      }
      return null;
    }).filter(u => u !== null);

    console.log('Inserting Upazilas:', upazilasWithDistricts);
    const insertedUpazilas = await Upazila.insertMany(upazilasWithDistricts);
    console.log('Upazilas seeded');

    // Process and insert unions
    const unionsWithUpazilas = unions.map(union => {
      const upazila = insertedUpazilas.find(up => up.id === union.upazila_id);
      if (upazila) {
        return { ...union, upazila: upazila._id };
      }
      return null;
    }).filter(u => u !== null);

    console.log('Inserting Unions:', unionsWithUpazilas);
    await Union.insertMany(unionsWithUpazilas);
    console.log('Unions seeded');

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
};