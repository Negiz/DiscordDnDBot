require('dotenv').config();
const ffs = require("./getFilePaths");
const { Client, GatewayIntentBits, Collection } = require('discord.js');


import {RollOnMessage} from "./otherevents/rollonmessage" 
// Setting commands and usual stuff
const client= new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
});

client.commands = new Collection();
for(const path of ffs.getCommandFiles()){
    const command = require(path);
    
    // getting slashcommand's name, command is the whole module.exports
    client.commands.set(command.data.name,command);
}
//console.log(client.commands);
//@todo check interaction type to check variable holdings
client.once("ready", (interaction:any)=>{
    //console.log(interaction);
    console.log("Ready");
});
//@Review there is some enum thing some package?, would not need to use strings
client.on("interactionCreate", async (interaction:any)=>{
    //console.log(interaction);
    // interaction.reply("Pingered this is working now");
    // return;
    if(interaction.isModalSubmit()){
        interaction.reply({content:"Sheet received"});
    }

    if(!(interaction.isChatInputCommand()|| interaction.isButton())) return;
    // move button commands to their own?
    // if(interaction.isButton()){
    //     console.log("Indeed button");
    //     if(interaction.customId === FCommandNames.DeleteInitTables){
    //         interaction.reply({content:"Deleting tables",ephemeral:true});
    //         //this.initiatives.order = {};
    //     }
    // }

    ///@todo what is here happenings
    let interactionName:string = interaction.commandName;
    if(!interactionName){
        interactionName = interaction.customId; 
    }
    if(!interactionName) return; //@todo someerrors
    console.log("interaction name: ",interactionName);
    const command = client.commands.get(interactionName);
    if(!command){
        console.log("Not a command");
        return;  
    } 
    try{
        await command.execute(interaction);
    }
    catch(err){
        console.log(err);
        interaction.reply({content:"There was error executing command",ephemeral:true});
    }
});
//@todo check message type to have stuff linted
client.on("messageCreate", (msg:any)=> {
    
    if(msg.content.includes("!roll")){
        RollOnMessage(msg);
    }

})
client.on("messageDelete", (msg:any)=> {
    console.log("Deleted Message");
    console.log(msg);

})

client.login(process.env.TOKEN);
