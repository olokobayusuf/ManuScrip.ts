use manuscripts;

// Create users
db.user.insertMany([
    {
        role: "author",
        password: "",
        fname: "Kevin",
        lname: "Bacon",
        address: "Dartmouth College Hinman Box 001, Hanover, NH. 03755",
        email: "kevinbacon@gmail.com",
        affiliation: "Dartmouth College",
    },
    {
        role: "author",
        password: "",
        fname: "Finn",
        lname: "Harvey",
        address: "Ap #555-8087 Nulla Road",
        email: "aliquam.eros.turpis@cursus.com",
        affiliation: "Dartmouth College",
    },
    {
        role: "editor",
        password: "",
        fname: "Chris",
        lname: "Stevens",
    },
    {
        role: "editor",
        password: "",
        fname: "Rooney",
        lname: "Solis",
    },
    {
        role: "reviewer",
        password: "",
        fname: "Finn",
        lname: "Harvey",
        email: "aliquam.eros.turpis@cursus.com",
        affiliation: "Dartmouth College",
        interests: [
            "Fish",
            "Physics"
        ]
    },
    {
        role: "reviewer",
        password: "",
        fname: "Courtney",
        lname: "Rhodes",
        email: "ac.ipsum@libero.edu",
        affiliation: "Curabitur Inc.",
        interests: [
            "Chemistry",
            "Physics",
            "Computer Science"
        ]
    },
    {
        role: "reviewer",
        password: "",
        fname: "Shad",
        lname: "Tran",
        email: "Proin.vel@celerisque.co.uk",
        affiliation: "Purus Company",
        interests: [
            "Computer Science",
            "Chemistry",
            "Physics"
        ]
    },
    {
        role: "reviewer",
        password: "",
        fname: "Finn",
        lname: "Harvey",
        email: "aliquam.eros.turpis@cursus.com",
        affiliation: "Dartmouth College",
        interests: [
            "Fish",
            "Physics"
        ]
    },
]);


