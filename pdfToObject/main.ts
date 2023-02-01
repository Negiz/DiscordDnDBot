const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
import { FBaseComponent } from "./baseClasses/baseComponent";
import { ValidateFields } from "./utility/validationDefault";
import { SetValuesFromPdfToObject } from "./utility/setterDefault";
//@todo what if no validation, just try to create object with keys in the object
//@todo possible to make function without basecomponent to make it more general?
// create new PdfToObject and provide it to GetObjectFromDocument.
export class PdfToObject{
    // validation function, all fields checked that are required here.
    // args(docObj:any,obj:any,container:CKeyContainer,outErrMsgs:string[], BaseComponentClass:any = FBaseComponent)
    // defaulted ValidateFields in "pdfToObject\utility\validationDefault.ts" 
    ValidationFunc:Function;
    // Sets values from docObj to Obj.
    // args(docObj: any, Obj: any, KeyCont:CKeyContainer, BaseComponentClass:any = FBaseComponent,ValueSetterClass:any = IValueSetter))
    // defaulted SetValuesFromPdfToObject in pdfToObject\utility\setterDefault.ts
    SetterFunc:Function;
    // we might want to skip validation and work with what we find
    bValidateFields:boolean;
    // limit pages read by reader. Will not execute at all if more pages than this
    MaxPagesCount:number;
    // set your file name here.
    FileName:string;
    // into what class of object keys from document should be saved
    ObjectClass:any;
    // maps document keys to object keys and vice versa.
    KeyContainerClass:any;
    // every component in object should inherit from this.
    BaseCompClass:any;
    constructor(filename:string,ObjectClass:any,KeyContainerClass:any,BaseComponentClass:any=FBaseComponent,maxpages = 0,bValidateFields:boolean = true,validationFunc:Function = ValidateFields,setterFunc:Function = SetValuesFromPdfToObject){
        this.FileName = filename;
        this.ObjectClass = ObjectClass;
        this.KeyContainerClass = KeyContainerClass;
        this.BaseCompClass = BaseComponentClass;
        this.MaxPagesCount = maxpages
        this.bValidateFields = bValidateFields;
        this.ValidationFunc = validationFunc;
        this.SetterFunc = setterFunc;
    }
}

// call this with the object, template types just to enforce type
// returns Promise, to set callback function use: 
//  returnedPromise.then(Success,Fail);
export function GetObjectFromDocument<ObjType,KeyContainerType,BasecompType>(PdfObj:PdfToObject){
    return new Promise(function(resolve,reject){
        //@Question does template produce wanted errors here?
        let Obj:ObjType = new PdfObj.ObjectClass();
        let KeyCont:KeyContainerType = new PdfObj.KeyContainerClass();
        let BaseComponentClass:BasecompType = PdfObj.BaseCompClass;
        let ValidationFunc = PdfObj.ValidationFunc;
        let SetterFunc = PdfObj.SetterFunc;
        const loadingTask = pdfjsLib.getDocument(PdfObj.FileName);
        loadingTask.promise
        .then(function (doc:any) {
            console.log("# Document Loaded");
            const numPages:number = doc.numPages;
            const maxpg = PdfObj.MaxPagesCount;
            console.log("Number of Pages: " + numPages);
            
            let errMsgs:string[] = new Array();
            if(maxpg > 0 && !(numPages <= PdfObj.MaxPagesCount)){
                errMsgs.push('Document page count exceeds Maximum limit');
                return reject(errMsgs);
            } 
            return doc.getFieldObjects().then(function(docObj:any){
                if(PdfObj.bValidateFields){
                    if(!ValidationFunc(docObj,Obj,KeyCont,errMsgs,BaseComponentClass)){
                        return reject(errMsgs);
                    }
                }
                SetterFunc(docObj,Obj,KeyCont,BaseComponentClass);
                return resolve(Obj);
            });
        }).catch((reason:any) =>{
            console.log(reason);
        });
    })
}