/*
*   ManuScripts
*   CS 61 - 17S
*/

import { UserController } from "./User";
import { IUser } from "../Models/User";
import { IManuscript, Manuscript } from "../Models/Manuscript";

export class Editor extends UserController {

    //region --REPL--

    protected evaluate (args : string[], logout : () => void) : void {
        if ((args[0] = args[0].toLowerCase()) == "status") this.status();
        else if (args[0] == "assign") this.assign(args[1], args[2]);
        else if (args[0] == "accept") this.accept(args[1]);
        else if (args[0] == "reject") this.reject(args[1]);
        else if (args[0] == "typeset") this.typeset(args[1], +args[2]);
        else if (args[0] == "issue") this.issue(+args[1], +args[2]);
        else if (args[0] == "schedule") this.schedule(args[1], args[2]);
        else if (args[0] == "publish") this.publish(args[1]);
        else if (args[0] == "logout") logout();
        else console.error("Unrecognized command received. Try again");
    }
    //endregion


    //region --Operations--

    protected welcome () : void {
        // Print
        console.log(`Welcome editor ${this.user.fname} ${this.user.lname}`);
    }

    protected status () : void {

    }

    private assign (manuscript : string, reviewer : string) : void { // Might want these to be IManuscript and IUser

    }

    private accept (manuscript : string) : void {
        Manuscript.findByIdAndUpdate(manuscript, { status: "accepted", timestamp: new Date() }, (err, manuscript) => {
            if (err) console.error("Failed to accept manuscript:", err);
            else if (manuscript) console.log("Accepted manuscript:", manuscript.title);
        });
    }

    private reject (manuscript : string) : void {
        Manuscript.findByIdAndUpdate(manuscript, { status: "rejected", timestamp: new Date() }, (err, manuscript) => {
            if (err) console.error("Failed to reject manuscript:", err);
            else if (manuscript) console.log("Rejected manuscript:", manuscript.title);
        });
    }

    private typeset (manuscript : string, pages : number) : void {

    }

    private issue (year : number, period : number) : void {

    }

    private schedule (manuscript : string, issue : string) : void {

    }

    private publish (issue : string) : void {

    }
    //endregion
}