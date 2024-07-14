import { Router, Request, Response } from "express";
import {
  getDivisions,
  getDistricts,
  getUnions,
  getUpazilas,
  getDistrictsByDivision,
} from "../controllers";

const router = Router();

router.get("/districts/:divisionId", getDistrictsByDivision);
router.get("/districts", getDistricts);
router.get("/divisions", getDivisions);
router.get("/unions", getUnions);
router.get("/upazilas", getUpazilas);

export default router;
