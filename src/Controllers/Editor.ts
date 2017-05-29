/*
*   ManuScripts
*   CS 61 - 17S
*/

import { sprintf } from "sprintf-js";
import { UserController } from "./User";
import { IUser, User } from "../Models/User";
import { IManuscript, Manuscript } from "../Models/Manuscript";
import { IIssue, Issue } from "../Models/Issue";

const statuses = ['submitted', 'underreview', 'accepted', 'rejected', 'typeset', 'scheduled', 'published'];

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
        console.log(`ID: ${this.user._id}`);
    }


    protected status () : void {
      Manuscript.find().sort({ 'status': 1 })
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

    private assign (manuscript : string, reviewer : string) : void { // DEPLOY
        // Get the reviewer's RI codes
        User.findById(reviewer, (err, reviewer) => {
            // Error checking
            if (err) console.error("Failed to retrieve reviewer info:", err);
            // Update manuscript
            else Manuscript.findOneAndUpdate({
                _id: manuscript,
                $or: [{ status: 0 }, { status: 1 }],
                ricode: { $in: reviewer.ricodes }
            }, { status: 1, timestamp: new Date() }, (err, manuscript) => {
                // Error checking
                if (err) console.error("Failed to assign manuscript:", err);
                // Log
                else console.log(`Assigned manuscript ${manuscript.title} to reviewer ${reviewer.fname} ${reviewer.lname}`);
            });
        });

    }

    private accept (manuscript : string) : void { // DEPLOY
        Manuscript.findByIdAndUpdate(manuscript, { status: 2, timestamp: new Date() }, (err, manuscript) => {
            if (err) console.error("Failed to accept manuscript:", err);
            else if (manuscript) console.log("Accepted manuscript:", manuscript.title);
        });
    }

    private reject (manuscript : string) : void { // DEPLOY
        Manuscript.findByIdAndUpdate(manuscript, { status: 3, timestamp: new Date() }, (err, manuscript) => {
            if (err) console.error("Failed to reject manuscript:", err);
            else if (manuscript) console.log("Rejected manuscript:", manuscript.title);
        });
    }

    private typeset (manuscript : string, pageCount : number) : void { // DEPLOY
        Manuscript.findByIdAndUpdate(manuscript, { status: 4, pageCount: pageCount, timestamp: new Date() }, (err, manuscript) => {
            if (err) console.error("Failed to typeset manuscript:", err);
            else if (manuscript) console.log("Typeset manuscript:", manuscript.title);
        });
    }

    private issue (year : number, period : number) : void { // DEPLOY
        // Create the issue
        let issue : IIssue = {
            year: year,
            period: period
        };
        // Send to db
        new Issue(issue).save().then(issue => console.log("Created new issue:", issue._id));
    }

    private schedule (manuscript : string, issue : string) : void { // DEPLOY
        Manuscript.findByIdAndUpdate(manuscript, {
            status: 5,
            timestamp: new Date(),
            issue: issue
        }, (err, manuscript) => {
            if (err) console.error("Failed to schedule manuscript:", err);
            else if (manuscript) console.log("Scheduled manuscript:", manuscript.title);
        });
    }

    private publish (issue : string) : void { // DEPLOY
        // Publish the issue
        Issue.findByIdAndUpdate(issue, { published: true, publishedDate: new Date() }, (err, issue) => {
            // Update all its manuscripts
            Manuscript.find({ issue: issue._id }).update({
                status: 6,
                timestamp: new Date()
            });
        });
    }
    //endregion
}
