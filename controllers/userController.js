import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
export function createUser(req, res) {

    const newUserData = req.body;

    if (newUserData.type == "admin") {
        if (req.user.type != "admin") {
            res.json({ message: "You are not authorized to create an admin account" })
            return;
        }
        if (req.user == null) {
            res.json({ message: "please login as admin to create admin account" })
            return;
        }

    }

    newUserData.password = bcrypt.hashSync(newUserData.password, 10);

    const user = new User(newUserData);

    user.save().then(() => {
        res.json(
            { message: "User created" }
        )
    }).catch(() => {
        res.json(
            { message: "Error creating user" }
        )
    })
}



export function loginUser(req, res) {
    User.find({ email: req.body.email }).then((users) => {
        if (users.length == 0) {
            res.json({ message: "User not found" })
        } else {
            const user = users[0];

            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

            if (isPasswordCorrect) {
                // generate token
                const token = jwt.sign({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isBlocked: user.isBlocked,
                    type: user.type,
                    profilePicture: user.profilePicture
                }, process.env.SECRET);
                console.log(token);

                res.json({
                    message: "User Logged In",
                    token: token,
                    user: {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        profilePicture: user.profilePicture,
                        type: user.type
                    }
                })

            } else {
                res.json(
                    { message: "invailed password" }
                )
            }
        }
    })
}

export function deleteUser() {
    User.deleteOne({ email: req.body.email }).then(() => {
        res.json({ message: "User Deleted" })
    })
};



export function isAdmin(req) {
    if (req.user == null) {
        return false;
    }
    if (req.user.type != "admin") {
        return false;
    }
    return true;
}

export function isCustomer(req) {
    if (req.user == null) {
        return false;
    }
    if (req.user.type != "customer") {
        return false;
    }
    return true;
}

export async function googleLogin(req,res){
    // in here user/google send a token when signin. get that token and send it to the googleapis to decode.decoded values send as a json
    console.log(req.body)
    const token=req.body.token
    // https://www.googleapis.com/oauth2/v3/userinfo
    try{
        const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        // res.json({
        //     message:"Google login successful",
        //     user:response.data
        // })
        const email=response.data.email
        const usersList =await User.find({email:email})

        if(usersList.length>0){
            const user = usersList[0]
            const token = jwt.sign({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isBlocked: user.isBlocked,
                    type: user.type,
                    profilePicture: user.profilePicture
                }, process.env.SECRET)

                res.json({message:"Userlogged in",
                    token:token,
                    user:{
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        type: user.type,
                        profilePicture: user.profilePicture
                    }
                })
        }else{
            //create a new user
            const newUserData={
                email:email,
                firstName: response.data.given_name,
                lastName: response.data.family_name,
                type: "customer",
                profilePicture: response.data.picture,
                password:"random_pw"
                // 
            }
            const user= new User(newUserData)
            user.save().then(()=>{
                res.json({message:"User created"})
            }).catch((e)=>{
                res.json({message:"user not found"})
            })
        }


    }catch(e){
        res.json({message:"Google login failed"})
    }

}

