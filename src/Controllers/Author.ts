/*
*   ManuScripts
*   CS 61 - 17S
*/

import { sprintf } from "sprintf-js";
import { UserController } from "./User";
import { IUser } from "../Models/User";
import { IManuscript, Manuscript } from "../Models/Manuscript";

const statuses = ['submitted', 'underreview', 'accepted', 'rejected', 'typeset', 'scheduled', 'published'];

export class Author extends UserController {

    //region --REPL--

    public evaluate (args : string[], logout : () => void) : void {
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
        console.log(`ID: ${this.user._id}`);
    }


    protected status () : void {
      Manuscript.find({ author: this.user._id }).sort({ 'status': 1 })
      .then((result) => {
        console.log(sprintf("%-26s %-30s %-10s %-15s %-40s", "ID", "Title", "RIcode", "Status", "Timestamp"));
        // print results
        for (var key in result) {
          if (result.hasOwnProperty(key)) {
            var manu = result[key];
            console.log(sprintf("%-26s %-30s %-10s %-15s %-40s", manu._id, manu.title, manu.ricode, statuses[manu.status], manu.timestamp));
          }
        }
      })
      .catch((error) => {
        console.error("Failed to get manuscripts:", error);
      });
    }

    protected submit (args : string[]) : void {

        if (args.length < 3) {
          console.error('Submit requires a title and RIcode');
          return;
        }

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

    protected retract (args : string[]) : void {

        if (args.length < 2) {
          console.error('Retract requires a manuscript ID');
          return;
        }

        // Retract
        Manuscript.remove({ _id: args[1], author: this.user._id }, err => {
            if (err) console.error("Failed to remove manuscript. Make sure it is yours.");
            else console.log("Retracted manuscript:", args[1]);
        });
    }
    //endregion
}
