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

    /**
     * Application Entry Point
     */
    public static main () : void {
        // Start REPL
        console.log("Welcome to ManuScripts");
        console.log("Please authenticate yourself by registering or logging in:");
        this.loadData();
        let user : UserController = null;
        let scanner : readline.ReadLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        }).on("line", function(input : string) {
            // Tokenize input string
            let tokens : string[] = input.match(/'[^']*'|[^ ]+/g);
            // Null/empty checking
            if (!tokens || tokens.length == 0) return;
            // Remove quotations from compound tokens (more than one word)
            tokens = tokens.map(str => str.replace(/'/g,""));
            // Divert input to the user if we have one
            if (user) {
                // Have the user evaluate the token
                user.evaluate(tokens, () => {
                    // Log out
                    console.log("Logging out...");
                    user = null;
                });
                return;
            }
            // Check command type
            if ((tokens[0] = tokens[0].toLowerCase()) == "register") Auth.register(tokens, id => user = id);
            else if (tokens[0].toLowerCase() == "login") Auth.login(tokens[1], id => user = id);
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

    private static loadData() : void {
        RICode.collection.drop();
        RICode.insertMany(ricodes);
    }

}

/**
 * Start the application
 */
ManuScripts.main();
