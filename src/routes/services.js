import express from "express";
import {
  addNewService,
  getAllServices,
  getService,
  updateService,
  deleteService,
} from "../controllers/services.js";
// console.log(addNewService);
const router = express.Router();

router.route("/").post(addNewService).get(getAllServices);
router.route("/:id").get(getService).patch(updateService).delete(deleteService);

export default router;
