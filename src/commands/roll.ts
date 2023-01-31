import {GetRollsFromIntegers,GetRollsFromString,FailedMessage,WhatToRoll} from "../utility/rolling"
import {FCommandNames,FSubCommandNames} from "../commandTags";

{
const {SlashCommandBuilder, ComponentAssertions,CommandInteractionOptionResolver}= require("discord.js");


//INITIATIVES = require("./initstart").initiatives; // initiatives
//const {Player,InitiativeRecord} = require("../players/players.js");

function MakeRolls(interaction:any){
    let subcom:string = interaction.options.getSubcommand();
    
    //console.log(interaction.options);
    if(subcom == FSubCommandNames.RollOptionsSubcommandName){
        let count:number = interaction.options.get(FSubCommandNames.RollCountOptionName).value;
        let dicenumber:number = interaction.options.get(FSubCommandNames.RollNumberOptionName).value;
        return GetRollsFromIntegers(count,dicenumber);
    }
    else if(subcom == FSubCommandNames.RollStringOptionName ){
        //@todo purkkaa
        //console.log(interaction.options._hoistedOptions[0].value);
        let diceString:string = interaction.options._hoistedOptions[0].value;
        return GetRollsFromString(diceString);
    }
    return new WhatToRoll();
}

module.exports = {
    async execute(interaction:any){
        console.log("PING Reading Interaction...")
        let whatRolls:WhatToRoll =  MakeRolls(interaction);
        if(whatRolls.DiceCount == 0) return FailedMessage(interaction);

        const rollername = interaction.member.user.username;
        let returnmsg:string = rollername + " rolled ( "+whatRolls.DiceCount+"d"+whatRolls.DiceNumber+" ):\t" +whatRolls.RolledValues.join(' ');
        
        // if(PLAYERS.data.getById(rollerid) instanceof Player){
        //     console.log("DIS PLAYER");
        // }
        // else{
        //     console.log("dis not a player");
        // }
        // need to put recording on, only one d20 taken into account
        //@todo consider putting advantage here as well?
        if(/*rolls.initiatives.recording == true &&*/ whatRolls.DiceCount == 1 && whatRolls.DiceNumber == 20){

            const rollerid  = interaction.member.user.id;
            let tempKey = Math.random().toString();
            //ints = new InitiativeRecord(tempKey,whatRolls.RolledValues[0]);
            // this needs to be some sort of class that sends event
            // message id 
            //INITIATIVES.order.push(ints);
            // if(!rolls.initiatives.order[rollerid]){
            //     const player = PLAYERS.getById(rollerid);
                
            //     fullinitiative = rollsarr[0] + player.initiative;
            //     rolls.initiatives.order.push( [rollerid,fullinitiative] );
            // }// if reroll option and the roll exists.
            // else if(/*false&&*/ rolls.initiatives.order[rollerid]){ 
            //     const player = PLAYERS.getById(rollerid);
                 
            // }
            
            // console.log("Recording a value");
            
            // console.log(INITIATIVES.initiatives.order);
        }
        //if(interaction.relied)
        await interaction.reply({content: returnmsg, ephemeral:false});
        //await interaction.reply("Wat a ROLL!");

    },
    data: new SlashCommandBuilder()
    .setName(FCommandNames.Roll)
    .setDescription("rolls dice")
    .addSubcommand((subcommand:any) =>
        subcommand
            .setName(FSubCommandNames.RollStringOptionName)
            .setDescription('count+d+dice example: 5d10 or 1d20')
            .addStringOption((option:any) => option
                .setName(FSubCommandNames.RollStringSubcommandName).setDescription('stringhere')
                .setRequired(true)
            )
    )
    .addSubcommand((subcommand:any) => subcommand
        .setName(FSubCommandNames.RollOptionsSubcommandName)
        .setDescription('roll count first then dice type')
        .addIntegerOption((option:any) => 
            option.setName(FSubCommandNames.RollCountOptionName)
            .setDescription("Select dice and count")
            .setRequired(true)
            .addChoices(
                {name: '1', value: 1},
                {name: '2', value: 2},
                {name: '3', value: 3},
                {name: '4', value: 4},
                {name: '5', value: 5},
                {name: '6', value: 6},
                {name: '7', value: 7},
                {name: '8', value: 8},
                {name: '9', value: 9},
                {name: '10', value: 10},
                {name: '11', value: 11},
                {name: '12', value: 12},
                {name: '13', value: 13},
                {name: '14', value: 14},
                {name: '15', value: 15},
                {name: '16', value: 16},
                {name: '17', value: 17},
                {name: '18', value: 18},
                {name: '19', value: 19},
                {name: '20', value: 20},
                )
            )
        .addIntegerOption((option:any) => 
            option.setName(FSubCommandNames.RollNumberOptionName)
            .setDescription("Select dice and count")
            .setRequired(true)
            .addChoices(
                {name: 'd4', value: 4},
                {name: 'd6', value: 6},
                {name: 'd8', value: 8},
                {name: 'd10', value: 10},
                {name: 'd12', value: 12},
                {name: 'd20', value: 20},
                {name: 'd100', value: 100},
                )
            )
        )
}
}