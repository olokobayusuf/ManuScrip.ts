/*
*   ManuScripts
*   CS 61 - 17S
*/

import { sprintf } from "sprintf-js";
import { Schema } from "mongoose";
import { UserController } from "./User";
import { IUser, User } from "../Models/User";
import { IManuscript, Manuscript } from "../Models/Manuscript";
import { IReview, Review } from "../Models/Review";

const statuses = ['submitted', 'underreview', 'rejected', 'accepted', 'typeset', 'scheduled', 'published'];

export class Reviewer extends UserController {

    private resignRequested : boolean;

    //region --REPL--

    public evaluate (args : string[], logout) : void {
        // Evaluate
        if ((args[0] = args[0].toLowerCase()) == "status") this.status();
        else if (args[0] == "accept") this.review(true, args);
        else if (args[0] == "reject") this.review(false, args);
        else if (args[0] == "resign") this.resign(logout);
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
        console.log(sprintf("%-25s %-30s %-10s %-12s %-10s %-38s", "ID", "Title", "RIcode", "Status", "Reviewed?", "Timestamp"));
        for (var key in result) {
          if (result.hasOwnProperty(key)) {
            let reviewed = result[key].recommendation !== undefined ? 'yes' : 'no';
            // Find the manuscript for each review
            Manuscript.findOne({ _id: result[key].manuscript })
            .then((manu) => {
              console.log(sprintf("%-25s %-30s %-10s %-12s %-10s %-38s",
              manu._id, manu.title, manu.ricode, statuses[manu.status], reviewed , manu.timestamp));
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


    private review (accepted : boolean, args : string[]) : void {
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

        Manuscript.findById(args[1])
        .then((manu) => {
          if (manu.status !== 1) {
            console.error("Cannot review a manuscript which is not underreview");
          } else {
            Review.findOneAndUpdate({ manuscript: args[1], reviewer: this.user._id }, {
              appropriateness : +args[2],
              clarity : +args[3],
              methodology : +args[4],
              contribution : +args[5],
              recommendation : accepted,
            })
            .then((rev) => {
              console.log(`Updated review for manuscript ${args[1]}`)
            })
            .catch((error) => {
              console.log('Error updating this review');
            });
          }
        })
        .catch((error) => console.log("Error updating this review"));
    }

    private resign (logout) : boolean {
        let resigned = this.resignRequested;
        if (!this.resignRequested) {
            console.log("Enter resign again to resign");
            this.resignRequested = true;
        } else {
          User.findByIdAndRemove(this.user._id, (err, user) => {
            if (err) console.error("Failed to resign:", err);
             else if (user) {
               console.log("Removing related reviews...");
               Review.find({ reviewer: this.user._id }).remove()
               .then((ret) => {
                 console.log("Thank you for your services!");
                 logout();
               })
               .catch((error) => {
                 console.error('Error removing related reviews');
               });
             }
          });
        }
        return resigned;
    }
    //endregion
}
