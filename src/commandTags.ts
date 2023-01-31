// just to prevent silly typos, and easier to change if defined multiple files
export class FCommandNames{
    static DeleteInitTables:string = "deleteinittables";
    static InitStart:string = "initiativestart";
    static InitiativeStop:string = "initiativestop";
    static CreateThread:string = "createthread";
    static Ping:string = "ping";
    static BetterRoll:string = "testingaction";
    static Roll:string = "roll";
}

export class FSubCommandNames{
    // roll subcommands.
    static RollOptionsSubcommandName:string = "numberinputs"
    static RollStringSubcommandName:string = "textinput";
    static RollStringOptionName:string = "dicestring";
    static RollCountOptionName:string = "dicecount";
    static RollNumberOptionName:string = "dicenumber";
}
export class FRoleTags{
    static DMTag:string = "Dungeon Master";
}
