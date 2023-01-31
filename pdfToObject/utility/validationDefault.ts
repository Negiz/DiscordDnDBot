import * as utils from "./utilityfunctions";
import { FBaseComponent, IValueSetter } from "../baseClasses/baseComponent";
import { CKeyContainer } from "../baseClasses/keyContainer";


// Validation array from class 'CKeyContainer' has all required keys that need to
// exist in both document and flattened object. 
// Document keys need also be of valid value 
export function ValidateFields(docObj:any,obj:any,container:CKeyContainer, outErrMsgs:string[] = new Array(),BaseComponentClass:any = FBaseComponent):boolean{
    let bAllFine = true;
    let flatObj = {};
    utils.MakeFlatObject(obj,flatObj,container.GetKeysObj());
    for(let el of container.ValidationArray){
        // this is the prolem
        if(!utils.FieldValueIsValid(utils.GetFieldValueByStr(docObj,el.Pdfkey))){
            bAllFine = false;
            outErrMsgs.push('Key '+ el.Pdfkey+' value is invalid or NOT found in pdf document');

        }
        // check that our object is correct as well
        if(!flatObj.hasOwnProperty(el.ObjKey)){
            outErrMsgs.push('Objkey: '+ el.ObjKey + ' Not found in Object: '+ obj.constructor.name);
            bAllFine = false;
        }
        else{
            //
        }
    }
    console.log(outErrMsgs);
    return bAllFine;
}