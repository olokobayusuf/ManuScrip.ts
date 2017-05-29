/*
*   ManuScripts
*   CS 61 - 17S
*/

import readline = require("readline");
import { IUserModel, User } from "../Models/User";

export abstract class UserController {

    //region --Client API--

    public constructor (protected user : IUserModel) {
        // Display welcome
        this.welcome();
        // Display status
        this.status();
    }

    public loop (logout : () => void) : void {
        // Create a scanner
        let scanner : readline.ReadLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        }).on("line", input => {
            let args : string[];
            if (input.length > 0) {
              // Tokenize
              args = input.match(/'[^']*'|[^ ]+/g).map(str => str.replace(/'/g,""));

              // Evaluate
              this.evaluate(args, () => {
                  // Quit scanner
                  scanner.close();
                  // Invoke logout callback
                  logout();
              });
            }
        });
    }

    /**
     * User REPL evaluator
     * Returns whether the user is still performing tasks (whether logout hasn't been called)
     */
    protected abstract evaluate (tokens : string[], logout : () => void) : void;

    protected abstract status () : void;

    protected abstract welcome () : void;
    //endregion
}
