/*
 * This file contains examples of the possible operations used in the
 * manuscripts application, such as submitting a new manuscript or typesetting one.
 *
 * It is meant to be run in Terminal with: mongo MMtest.js
 *
 * It uses variables to store return values such as user ids to perform operations
 * later in the file.
 *
 * These operations are not ordered in the way which they would be during the actual
 * use of the application, but are just done in the order listed in the system specs.
 *
 * Most error-checking, etc. will need to be done on the application level, as
 * MongoDB on it's own will allow use to insert "bogus" data.
 */


db = db.getSiblingDB('manuscripts');

// register a new author
var author = db.user.insertOne({
  role: "author",
  password: "",
  fname: "Robert",
  lname: "Hayes",
  address: "Dartmouth College Hinman Box 375, Hanover, NH. 03755",
  email: "rhayes@hotmail.com",
  affiliation: "Neukom Institute",
});
var temp = db.user.findOne({ _id: author.insertedId });
print("Welcome author "+temp.fname+" "+temp.lname+", your ID is : "+author.insertedId);

// Register a new editor
var editor = db.user.insertOne({
  role: "editor",
  password: "",
  fname: "Solaire",
  lname: "Ahmed",
})
temp = db.user.findOne({ _id: editor.insertedId });
print("Welcome editor "+temp.fname+" "+temp.lname+", your ID is : "+editor.insertedId);

//Register a new reviewer
var reviewer = db.user.insertOne({
  role: "reviewer",
  password: "",
  fname: "Steven",
  lname: "Tyler",
  email: "styler@celerisque.com",
  affiliation: "Aerosmith",
  interests: [4, 5, 6]
})
temp = db.user.findOne({ _id: reviewer.insertedId });
print("Welcome reviewer "+temp.fname+" "+temp.lname+", your ID is : "+reviewer.insertedId);




// -------------------------- As an author -------------------------------------
print("\n");

// submit new manuscript
var newManuscript = db.manuscript.insertOne({
    author: author.insertedId, //we would know this after they login
    ricode: 4,
    title: "Script",
    contributors: [{ fname: "Mike", lname: "Myers" }],
    status: "submitted",
    timestamp: Date(),
    sortNum: 1,
})
print("Your new manuscript has id: "+newManuscript.insertedId);

var newManuscript2 = db.manuscript.insertOne({
    author: author.insertedId, //we would know this after they login
    ricode: 5,
    title: "Script2",
    status: "submitted",
    timestamp: Date(),
    sortNum: 1,
})
print("Your new manuscript has id: "+newManuscript2.insertedId);

var newManuscript3 = db.manuscript.insertOne({
    author: author.insertedId, //we would know this after they login
    ricode: 5,
    title: "Script3",
    status: "submitted",
    timestamp: Date(),
    sortNum: 1,
})
print("Your new manuscript has id: "+newManuscript3.insertedId);

// status
print("Status (author):");
print("ID\t\t\t\tTitle\t\tRIcode\tStatus\t\tTimestamp");
var manuCursor = db.manuscript.find({ author: author.insertedId });
while (manuCursor.hasNext()) {
  var manu = manuCursor.next();
   print(manu._id + "\t"+manu.title+"\t"+manu.ricode+"\t"+manu.status+"\t"+manu.timestamp);
}

// Retract
print("Retracting manuscript "+newManuscript.insertedId);
var retracted = db.manuscript.deleteOne({ _id: newManuscript.insertedId });




// ------------------------------ As an editor --------------------------------
print("\n");

// status
print("Status (editor):");
print("ID\t\t\t\tTitle\t\tRIcode\tStatus\t\tTimestamp");
var manuCursor = db.manuscript.find();
manuCursor.sort({ sortNum: 1 });
while (manuCursor.hasNext()) {
  var manu = manuCursor.next();
   print(manu._id + "\t"+manu.title+"\t\t"+manu.ricode+"\t"+manu.status+"\t\t"+manu.timestamp);
}

// assign <manu#> <reviewer id>
var newReview = db.review.insertOne({
  manuscript: newManuscript2.insertedId,
  reviewer: reviewer.insertedId,
  dateSent: Date(),
});
print("Added review:");
var rvw = db.review.findOne({ _id: newReview.insertedId });
printjson(rvw);