db.ricode.insertMany([
  {
    id: 1,
    interest: "Agricultural engineering",
  }
  {
    id: 2,
    interest: "Biochemical engineering",
  },
  {
    id: 3,
    interest: "Biomechanical engineering",
  },
  {
    id: 4,
    interest: "Ergonomics",
  },
  {
    id: 5,
    interest: "Food engineering",
  },
  {
    id: 6,
    interest: "Bioprocess engineering",
  },
  {
    id: 7,
    interest: "Genetic engineering",
  },
  {
    id: 8,
    interest: "Human genetic engineering",
  },
  {
    id: 9,
    interest: "Metabolic engineering",
  },
  {
    id: 10,
    interest: "Molecular engineering",
  },
  {
    id: 11,
    interest: "Neural engineering",
  },
  {
    id: 12,
    interest: "Protein engineering",
  },
  {
    id: 13,
    interest: "Rehabilitation engineering",
  },
  {
    id: 14,
    interest: "Tissue engineering",
  },
  {
    id: 15,
    interest: "Aquatic and environmental engineering",
  },
  {
    id: 16,
    interest: "Architectural engineering",
  },
  {
    id: 17,
    interest: "Civionic engineering",
  },
  {
    id: 18,
    interest: "Construction engineering",
  },
  {
    id: 19,
    interest: "Earthquake engineering",
  },
  {
    id: 20,
    interest: "Earth systems engineering and management",
  },
  {
    id: 21,
    interest: "Ecological engineering",
  },
  {
    id: 22,
    interest: "Environmental engineering",
  },
  {
    id: 23,
    interest: "Geomatics engineering",
  },
  {
    id: 24,
    interest: "Geotechnical engineering",
  },
  {
    id: 25,
    interest: "Highway engineering",
  },
  {
    id: 26,
    interest: "Hydraulic engineering",
  },
  {
    id: 27,
    interest: "Landscape engineering",
  },
  {
    id: 28,
    interest: "Land development engineering",
  },
  {
    id: 29,
    interest: "Pavement engineering",
  },
  {
    id: 30,
    interest: "Railway systems engineering",
  },
  {
    id: 31,
    interest: "River engineering",
  },
  {
    id: 32,
    interest: "Sanitary engineering",
  },
  {
    id: 33,
    interest: "Sewage engineering",
  },
  {
    id: 34,
    interest: "Structural engineering",
  },
  {
    id: 35,
    interest: "Surveying",
  },
  {
    id: 36,
    interest: "Traffic engineering",
  },
  {
    id: 37,
    interest: "Transportation engineering",
  },
  {
    id: 38,
    interest: "Urban engineering",
  },
  {
    id: 39,
    interest: "Irrigation and agriculture engineering",
  },
  {
    id: 40,
    interest: "Explosives engineering",
  },
  {
    id: 41,
    interest: "Biomolecular engineering",
  },
  {
    id: 42,
    interest: "Ceramics engineering",
  },
  {
    id: 43,
    interest: "Broadcast engineering",
  },
  {
    id: 44,
    interest: "Building engineering",
  },
  {
    id: 45,
    interest: "Signal Processing",
  },
  {
    id: 46,
    interest: "Computer engineering",
  },
  {
    id: 47,
    interest: "Power systems engineering",
  },
  {
    id: 48,
    interest: "Control engineering",
  },
  {
    id: 49,
    interest: "Telecommunications engineering",
  },
  {
    id: 50,
    interest: "Electronic engineering",
  },
  {
    id: 51,
    interest: "Instrumentation engineering",
  },
  {
    id: 52,
    interest: "Network engineering",
  },
  {
    id: 53,
    interest: "Neuromorphic engineering",
  },
  {
    id: 54,
    interest: "Engineering Technology",
  },
  {
    id: 55,
    interest: "Integrated engineering",
  },
  {
    id: 56,
    interest: "Value engineering",
  },
  {
    id: 57,
    interest: "Cost engineering",
  },
  {
    id: 58,
    interest: "Fire protection engineering",
  },
  {
    id: 59,
    interest: "Domain engineering",
  },
  {
    id: 60,
    interest: "Engineering economics",
  },
  {
    id: 61,
    interest: "Engineering management",
  },
  {
    id: 62,
    interest: "Engineering psychology",
  },
  {
    id: 63,
    interest: "Ergonomics",
  },
  {
    id: 64,
    interest: "Facilities Engineering",
  },
  {
    id: 65,
    interest: "Logistic engineering",
  },
  {
    id: 66,
    interest: "Model-driven engineering",
  },
  {
    id: 67,
    interest: "Performance engineering",
  },
  {
    id: 68,
    interest: "Process engineering",
  },
  {
    id: 69,
    interest: "Product Family Engineering",
  },
  {
    id: 70,
    interest: "Quality engineering",
  },
  {
    id: 71,
    interest: "Reliability engineering",
  },
  {
    id: 72,
    interest: "Safety engineering",
  },
  {
    id: 73,
    interest: "Security engineering",
  },
  {
    id: 74,
    interest: "Support engineering",
  },
  {
    id: 75,
    interest: "Systems engineering",
  },
  {
    id: 76,
    interest: "Metallurgical Engineering",
  },
  {
    id: 77,
    interest: "Surface Engineering",
  },
  {
    id: 78,
    interest: "Biomaterials Engineering",
  },
  {
    id: 79,
    interest: "Crystal Engineering",
  },
  {
    id: 80,
    interest: "Amorphous Metals",
  },
  {
    id: 81,
    interest: "Metal Forming",
  },
  {
    id: 82,
    interest: "Ceramic Engineering",
  },
  {
    id: 83,
    interest: "Plastics Engineering",
  },
  {
    id: 84,
    interest: "Forensic Materials Engineering",
  },
  {
    id: 85,
    interest: "Composite Materials",
  },
  {
    id: 86,
    interest: "Casting",
  },
  {
    id: 87,
    interest: "Electronic Materials",
  },
  {
    id: 88,
    interest: "Nano materials",
  },
  {
    id: 89,
    interest: "Corrosion Engineering",
  },
  {
    id: 90,
    interest: "Vitreous Materials",
  },
  {
    id: 91,
    interest: "Welding",
  },
  {
    id: 92,
    interest: "Acoustical engineering",
  },
  {
    id: 93,
    interest: "Aerospace engineering",
  },
  {
    id: 94,
    interest: "Audio engineering",
  },
  {
    id: 95,
    interest: "Automotive engineering",
  },
  {
    id: 96,
    interest: "Building services engineering",
  },
  {
    id: 97,
    interest: "Earthquake engineering",
  },
  {
    id: 98,
    interest: "Forensic engineering",
  },
  {
    id: 99,
    interest: "Marine engineering",
  },
  {
    id: 100,
    interest: "Mechatronics",
  },
  {
    id: 101,
    interest: "Nanoengineering",
  },
  {
    id: 102,
    interest: "Naval architecture",
  },
  {
    id: 103,
    interest: "Sports engineering",
  },
  {
    id: 104,
    interest: "Structural engineering",
  },
  {
    id: 105,
    interest: "Vacuum engineering",
  },
  {
    id: 106,
    interest: "Military engineering",
  {
    id: 107,
    interest: "Combat engineering",
  },
  {
    id: 108,
    interest: "Offshore engineering",
  },
  {
    id: 109,
    interest: "Optical engineering",
  },
  {
    id: 110,
    interest: "Geophysical engineering",
  },
  {
    id: 111,
    interest: "Mineral engineering",
  },
  {
    id: 112,
    interest: "Mining engineering",
  },
  {
    id: 113,
    interest: "Reservoir engineering",
  },
  {
    id: 114,
    interest: "Climate engineering",
  },
  {
    id: 115,
    interest: "Computer-aided engineering",
  },
  {
    id: 116,
    interest: "Cryptographic engineering",
  },
  {
    id: 117,
    interest: "Information engineering",
  },
  {
    id: 118,
    interest: "Knowledge engineering",
  },
  {
    id: 119,
    interest: "Language engineering",
  },
  {
    id: 120,
    interest: "Release engineering",
  },
  {
    id: 121,
    interest: "Teletraffic engineering",
  },
  {
    id: 122,
    interest: "Usability engineering",
  },
  {
    id: 123,
    interest: "Web engineering",
  },
  {
    id: 124,
    interest: "Systems engineering",
  }
]);
