const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	dob: {
		type: String,
		required: true,
		trim:true
	},
	phoneno: {
		type: Number,
		required: true,
		maxLength: 13,
	}
});

//post middleware for sending email
userSchema.post("save", async function (doc) {
	try {

		//transporter
		let transporter = nodemailer.createTransport({
			host:process.env.MAIL_HOST,
			auth:{
				user:process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
			}
		})

		//SEND MAIL
        let info = await transporter.sendMail({
            from:`StackFusion`,
            to:doc.email,
            subject:"Entry Confirmation Mail",
            html:`<h1>Your Entry has been created Successfully in our Database</h1>`,
        })

        console.log("INFO:",info);
		
	} catch (error) {
		console.error(error);
		
	}
})

module.exports = mongoose.model("User", userSchema);
