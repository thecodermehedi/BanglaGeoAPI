import { Division, District, Union, Upazila } from "../models";
import { Request, Response } from "express";

export const getDivisions = async (req: Request, res: Response) => {
  try {
    const divisions = await Division.find();
    res.status(200).json(divisions);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getDistricts = async (req: Request, res: Response) => {
  try {
    const districts = await District.find();
    res.status(200).json(districts);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getDistrictsByDivision = async (req: Request, res: Response) => {
  try {
    const division_id = req.params.divisionId;
    const districts = await District.find({ division_id });
    res.status(200).json(districts);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getUnions = async (req: Request, res: Response) => {
  try {
    const unions = await Union.find();
    res.status(200).json(unions);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getUpazilas = async (req: Request, res: Response) => {
  try {
    const upazilas = await Upazila.find();
    res.status(200).json(upazilas);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
