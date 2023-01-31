


const MAXDICEROLLS = 20;
const MAXDICED = 100;

export class WhatToRoll{
    DiceCount:number;
    DiceNumber:number;
    RolledValues:number[] = [];

    constructor(diceCount=0, diceNumber=0){
        this.DiceCount = diceCount;
        this.DiceNumber = diceNumber;
        this.RolledValues = [];
    }
}
export function FailedMessage(interaction:any){
    // put what interaction failed
    let returnmsg = interaction.commandName+" failed. Input might be incorrect";
    return interaction.reply({content: returnmsg, ephemeral:false});
}

export function ParseDiceString(dicestr:string) : WhatToRoll{
     // we prefer 2d10 this method than the other
    const rgx = /\d+/g;  // muista toi vitun g
    let matches:string[] | any  = [];
    matches = dicestr.match(rgx);
    let match1 = parseInt(matches[0]);
    let match2 = parseInt(matches[1]);
    let count  = 0;
    let dicenumber = 0;
    if(!isNaN(match1) && !isNaN(match2)){
        // no negative numbers and maxed out in rolls 20 and dicenumber 100
        count  = Math.min(MAXDICEROLLS, Math.max(1, match1));
        dicenumber = Math.min(MAXDICED,Math.max(2,match2));
    }
    else if(!isNaN(match1)){ // if just one number treat it as one throw ex d20
        count = 1;
        dicenumber = Math.min(MAXDICED,Math.max(2,match1));
    
    }
    return new WhatToRoll(count,dicenumber);// returns 0's if failed, generate fail msg
}

export function RollDice(RollObject:WhatToRoll) : WhatToRoll  {
    for(let i= 0; i != RollObject.DiceCount; ++i){
        console.log(RollObject);
        let rolledValue = Math.max(1, Math.ceil(Math.random()*RollObject.DiceNumber) );
        RollObject.RolledValues.push(rolledValue);
    }
    console.log(RollObject);
    return RollObject;
}

export function GetRollsFromString(diceString:string) : WhatToRoll    {
    let whatRolls:WhatToRoll = ParseDiceString(diceString);
    return RollDice(whatRolls);
}
export function GetRollsFromIntegers(count:number,diceNumber:number) : WhatToRoll    {
    let whatRolls = new WhatToRoll(count,diceNumber);
    return RollDice(whatRolls);
}
