/*
*   ManuScripts
*   CS 61 - 17S
*/

import readline = require("readline");
import { Tests } from "./test"
import { Utility } from "./Utility/Utility"

class ManuScripts {
    
    /**
     * Application Entry Point
     */
    public static main (args : String[]) : void {
        // Set verbose mode
        Utility.verbose = args.some((elem : String, index : number, array : String[]) => elem == "-v" || elem == "--verbose");
        // Run tests
        if (args.some((elem : String, index : number, array : String[]) => elem == "-t" || elem == "--test")) {
            Tests.test(args);
            return;
        }
        // Check for auth mode
        let authenticate : boolean = args.some((elem : String, index : number, array : String[]) => elem == "-a" || elem == "--auth");
        // Start REPL
        Utility.log("Welcome to ManuScripts");
        //if (authenticate) Auth.getMasterKey(); // Hold off for now
        Utility.log("Please authenticate yourself by registering or logging in:");
        let scanner : readline.ReadLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
        scanner.on("line", input => {
            let tokens : String[] = [input]; //Utility.tokenize(input);
            if (tokens.length == 0) return;
            // Check command type
            //if (tokens[0].toLowerCase() == "register") user = User.register(tokens, authenticate);
            //else if (tokens[0].toLowerCase() == "login") user = User.login(tokens[1], authenticate);
            else if (tokens[0].toLowerCase() == "exit") scanner.close();
            else if (tokens[0].toLowerCase() == "quit") scanner.close();
            else Utility.logError("Unrecognized command received. Try again");
            // User REPL
            //while (user != null && (input = Utility.nextLine(scanner)) != null && user.evaluate(Utility.tokenize(input), scanner)) ;
            // Log out
            //if (user != null) Utility.log("Logging out...");
            //user = null;
        }).on("close", () => {
            // Say bye
            Utility.log("Bye!");
            //Query.close();
            // Exit
            process.exit(0);
        });
    }
}

/**
 * Start the application
 */
ManuScripts.main(process.argv);
