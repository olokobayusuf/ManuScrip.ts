/*
*   ManuScripts
*   CS 61 - 17S
*/

import { UserController } from "./User";
import { IUser, User } from "../Models/User";

export class Reviewer extends UserController {

    private resignRequested : boolean;

    //region --REPL--

    protected evaluate (args : string[], logout : () => void) : void {
        // Evaluate
        if ((args[0] = args[0].toLowerCase()) == "status") this.status();
        else if (args[0] == "accept") this.review(true, args);
        else if (args[0] == "reject") this.review(false, args);
        else if (args[0] == "resign") if (this.resign()) logout(); else ;
        else if (args[0] == "logout") logout();
        else console.error("Unrecognized command received. Try again");
    }
    //endregion


    //region --Operations--

    protected welcome () : void {
        // Print
        console.log(`Welcome reviewer ${this.user.fname} ${this.user.lname}`);
    }

    protected status () : void {

    }

    private review (accepted : boolean, args : string[]) : void {
        
    }

    private resign () : boolean {
        let resigned = this.resignRequested;
        if (!this.resignRequested) {
            console.log("Enter resign again to resign");
            this.resignRequested = true;
        } else {
            User.findByIdAndRemove(this.user._id, (err, user) => {
                if (err) console.error("Failed to resign:", err);
                else if (user) console.log("Thank you for your services!");
            });
        }
        return resigned;
    }
    //endregion
}