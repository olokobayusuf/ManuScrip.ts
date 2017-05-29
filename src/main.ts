/*
*   ManuScripts
*   CS 61 - 17S
*/

import readline = require("readline");
import { Auth } from "./Controllers/Auth";
import { UserController } from "./Controllers/User";
import { db } from "./db";
import { RICode } from "./Models/RICode";

const ricodes = require("../json/RICodes.json");

class ManuScripts {

    private static loadData() : void {
      RICode.collection.drop();
      RICode.insertMany(ricodes);
    }

    /**
     * Application Entry Point
     */
    public static main () : void {
        // Start REPL
        console.log("Welcome to ManuScripts");
        this.loadData();
        console.log("Please authenticate yourself by registering or logging in:");
        let scanner : readline.ReadLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        }).on("line", input => {
            let tokens : string[] = input.match(/'[^']*'|[^ ]+/g);
            if (!tokens || tokens.length == 0) return;
            tokens = tokens.map(str => str.replace(/'/g,""));
            let user : UserController = null;
            let callback : (UserController) => void = user => {
                // Pause the scanner
                scanner.pause();
                // Evaluate
                user.loop(() => {
                    // Log out
                    console.log("Logging out...");
                    user = null;
                    // Resume scanner
                    scanner.resume();
                });
            };
            // Check command type
            if ((tokens[0] = tokens[0].toLowerCase()) == "register") Auth.register(tokens, callback);
            else if (tokens[0].toLowerCase() == "login") Auth.login(tokens[1], callback);
            else if (tokens[0] == "exit") scanner.close();
            else if (tokens[0] == "quit") scanner.close();
            else console.error("Unrecognized command received. Try again");
        }).on("close", () => {
            // Say bye
            console.log("Bye!");
            // Exit
            process.exit(0);
        });
    }

}

/**
 * Start the application
 */
ManuScripts.main();
