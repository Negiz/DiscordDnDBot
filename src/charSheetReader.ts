// Creates Player object from Pdf characterSheet5e
// as Json "tests/iofiles/playercopy.txt" (FBaseComponent keys deleted by Replacer function)
import { PdfToObject, GetObjectFromDocument } from "../pdfToObject/main";
import { SModelObjSystem } from "../pdfToObject/systems/modelObjSystem";
import { FBaseComponent } from "../pdfToObject/baseClasses/baseComponent";
import { CPlayerKeyContainer } from "./classes/playerKeyContainer";
import { Player } from "./classes/player";
import { FinalizePlayerObject } from "./utility/pdfToPlayer";
import { ValidateFields } from "../pdfToObject/utility/validationDefault";

let fileName ='./resources/5E_CharacterSheet_Fillable.pdf';

let pdfobj = new PdfToObject(fileName,Player,CPlayerKeyContainer,FBaseComponent,3,true,ValidateFields,FinalizePlayerObject);


let promis = GetObjectFromDocument<Player,CPlayerKeyContainer,FBaseComponent>(pdfobj);
promis.then(CallbackSuccess,CallbackFailed);


// callbacks if we want to modify something more
function CallbackSuccess(Obj:any){
    // casting required not all fields might be set?
    let ref:Player = Obj as Player;
    console.log(ref.PlayerName);
    console.log("All went fine");
    let playerfile = "tests/iofiles/playercopy.txt"
    let content = JSON.stringify(Obj,Replacer,' ');
    const fs = require('fs');
    try {
        fs.writeFileSync(playerfile, content);
        // file written successfully
    } catch (err) {
        console.error(err);
    }
    
}
function CallbackFailed<Player>(errMsg:any){
    console.log('Errors in creating object: \n',errMsg);
    //let pl = Obj as Player;
}

function Replacer(key:any, value:any, baseClass:any = FBaseComponent){
    let tempObj = SModelObjSystem.GetInstance().GetTemplateObj(baseClass);
    if(tempObj.hasOwnProperty(key)){
        return undefined;
    }
    return value;
}