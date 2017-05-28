/*
*   ManuScripts
*   CS 61 - 17S
*/

import { sprintf } from "sprintf-js";
import { Schema } from "mongoose";
import { UserController } from "./User";
import { IUser } from "../Models/User";
import { IManuscript, Manuscript } from "../Models/Manuscript";
import { IReview, Review } from "../Models/Review";

const statuses = ['submitted', 'underreview', 'rejected', 'accepted', 'typeset', 'scheduled', 'published'];

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
      // Find reviews associated with this reviewer
      Review.find({ reviewer: this.user._id }).populate('manuscript').sort({ 'manuscript.status': 1 })
      .then((result) => {
        console.log(sprintf("%-26s %-30s %-10s %-10s %-40s", "ID", "Title", "RIcode", "Status", "Timestamp"));
        for (var key in result) {
          if (result.hasOwnProperty(key)) {
            // Find the manuscript for each review
            Manuscript.findOne({ _id: result[key].manuscript })
            .then((manu) => {
              console.log(sprintf("%-26s %-30s %-10s %-10s %-40s", manu._id, manu.title, manu.ricode, statuses[manu.status], manu.timestamp));
            })
            .catch((error) => {
              console.error("Failed to get manuscripts:", error);
            });

          }
        }
      })
      .catch((error) => {
        console.error("Failed to get manuscripts:", error);
      });

    }


    private review (accepted : boolean, args : string[]) : void { // DEPLOY
        // Arg checking
        if (args.length != 6) {
            console.error("Incorrect arguments for manuscript review");
            return;
        }
        // Range checking
        if (args.slice(2, args.length).some(score => +score < 1 || +score > 10)) {
            console.error("Feedback scores must be within [1, 10]");
            return;
        }
        // Create review
        let review : IReview = {
            manuscript: new Schema.Types.ObjectId(args[1]),
            reviewer: this.user._id,
            appropriateness : +args[2],
            clarity : +args[3],
            methodology : +args[4],
            contribution : +args[5],
            recommendation : accepted,
        };
        // Insert
        new Review(review).save().then(review => console.log(`Submitted review ${review._id} for manuscript ${args[1]}`));
    }

    private resign () : boolean { // DEPLOY
        let resigned = this.resignRequested;
        if (!this.resignRequested) {
            console.log("Enter resign again to resign");
            this.resignRequested = true;
        } else {

        }
        return resigned;
    }
    //endregion
}
