const fs = require("node:fs");
const path = require("node:path");

const commandFolderName = "commands";

//          ATTENTION!!! change this to use normal js
const fileExtension = ".ts"; // how this can be changed for compiled unit
module.exports = {
    getCommandFiles : function(){
        let filepaths: string[] = [];
        //console.log("dirname", __dirname,);
        const commandsPath = path.join(__dirname,commandFolderName);
        //@todo what are the types?
        // command folder should have only commands in them.
        // i don't know how to change between .js and .ts extensions.
        const commandFiles = fs.readdirSync(commandsPath).filter((file:any)=> file.endsWith(".ts"));
        if(commandFiles[0] == undefined || commandFiles[0] == null ){
            console.error("NO COMMANDS FOUND, CHECK FILE EXTENSION:",__filename);
        }
        for(const file of commandFiles){
            const filePath = path.join(commandsPath,file);
            //@Warning possible error correction
            //const command = require(filePath);
            filepaths.push(filePath);
        }
        return filepaths;
    },
}

