/*
*   ManuScripts
*   CS 61 - 17S
*/

import { IUser, User } from "../Models/User";
import { UserController } from "./User";
import { Author } from "./Author";
import { Editor } from "./Editor";
import { Reviewer } from "./Reviewer";

export class Auth {

    //region --Operations--

    public static register (tokens : string[], callback : (UserController) => void) : void {
        // Get the user type
        let type : string = tokens[1].toLowerCase();
        // Check that it is valid
        if (["author", "editor", "reviewer"].indexOf(type) === -1) {
            console.error("Cannot register because user type is invalid");
            return;
        }
        // Register the user type
        let user : IUser = {
            role: type,
            fname: tokens[2],
            lname: tokens[3]
        };
        // Add user-specific attributes
        if (type == "author") {
            user.email = tokens[4];
            user.address = tokens[5];
        } else if (type == "reviewer") for (let i = 4; i < tokens.length; i++) user.ricodes.push(+tokens[i]);
        // Log
        console.log("Registering user:", user);
        // Register
        new User(user).save().then(result => {
            // Create the user
            let user : UserController = null;
            switch (type) {
                case "author": user = new Author(result); break;
                case "editor": user = new Editor(result); break;
                case "reviewer": user = new Reviewer(result); break;
            }
            // Pass to callback
            if (user) callback(user);
        });
    }

    public static login (id : string, callback : (UserController) => void) : void {
        // Find a user with that ID
        User.findById(id, (err, user) => {
            // Invoke callback
            if (user) switch (user.role) {
                case "author": callback(new Author(user)); break;
                case "editor": callback(new Editor(user)); break;
                case "reviewer": callback(new Reviewer(user)); break;
            }
            // Failed to find user
            else console.error("Invalid login ID");
        });
    }
    //endregion
}