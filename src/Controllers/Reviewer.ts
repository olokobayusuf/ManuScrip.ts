/*
*   ManuScripts
*   CS 61 - 17S
*/

import { UserController } from "./User";
import { IUser } from "../Models/User";
import { IManuscript, Manuscript } from "../Models/Manuscript";
import { IReview, Review } from "../Models/Review";


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
        console.log("ID\t\t\t\tTitle\t\tRIcode\tStatus\t\tTimestamp");

        for (var key in result) {
          if (result.hasOwnProperty(key)) {
            // Find the manuscript for each review
            Manuscript.findOne({ _id: result[key].manuscript })
            .then((manu : IManuscript) => {
              console.log(manu._id + "\t"+manu.title+"\t"+manu.ricode+"\t"+manu.status+"\t"+manu.timestamp);
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

    }

    private resign () : boolean { // INCOMPLETE
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
