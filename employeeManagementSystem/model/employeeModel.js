import mongoose from "mongoose";


const employeeSchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required: true
    },
    salary:{
        type:Number,
      required: true

    },
    EmployeeId:{
        type:Number,
        require:true,
        unique:true,
    },
    email:{
        type:String,
       required: true,
        trim:true,
        unique:true,
    },
    field:{
        type:String,
        required: true,
        enum:[
            "full stack developer",
            "graphic design",
            "video editing",
            "UI/UX"
        ],
        default:"full stack developer"
    },
    phoneNumber:{
        type:Number,
       required: true
    }
})

const employee= mongoose.model("employee",employeeSchema)

export default employee;