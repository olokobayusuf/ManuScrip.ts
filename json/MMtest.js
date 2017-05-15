use manuscripts;

db.user.insertMany([
    {
        role: "author",
        password: "",
        fname: "Kevin",
        lname: "Bacon",
        address: "Dartmouth College Hinman Box 001, Hanover, NH. 03755",
        email: "kevinbacon@gmail.com",
        affiliation: "Dartmouth College",
        interests: [
            "Fish",
            "Physics"
        ]
    },
    {
        role: "editor",
        password: "",
        fname: "Chris",
        lname: "Stevens",
        address: "Dartmouth College Hinman Box 004, Hanover, NH. 03755",
        email: "stevens@gmail.com",
        affiliation: "Dartmouth College",
        interests: [
            "Biology",
            "Chemistry"
        ]
    }
]);