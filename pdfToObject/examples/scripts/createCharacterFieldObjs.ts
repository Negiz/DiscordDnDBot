//@todo use simpler pdf to make an example
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
import * as fs from "fs";

const inputFile  = "./pdfToObject/examples/inputFiles/5E_CharacterSheet_Fillable.pdf"
const outputFile = "./pdfToObject/examples/outputFiles/characterSheetFieldObjs.txt"

const loadingTask = pdfjsLib.getDocument(inputFile);
loadingTask.promise
.then(function (doc:any) {
    return doc.getFieldObjects().then(CallbackSuccess);
});

function CallbackSuccess(Obj:any){
    console.log("Writing to file:",outputFile);
    fs.writeFileSync(outputFile,JSON.stringify(Obj));
}

