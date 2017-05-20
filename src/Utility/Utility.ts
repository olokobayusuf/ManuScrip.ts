/*
*   ManuScripts
*   CS 61 - 17S
*/

export class Utility {

    //region --Logging--

    private static _verbose : boolean;

    public static set verbose (state : boolean) {
        this._verbose = state;
    }

    public static log (log : String) : void {
        console.log(log);
    }

    public static logVerbose (log : String) : void {
        if (this._verbose) console.log("Logging: "+log);
    }

    public static logError (error : String) : void {
        console.error(error);
    }
    //endregion
}