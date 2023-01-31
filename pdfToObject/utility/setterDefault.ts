import * as utils from "./utilityfunctions";
import { FBaseComponent, IValueSetter } from "../baseClasses/baseComponent";
import { CKeyContainer } from "../baseClasses/keyContainer";
import { SModelObjSystem } from "../systems/modelObjSystem";

// Default method for setting values
// ignores keys in BaseComponentClass, sets only child class
// @Review what if object is not BaseCompClass?
// ~ this is forcing somesort of basecompclass
// @todo possibly null basecompclass and allow object iterated over
// even if not BaseCompClass ?
// ~ not general enough
// ~ up to user then if causes infinite loop
export function SetValuesFromPdfToObject(docObj: any, Obj: any, KeyCont:CKeyContainer, BaseComponentClass:any = FBaseComponent,ValueSetterClass:any = IValueSetter):void {
    let baseCompModel = SModelObjSystem.GetInstance().GetTemplateObj(BaseComponentClass);
    Object.keys(Obj).forEach(key => {
        let kk = key as keyof typeof Obj;
        // current object is of BaseComponentClass and current key exists in baseComponent -> skip, not a valid field
        if(Obj instanceof BaseComponentClass && baseCompModel.hasOwnProperty(kk)){
            return; // all keys in baseClass not valid fields
        }
        // key is of BaseComponentClass and BaseComponent has not same key
        // second condition prevents parent->child->parent... infinite loop
        if(Obj[kk] instanceof BaseComponentClass && !baseCompModel.hasOwnProperty(kk)){
            SetValuesFromPdfToObject(docObj,Obj[kk],KeyCont,BaseComponentClass);
            return;
        }
        //@todo maybe check if object, but not array
        // SetValues...

        let field = KeyCont.GetMappedKeyField(key);
        //@Review should we cause error?
        // some keys in the object might be filled later and does not require keymap
        // UserId in class Player -> filled by discord. 
        if(field === undefined) return;
        let val:any;
        let bFieldExists = false;
        // field keycontainer has field
        if(field){
            bFieldExists = utils.FieldExistsInDocument(docObj,field.Pdfkey);
            if(bFieldExists){
                val = utils.GetFieldValueByStr(docObj, field.Pdfkey);
            }
        }
        else{ // use object's key to try to find.
            bFieldExists = utils.FieldExistsInDocument(docObj,key)
            if(bFieldExists){
                val = utils.GetFieldValueByStr(docObj,key)
            }
        }
        let bValidFieldValue = utils.FieldValueIsValid(val);
        // type change from string
        if(field && bValidFieldValue && field.Pdftype === 'number'){
            val = parseInt(val);
        }

        // set default value if key really exists
        if(bFieldExists && !bValidFieldValue){
            //@Review should it be undefined? or defaulted?
            val = field.getDefaultValue();
        }
        //@Review can this be done with types better
        //~ no good answers found
        if(Obj[kk] instanceof ValueSetterClass){
            Obj[kk].SetValue(val);
        }
        else if(field.SetterFunction != null){            
            Obj[kk] = field.SetterFunction(val);
        }
        else{
            Obj[kk] = val;
        }

    });
}
