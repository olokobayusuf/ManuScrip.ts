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
  interests: [9, 10, 11]
})
temp = db.user.findOne({ _id: reviewer.insertedId });
print("Welcome reviewer "+temp.fname+" "+temp.lname+", your ID is : "+reviewer.insertedId);




// -------------------------- As an author -------------------------------------
//printjson(author);
//var temp = db.user.findOne({ _id: author.insertedId });
//db.user.findOne({ lname: "Hayes" });

//printjson(temp);


// submit new manuscript
var newManuscript = db.manuscript.insertOne({
    author: author.insertedId, //we would know this after they login
    ricode: 4,
    title: "My Manuscript",
    contributors: [{ fname: "Mike", lname: "Myers" }],
    status: "submitted",
    timestamp: Date(),
})
print("Your new manuscript has id: "+newManuscript.insertedId);

var newManuscript2 = db.manuscript.insertOne({
    author: author.insertedId, //we would know this after they login
    ricode: 5,
    title: "My Manuscript2",
    status: "submitted",
    timestamp: Date(),
})
print("Your new manuscript has id: "+newManuscript2.insertedId);

// status
print("Status:");
print("ID\t\t\t\tTitle\t\tRIcode\tStatus\t\tTimestamp");
var manuCursor = db.manuscript.find({ author: author.insertedId });
while (manuCursor.hasNext()) {
  var manu = manuCursor.next();
   print(manu._id + "\t"+manu.title+"\t"+manu.ricode+"\t"+manu.status+"\t"+manu.timestamp);
}

// Retract
print("Retracting manuscript "+newManuscript.insertedId);
var retracted = db.manuscript.deleteOne({ _id: newManuscript.insertedId });

// status
print("Status:");
print("ID\t\t\t\tTitle\t\tRIcode\tStatus\t\tTimestamp");
var manuCursor = db.manuscript.find({ author: author.insertedId });
while (manuCursor.hasNext()) {
  var manu = manuCursor.next();
   print(manu._id + "\t"+manu.title+"\t"+manu.ricode+"\t"+manu.status+"\t"+manu.timestamp);
}



// ------------------------------ As an editor --------------------------------

// status


// assign <manu#> <reviewer id>



// reject <manu#>



// accept <manu#>



// typeset <manu#> <pp>


// schedule <manu#> <issue>


// publish <issue>



// --------------------------- As a reviewer ----------------------------------


// status

// accept <manu#> <appropriateness> <clarity> <methodology> <contribution>


// reject <manu#> <appropriateness> <clarity> <methodology> <contribution>





// resign
