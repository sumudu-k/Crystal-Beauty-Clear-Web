import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export function createUser(req, res) {

    const newUserData = req.body;
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
                }, "cbc0521");
                console.log(token);
                res.json({
                    message: token
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

