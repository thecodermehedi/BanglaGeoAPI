import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { Division, District, Union, Upazila } from "../models";

const readJsonFile = (filePath: string) => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

const seedCollection = async (
  model: any,
  data: any[],
  collectionName: string
) => {
  try {
    await model.deleteMany({});
    console.log(`Existing ${collectionName} data cleared`);

    await model.insertMany(data);
    console.log(`${collectionName} seed data inserted`);
  } catch (error) {
    console.error(`Error seeding ${collectionName} data:`, error);
  }
};

const seedDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/banglageoapi");

    console.log("Connected to MongoDB");

    const divisions = readJsonFile(
      path.join(__dirname, "../json/divisions.json")
    );
    const districts = readJsonFile(
      path.join(__dirname, "../json/districts.json")
    );
    const unions = readJsonFile(path.join(__dirname, "../json/unions.json"));
    const upazilas = readJsonFile(
      path.join(__dirname, "../json/upazilas.json")
    );

    await seedCollection(Division, divisions, "Divisions");
    await seedCollection(District, districts, "Districts");
    await seedCollection(Union, unions, "Unions");
    await seedCollection(Upazila, upazilas, "Upazilas");

    mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
