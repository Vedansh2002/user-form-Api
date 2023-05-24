const User = require("../models/User");
const PhoneNumber = require('libphonenumber-js');

exports.createUser = async (req, res) => {
  try {
    // console.log("req body", req.body);
    const { name, email, dob, phoneno } = req.body;
    const defaultCountryCode = "+91";
    const completePhoneNumber = defaultCountryCode + phoneno;
    const isValid = PhoneNumber.isValidNumber(completePhoneNumber);

    function validateAge(dob) {
      const currentDate = new Date();
      const date = new Date(dob);
      const ageDiff = currentDate - date;
      const ageDate = new Date(ageDiff);
    
      const years = ageDate.getUTCFullYear() - 1970;
      
      if (years >= 18) {
        return true; // User is 18 or above
      } else {
        return false; // User is below 18
      }
    }
    


    // if (!name || !email || !dob || !phoneno ) {
    //   console.log("not all fields...");
    //   return res.status(400).json({
    //     status: 400,
    //     message: "Please fill all fields",
    //   });
    // }
    if(!isValid){
      // console.log("Invalid Phone Number");
      return res.json({
        success:false,
        message:"Enter Phone Number"
      });
    }
    if(!validateAge(dob)){
      // console.log("You Should be 18+");
      return res.json({
        success:false,
        message:"Age Restriction"
      });
    }
    const user = await User.create({
      name,
      email,
      dob,
      phoneno
    });
    return res.status(200).json({
      status: 201,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
