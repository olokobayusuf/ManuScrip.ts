/*
*   ManuScripts
*   CS 61 - 17S
*/

import { sprintf } from "sprintf-js";
import { UserController } from "./User";
import { IUser, User } from "../Models/User";
import { IManuscript, Manuscript } from "../Models/Manuscript";
import { IReview, Review } from "../Models/Review";
import { IIssue, Issue } from "../Models/Issue";

const statuses = ['submitted', 'underreview', 'rejected', 'accepted', 'typeset', 'scheduled', 'published'];

export class Editor extends UserController {

    //region --REPL--

    public evaluate (args : string[], logout : () => void) : void {
        if ((args[0] = args[0].toLowerCase()) == "status") this.status();
        else if (args[0] == "list") this.list(args);
        else if (args[0] == "assign") this.assign(args[1], args[2]);
        else if (args[0] == "accept") this.accept(args[1]);
        else if (args[0] == "reject") this.reject(args[1]);
        else if (args[0] == "typeset") this.typeset(args);
        else if (args[0] == "issue") this.issue(args);
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
        console.error("Failed to get manuscripts");
      });
    }

    private list (args : string[]) : void {
      if (args.length < 2) {
        console.error("list takes arguments 'reviewers' or 'issues'");
        return;
      }
      if (args[1] == "reviewers") {
        User.find({ role: "reviewer" })
        .then((result) => {
          console.log(sprintf("%-20s %-15s %-15s %-15s", "Username", "Fname", "Lname", "RIcodes"));
          // print results
          for (var key in result) {
            if (result.hasOwnProperty(key)) {
              var reviewer = result[key];
              console.log(sprintf("%-20s %-15s %-15s %-15s", reviewer.username, reviewer.fname, reviewer.lname, reviewer.ricodes.toString()));
            }
          }
        })
        .catch((error) => {
          console.error("Failed to get issues");
        });
      } else if (args[1] == "issues") {
        Issue.find().sort({ 'year': 1, 'period' : 1 })
        .then((result) => {
          console.log(sprintf("%-26s %-10s %-10s %-40s", "ID", "Year", "Period", "Published"));
          // print results
          for (var key in result) {
            if (result.hasOwnProperty(key)) {
              var issue = result[key];
              let pub = issue.published ? issue.publishDate : "no";
              console.log(sprintf("%-26s %-10s %-10s %-40s", issue._id, issue.year, issue.period, pub));
            }
          }
        })
        .catch((error) => {
          console.error("Failed to get issues");
        });
      } else {
        console.error("list takes arguments 'reviewers' or 'issues'");
        return;
      }
    }

    private assign (manuscript : string, reviewer : string) : void {
        if (manuscript == null || reviewer == null) {
          console.error("You must provide a manuscript and reviewer");
          return;
        }
        // Get the reviewer's RI codes
        User.findOne({ username: reviewer }, (err, reviewer) => {
            // Error checking
            if (err) console.error("Failed to retrieve reviewer info");
            else if (reviewer == null) console.error("That reviewer does not exist");
            // Update manuscript
            else Manuscript.findOneAndUpdate({
                _id: manuscript,
                $or: [{ status: 0 }, { status: 1 }],
                ricode: { $in: reviewer.ricodes }
            }, { status: 1, timestamp: new Date() }, (err, manuscript) => {
                // Error checking
                if (err) console.error("Failed to assign manuscript, check given IDs");
                else if (manuscript == null) console.error("Failed to assign manuscript, check manuscript status and RIcodes");
                // Log
                else {
                  Review.findOne({ manuscript : manuscript._id, reviewer: reviewer._id })
                  .then((result) => {
                    if (result !== null) {
                      console.log('Reviewer already assigned to this manuscript');
                    } else {
                      let rev : IReview = {
                        manuscript : manuscript._id,
                        reviewer : reviewer._id,
                      };
                      new Review(rev).save().
                      then(res => console.log(`Assigned manuscript ${manuscript.title} to reviewer ${reviewer.fname} ${reviewer.lname}`));
                    }
                  })
                  .catch((error) => {
                    console.log('Error attempting to assign reviewer');
                  });
                }
            });
        });

    }

    private accept (manuscript : string) : void {
      if (manuscript == null) {
        console.error("You must provide a manuscript");
        return;
      }

      Review.count({ manuscript: manuscript, recommendation: {$exists: true, $ne: null}})
      .then((num) => {
        if (num >= 3) {
          Manuscript.findOneAndUpdate({ _id: manuscript, status: 1 }, { status: 3, timestamp: new Date() }, (err, manuscript) => {
              if (err) console.error("Failed to accept manuscript");
              else if (manuscript == null) console.error("Manuscript must exist and be underreview to accept");
              else if (manuscript) console.log("Accepted manuscript:", manuscript.title);
          });
        } else {
          console.log('Cannot accept a manuscript without 3 completed reviews');
        }
      })
      .catch((error) => {
        console.error('Error checking for related reviews');
      })
    }

    private reject (manuscript : string) : void {
        if (manuscript == null) {
          console.error("You must provide a manuscript");
          return;
        }

        Manuscript.findByIdAndUpdate(manuscript, { status: 2, timestamp: new Date() }, (err, manuscript) => {
            if (err) console.error("Failed to reject manuscript:");
            else if (manuscript == null) console.log("That manuscript does not exist");
            else if (manuscript) console.log("Rejected manuscript:", manuscript.title);
        });
    }

    private typeset (args : string[]) : void {
        if (args.length < 3) {
          console.error("You must provide a manuscript and pageCount");
          return;
        }
        let manuscript : string = args[1];
        let pageCount : number = +args[2];

        Manuscript.findOneAndUpdate({ _id: manuscript, status: 3 }, { status: 4, pageCount: pageCount, timestamp: new Date() }, (err, manuscript) => {
            if (err) console.error("Failed to typeset manuscript:");
            else if (manuscript == null) console.error("Manuscript must exist and be in accepted state");
            else if (manuscript) console.log("Typeset manuscript:", manuscript.title);
        });
    }

    private issue (args : string[]) : void {
        if (args.length < 3) {
          console.error("You must provide a year and period");
          return;
        }

        let year : number = +args[1];
        let period : number = +args[2];

        // Create the issue
        let issue : IIssue = {
            year: year,
            period: period
        };
        Issue.findOne({ year, period })
        .then((result) => {
          if (result !== null) {
            console.error("An issue already exists for that year and period");
          } else {
            // Send to db
            new Issue(issue).save().then(issue => console.log("Created new issue:", issue._id));
          }
        })
    }

    private schedule (manuscript : string, issue : string) : void {
        if (manuscript == null || issue == null) {
          console.error("You must provide a manuscript and issue");
          return;
        }

        Issue.findById(issue)
        .then((result) => {
          if (result == null || result.published == true) {
            console.error("Issue must exist and not be published");
          } else {
              Manuscript.findOneAndUpdate({ _id: manuscript, status: 4 }, {
                  status: 5,
                  timestamp: new Date(),
                  issue: issue
              }, (err, manuscript) => {
                  if (err) console.error("Failed to schedule manuscript");
                  else if (manuscript == null) console.error("Manuscript must exist and be typeset");
                  else if (manuscript) console.log("Scheduled manuscript:", manuscript.title);
              });
          }
        }).catch((error) => console.error("Error scheduling the manuscript"));
    }

    private publish (issue : string) : void { //TODO: check if there is at least 1 manuscript associated
        if (issue == null) {
          console.error("You must provide an issue");
          return;
        }

        Issue.findById(issue)
        .then((result) => {
          if (result == null || result.published === true) {
            console.error("Cannot publish a non-existant or already published issue");
          } else {
            Manuscript.count({ issue: issue })
            .then((count) => {
              if (count < 1) {
                console.error('You cannot publish an issue without any manuscripts in it');
              } else {
                // Publish the issue
                Issue.findByIdAndUpdate(issue, { published: true, publishDate: Date.now() }, (err, ret) => {

                    if (err) console.error("Failed to publish issue");
                    else if (ret == null) console.error("Issue does not exist");
                    else {
                      console.log(`Published issue ${issue}`);
                      // Update all its manuscripts
                      Manuscript.update({ issue: issue }, { status: 6, timestamp: new Date()}, { multi: true })
                      .then((ret) => {
                        console.log("Updated associated manuscripts");
                      }).catch((error) => {
                        console.error("Error updating manuscripts", error);
                      })
                    }
                });
              }
            }).catch((error) => console.error('Error attempt to publish the iss'))
          }
        }).catch((error) => {
          console.error("Error when attempting to publish the issue");
        });

    }
    //endregion
}
