import { FBaseComponent, IValueSetter } from "../baseClasses/baseComponent";
import { SModelObjSystem} from "../systems/modelObjSystem"
import { CKeyContainer } from "../baseClasses/keyContainer";


// get value of the field. Tries also space in the beginning or end of the string
export function GetFieldValueByStr(docObj:any,str:string):string{
    if(docObj.hasOwnProperty(str)){
        return docObj[str][0].value;
    }
    let tempstr = str + " ";
    if(docObj.hasOwnProperty(tempstr)){
        return docObj[tempstr][0].value;
    }
    tempstr = " "+ str;
    if(docObj.hasOwnProperty(tempstr)){
        return docObj[tempstr][0].value;
    }
    console.log("did not find:", str,"---In Function:",GetFieldValueByStr.name);
    return "";
}
// get if key exists in document.Tries also space in the beginning or end of the string
export function FieldExistsInDocument(docObj:any,str:string):boolean{
    let tempstr = str;
    if(docObj.hasOwnProperty(tempstr)){
        return true;
    }
    tempstr = str + " ";
    if(docObj.hasOwnProperty(tempstr)){
        return true;
    }
    tempstr = " "+ str;
    if(docObj.hasOwnProperty(tempstr)){
        return true;
    }
    return false;
}

export function FieldValueIsValid(val:any):boolean{
    return (val === "" || val === null || val === undefined) ? false:true;
}
// Simple tries if there is a minor typo or sth.
// key is from docObj, obj is component
// @Review more for my project?
export function MassageKey(key:string,obj:any):string{
    let tempkey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
    if(obj.hasOwnProperty(tempkey)) return tempkey;
    
    let temp2 = tempkey+ 's'; // multiple, does not get wierd plurals
    if(obj.hasOwnProperty(temp2)) return temp2;

    let temp3 = tempkey.slice(0,-1);
    if(obj.hasOwnProperty(temp3)) return temp3;

    // far cry
    if(tempkey.charAt(tempkey.length- 1) == 's'){
        let temp4 = tempkey + 'es';
        if(obj.hasOwnProperty(temp4)) return temp4;
    }
    return '';
}
// Checks if key exists in the parent class.
export function KeyExistsBaseClassObj(comp:any,key:string):boolean{
    let baseClass = Object.getPrototypeOf(comp.constructor);
    let baseClassObj = SModelObjSystem.GetInstance().GetTemplateObj(baseClass);
    if(baseClassObj.hasOwnProperty(key)){
        return true;
    }
    return false;
}

// creates object full of undefined keys, no infesting, stacking wat?
// Keys in baseClass are ignored
export function MakeFlatObject(obj:any, outObj:any,keysObj:any,BaseComponentClass:any = FBaseComponent):void{
    let templateObject = SModelObjSystem.GetInstance().GetTemplateObj(BaseComponentClass);
    Object.keys(obj).forEach(key=>{
        let kk = key as keyof typeof obj;
        if( obj[kk] instanceof BaseComponentClass){
            let asstypescript = obj[kk];

            // check for parent infiniteloop
            if(!(obj instanceof BaseComponentClass)){
                MakeFlatObject(obj[kk],outObj,keysObj); // obj[kk] allowed here?
            }
            else{ // must be FBaseComponent
                if(!( asstypescript === obj.GetParent()) ){
                    MakeFlatObject(asstypescript,outObj,keysObj); // but not here? obj[kk]
                }
            }
        }
        else{
            // ignore baseClass keys
            if(!(templateObject.hasOwnProperty(kk))){
                outObj[kk] = true;
            }
        }
    });
}

// Checks all if key exist in object's parent class.
export function KeyExistsInBaseComp(comp:any,key:string):boolean{
    let baseClass = Object.getPrototypeOf(comp.constructor);
    let baseClassObj = SModelObjSystem.GetInstance().GetTemplateObj(baseClass);
    if(baseClassObj.hasOwnProperty(key)){
        return true;
    }
    return false;
}
// removes all whitespaces in beginning and end.
export function RemoveWhiteSpaces(str:string):string{
    const rgxwhite = /\w.+\w/;
    let matches = str.match(rgxwhite);
    if(matches)
        return matches[0];
    return '';
}

//@todo make this more general. Requires wrapper?
//~ can this made general is this solution rather to my playerobj
// given string, makes object with key string separeted by :
// ex. Tools: obj1, obj2 \n Items: obj4,obj5
// Object{Tools:'obj1,obj2',Items:'obj4,obj5' } where 'string' 
export function GetAsKeydObject(data:string){
    const rgx = /.+/g; // separate string by new line \n
    let found = data.match(rgx);
    if(found == null) return;
    let strArr:string[] = new Array();
    for(let i = 0; i != found.length; ++i){
        let words:string[] = found[i].split(':');
        if(words.length == 2){
            let val = words[1];
            if(val.at(0) === ' '){
                val = val.slice(1);
                strArr.push(words[0],val);
            }
        }
        else{
            // Tools: Obj1, obj2 -> might span over multiple lines in document
            // cases Tools:    // Might have not put anything after :
            if(found[i].indexOf(':')==-1){
                continue;
            }
            let l = strArr.length;
            let idx = l - 1; // last index of multiple words
            if(idx > 0 && l > idx){
                strArr[idx] += found[i];
            }
        }
    }
    let strObj:any = {};
    // should be multiple of two
    for(let i = 0; i < strArr.length; i+=2 ){
        if(strArr[i+1]){
            strObj[strArr[i]] = strArr[i+1];
        }
    }
    return strObj;
}


// ex. from document to the actual object based on key
export function SetIntoObjectByObj(key:string,fromObj:any,toObj:any){
    let kk = key as keyof typeof fromObj;
    if(toObj.hasOwnProperty(key)){
        toObj[key as keyof typeof toObj] = fromObj[kk]; 
    }
    else{   // might be minish typo or 
        let tempkey = MassageKey(key,toObj);
        if(toObj.hasOwnProperty(tempkey)){
            toObj[tempkey as keyof typeof toObj] = fromObj[kk]; 
            
        }
    }
}

// tries to set fromObj toObj values by key. Same key should exist in both objects
// MassageKey tries to fit the key onto both. 
export function SetIntoObjectByArray(key:string,arr:Array<string>,toObj:any){
    if(toObj.hasOwnProperty(key)){
        toObj[key as keyof typeof toObj] = arr;
    }
    else{   // might be minish typo or 
        let tempkey = MassageKey(key,toObj);
        if(toObj.hasOwnProperty(tempkey)){
            toObj[tempkey as keyof typeof toObj] = arr; 
            
        }
    }
}


