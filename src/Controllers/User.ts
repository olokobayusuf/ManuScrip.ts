/*
*   ManuScripts
*   CS 61 - 17S
*/

import { IUserModel, User } from "../Models/User";

export abstract class UserController {

    //region --Client API--

    public constructor (protected user : IUserModel) {
        // Display welcome
        this.welcome();
        // Display status
        this.status();
    }

    /**
     * User REPL evaluator
     * Returns whether the user is still performing tasks (whether logout hasn't been called)
     */
    public abstract evaluate (tokens : string[], logout : () => void) : void;

    protected abstract status () : void;

    protected abstract welcome () : void;
    //endregion
}
