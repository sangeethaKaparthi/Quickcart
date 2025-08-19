import { Router } from "express";
import auth from "../middleware/auth.js";
import { addAddressController, deleteAddresscontroller, getAddressController, updateAddressController } from "../controllers/address.controller.js";

const addressRouter = Router()
addressRouter.post("/create", auth, addAddressController);
addressRouter.get("/get", auth, getAddressController)
addressRouter.delete("/delete", auth, deleteAddresscontroller)
addressRouter.put("/update", auth, updateAddressController)

export default addressRouter