// Assign a second for demonstrating reviewer
db.review.insertOne({
  manuscript: newManuscript3.insertedId,
  reviewer: reviewer.insertedId,
  dateSent: Date(),
});

// reject <manu#>
db.manuscript.findOneAndUpdate({ _id: newManuscript3.insertedId}, { $set: {
    status: "rejected",
    timestamp: Date(),
    sortNum: 3,
  }}
);
print("Rejected manuscript:");
var updated = db.manuscript.findOne({ _id: newManuscript3.insertedId });
printjson(updated);

// accept <manu#>
db.manuscript.findOneAndUpdate({ _id: newManuscript2.insertedId}, { $set: {
    status: "accepted",
    timestamp: Date(),
    sortNum: 4,
  }}
);
print("Accepted manuscript:");
updated = db.manuscript.findOne({ _id: newManuscript2.insertedId });
printjson(updated);

// typeset <manu#> <pp>
db.manuscript.findOneAndUpdate({ _id: newManuscript2.insertedId}, { $set: {
    status: "typeset",
    timestamp: Date(),
    sortNum: 5,
    pageCount: 4,
  }}
);
print("Typeset manuscript:");
updated = db.manuscript.findOne({ _id: newManuscript2.insertedId });
printjson(updated);

// schedule <manu#> <issue>

var issue = db.issue.findOne({ year: 2017, period: 2 }); // Get issue we want

db.manuscript.findOneAndUpdate({ _id: newManuscript2.insertedId}, {
  $set: {
    status: "scheduled",
    timestamp: Date(),
    sortNum: 6,
    issue: issue._id,
  }
});
print("Scheduled manuscript:");
updated = db.manuscript.findOne({ _id: newManuscript2.insertedId });
printjson(updated);


// publish <issue>
db.issue.findOneAndUpdate({ _id: issue._id}, {
  $set: {
    published: true,
    publishDate: Date(),
  }
});
// update corresponding manuscripts
db.manuscript.findAndModify({
  query: { issue: issue._id },
  update: { $set:
    {
    status: "published",
    timestamp: Date(),
    sortNum: 7,
    }
  }
});
print("Published issue:");
updated = db.issue.findOne({ _id: issue._id });
printjson(updated);
print("Updated manuscript(s):");
publishedManus = db.manuscript.find({ issue: issue._id });
while(publishedManus.hasNext()) {
  printjson(publishedManus.next());
}



// --------------------------- As a reviewer ----------------------------------
print("\n");

// status
print("Status (reviewer):");
print("ID\t\t\t\tTitle\t\tRIcode\tStatus\t\tTimestamp");
var assignedCursor = db.review.find({ reviewer: reviewer.insertedId });
while(assignedCursor.hasNext()) {
  var rev = assignedCursor.next();
  var reviewManu = db.manuscript.findOne({ _id: rev.manuscript });
  print(reviewManu._id + "\t"+reviewManu.title+"\t\t"+reviewManu.ricode+"\t"+reviewManu.status+"\t"+reviewManu.timestamp);

}


// accept <manu#> <appropriateness> <clarity> <methodology> <contribution>
db.review.findOneAndUpdate({ manuscript: newManuscript2.insertedId, reviewer: reviewer.insertedId}, {
  $set: {
    appropriateness: 8,
    clarity: 7,
    methodology: 9,
    contribution: 8,
    recommendation: true,
  }
});
print("Review-accepted");
var review = db.review.findOne({ manuscript: newManuscript2.insertedId, reviewer: reviewer.insertedId});
printjson(review);


// reject <manu#> <appropriateness> <clarity> <methodology> <contribution>
db.review.findOneAndUpdate({ manuscript: newManuscript3.insertedId, reviewer: reviewer.insertedId}, {
  $set: {
    appropriateness: 4,
    clarity: 5,
    methodology: 2,
    contribution: 3,
    recommendation: false,
  }
});
print("Review-rejected");
review = db.review.findOne({ manuscript: newManuscript3.insertedId, reviewer: reviewer.insertedId});
printjson(review);


// resign
print("Reviewer "+reviewer.insertedId+" resigned\nThank you for your service");
db.user.deleteOne({ _id: reviewer.insertedId });
