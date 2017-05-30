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
        if (tokens.length < 5) {
          console.log("Cannot register a user without a role, username, first name, and last name");
          return;
        }

        // Get the user type
        let type : string = tokens[1].toLowerCase();
        // Check that it is valid
        if (["author", "editor", "reviewer"].indexOf(type) === -1) {
            console.error("Cannot register because user type is invalid");
            return;
        }

        if (type == "author" && tokens.length < 8) {
          console.error("Did not provide sufficient info to register an author");
          return;
        }

        if (type == "reviewer" && tokens.length < 6) {
          console.error("Did not provide sufficient info to register an reviewer");
          return;
        }

        // Register the user type
        let user : IUser = {
            role: type,
            username: tokens[2],
            fname: tokens[3],
            lname: tokens[4],
        };
        // Add user-specific attributes
        if (type == "author") {
            user.email = tokens[5];
            user.affiliation = tokens[6];
            user.address = tokens[7];
        } else if (type == "reviewer") {
          let ricodes: [number] = <[number]>[];
          for (let i = 5; i < Math.min(tokens.length, 8); i++) {
            let code : number = parseInt(tokens[i]);
            console.log(code);
            ricodes.push(code);
          }
          user.ricodes = ricodes;
        }

        User.count({ username: user.username })
        .then((num) => {
          if (num > 1) {
            console.error("A user already exists with that username");
          } else {
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
        }).catch(error => console.log("Error while attempting to register user"));

    }

    public static login (id : string, callback : (UserController) => void) : void {
        // Find a user with that ID
        User.findOne( { username: id }, (err, user) => {
            // Invoke callbackS
            if (user) switch (user.role) {
                case "author": callback(new Author(user)); break;
                case "editor": callback(new Editor(user)); break;
                case "reviewer": callback(new Reviewer(user)); break;
            }
            // Failed to find user
            else console.error("Invalid login username");
        });
    }
    //endregion
}
