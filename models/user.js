import { Schema, model, models } from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required!']
    },
    username: {
        type: String,
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
        required: [true, 'Email is required!']
    },
    image: {
        type: String
    },
    posts: {
        type: Array,
    },
    following: {
        type: Array,
    },
    followers: {
        type: Array
    }
});

const User = models.User || model("User", UserSchema);
export default User;