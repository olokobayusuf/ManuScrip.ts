/*
*   ManuScripts
*   CS 61 - 17S
*/

import { UserController } from "./User";
import { IUser } from "../Models/User";
import { IManuscript, Manuscript } from "../Models/Manuscript";

export class Author extends UserController {

    //region --REPL--

    protected evaluate (args : string[], logout : () => void) : void {
        if ((args[0] = args[0].toLowerCase()) == "status") this.status();
        else if (args[0] == "submit") this.submit(args);
        else if (args[0] == "retract") this.retract(args);
        else if (args[0] == "logout") logout();
        else console.error("Unrecognized command received. Try again");
    }
    //endregion


    //region --Operations--

    protected welcome () : void {
        // Print
        console.log(`Welcome author ${this.user.fname} ${this.user.lname} from ${this.user.address}`);
    }

    protected status () : void {

    }

    protected submit (args : string[]) : void { // DEPLOY
        // Create the manuscript
        let manuscript : IManuscript = {
            author: this.user._id,
            title: args[1],
            ricode: +args[2],
            contributors: <[string]>[] // Really weird syntax :/
        };
        // Add contributors
        args.slice(3, args.length).forEach(contributor => manuscript.contributors.push(contributor));
        // Submit
        new Manuscript(manuscript).save().then(manuscript => console.log("Submitted new manuscript:", manuscript._id));
    }

    protected retract (args : string[]) : void { // DEPLOY
        // Retract
        Manuscript.remove({ _id: args[1], author: this.user._id }, err => {
            if (err) console.error("Failed to remove manuscript. Make sure it is yours.");
            else console.log("Retracted manuscript:", args[1]);
        });
    }
    //endregion
}