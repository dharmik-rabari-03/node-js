import express from "express"
import employeeControl from "../controller/employeeControl.js"


const route=express.Router();


route.post("/add",employeeControl.add)
route.get("/AllEmployee",employeeControl.AllEmployee)
route.get("/EmployeeById/:id",employeeControl.EmployeeById)
route.delete("/deleteById/:id",employeeControl.Delete)
route.patch("/update/:id",employeeControl.updates)

export default  route;

