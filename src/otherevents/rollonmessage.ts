

import {GetRollsFromString} from "../utility/rolling";


//@todo Message type
export function RollOnMessage(msg:any):void{
    const rgx = /(?<=!roll).+/;
    let found = msg.content.match(rgx);
    if(!found) msg.reply("Paska inputti");
    let dicestr = found[0];
    let whatRolls = GetRollsFromString(dicestr);
    let rollername = "sep";
    console.log(msg);
    if(whatRolls.DiceCount == 0){
        msg.reply("Error dice count not specified");
        return;
    };
    rollername = msg.author.username;
    let returnmsg = rollername + " rolled ( "+whatRolls.DiceCount+"d"+whatRolls.DiceNumber+" ):\t" +whatRolls.RolledValues.join(' ');
    msg.reply(returnmsg);
}
