import { FBaseComponent } from "../../pdfToObject/baseClasses/baseComponent";
import { SKeyContainerSystem } from "../../pdfToObject/systems/keyContainerSystem";
import * as utils from "../../pdfToObject/utility/utilityfunctions";
import { Player } from "../classes/player";
import { FEquipment, FItemType, FModifierStats, FPrimaryStats, FProficiencies, FProficiencyInfo, FSavingThrowStats, FSkillStats, FStats } from "../classes/playercomponents";
import { FDnDKeys, CPlayerKeyContainer } from "../classes/playerKeyContainer";
import { CalculateModifierFromValue,CalculateProficiency } from "./calculations";
import { CKeyContainer } from "../../pdfToObject/baseClasses/keyContainer";
import { SetValuesFromPdfToObject } from "../../pdfToObject/utility/setterDefault";

// custom function to finalize player
export function FinalizePlayerObject(docObj: any, PlayerObj: Player, KeyCont: CKeyContainer, BaseComponentClass: any) {
    SetValuesFromPdfToObject(docObj,PlayerObj,KeyCont,BaseComponentClass);
    let KeysObj:FDnDKeys = KeyCont.GetKeysObj<FDnDKeys>();

    // Equipment
    let eqComp = PlayerObj.GetComponent<FEquipment>(FEquipment);
    let val:any = utils.GetFieldValueByStr(docObj,KeysObj.Equipment.Pdfkey);
    if(utils.FieldValueIsValid(val)) FinalizeEquipment(val,eqComp);
    
    // Proficiencies
    let profComp = PlayerObj.GetComponent<FProficiencies>(FProficiencies);
    val = utils.GetFieldValueByStr(docObj,KeysObj.Proficiencies.Pdfkey);
    if(utils.FieldValueIsValid(val)) FinalizeGeneralComps(val,profComp);

    // Spells not yet implemented 
    // let  spelsComp = PlayerObj.GetComponent<FSpells>(FSpells);
    // val = GetFieldValueByStr(docObj,KeysObj.Proficiencies.Pdfkey);
    // if(FieldValueIsValid(val)) FinalizeGeneralComps(val,eqComp);
    // Stats
    FinalizeStats(docObj,PlayerObj);
    
    FinalizeClassAndLvl(docObj,PlayerObj);

    //console.log(PlayerObj.FeaturesAndTraits);
}



// Object{key1: FItemType[], key2: FItemType[]}
function ItemsAndCounts(obj:any){
    let rgxN = /\d+/;
    let otherObj:any = {};
    Object.keys(obj).forEach(key=>{
        let sss:string = obj[key];
        let words = sss.split(',');
        otherObj[key] = new Array();
        for(let el of words){
            let matches = el.match(rgxN);
            if(!matches?.length){
                let tempstr = utils.RemoveWhiteSpaces(el);
                otherObj[key].push(new FItemType(tempstr));
                continue;
            }
            let NumberStr:string = matches[0];
            let idx = el.indexOf(NumberStr);
            let slice = idx + NumberStr.length;
            let tempstr:string;
            if(slice == el.length){ // we are cutting end
                tempstr = el.slice(0,idx);
                tempstr = utils.RemoveWhiteSpaces(tempstr); // if pattern weapon x 20
                // only remove x if there is whitespace, otherwise might be weapon name
                let le =tempstr.length;
                if(tempstr.charAt(le-1)=='x' && tempstr.charAt(le-2)==' '){
                    tempstr = tempstr.slice(0,-1); // take x away
                }
            }
            else{
                tempstr = el.slice(slice);
            }
            tempstr = utils.RemoveWhiteSpaces(tempstr);
            otherObj[key].push(new FItemType(tempstr,parseInt(NumberStr)));
        }
    });
    return otherObj;
}
function FinalizeEquipment(data:string,eq:FEquipment){
    let obj = utils.GetAsKeydObject(data);
    let finalObj = ItemsAndCounts(obj);
    Object.keys(finalObj).forEach(key=>{
        utils.SetIntoObjectByObj(key,finalObj,eq);
    });
}

function FinalizeGeneralComps(data:string,comp:FBaseComponent){
    let obj = utils.GetAsKeydObject(data);
    Object.keys(obj).forEach(key=>{
        let arr:string[] = obj[key].split(',');
        utils.SetIntoObjectByArray(key,arr,comp);
    });
}

function GetIsProficient(docObj:any,checkBoxkey:string):boolean{
    let val = docObj[checkBoxkey][0].value;
    let isProf:string = CPlayerKeyContainer.bCheckedCheckBox;
    if(val == isProf) return true
    return false;
}

function FinalizeNonPrimaryStat<Type extends FBaseComponent>(docObj:any,primary:FPrimaryStats,objRef:Type):void{
    let keyCont = SKeyContainerSystem.GetInstance().GetContainerByClass<CPlayerKeyContainer>(CPlayerKeyContainer);
    Object.keys(objRef).forEach(key=>{
        if(utils.KeyExistsBaseClassObj(objRef,key)) return;

        let kk = key as keyof typeof objRef;
        let skillKey = keyCont.GetSkillToPrimary(key) as keyof typeof primary;
        let profInfo = primary[skillKey] as FProficiencyInfo;
        // here if it is set by player we might want to use that
        let val:number = CalculateModifierFromValue(profInfo.Value);
        let bVal:boolean = GetIsProficient(docObj, keyCont.GetCheckBoxKey(key));
        let refobj = objRef[kk] as FProficiencyInfo;
        refobj.SetValue(val);
        refobj.IsProficient = bVal;
    });
}
//@Review modifiers done here, we might use only value if there are no modifiers to modifierscomp
function FinalizeModifiers(primary:FPrimaryStats,modifier:FModifierStats):void{
    let keyCont = SKeyContainerSystem.GetInstance().GetContainerByClass<CPlayerKeyContainer>(CPlayerKeyContainer);
    Object.keys(modifier).forEach(key=>{
        if(utils.KeyExistsBaseClassObj(modifier,key)) return;

        let kk = key as keyof typeof modifier;
        let objRef = modifier[kk] as FProficiencyInfo;
        let skillKey = keyCont.GetSkillToPrimary(key) as keyof typeof primary;
        let profInfo = primary[skillKey] as FProficiencyInfo;
        let val = CalculateModifierFromValue(profInfo.Value);
        objRef.SetValue(val);
    });
}

function FinalizeStats(docObj:any,playerObj:Player){

    let stats = playerObj.GetComponent<FStats>(FStats);
    let primary = stats.GetComponent<FPrimaryStats>(FPrimaryStats);
    // Savingthrows 
    let saving = stats.GetComponent<FSavingThrowStats>(FSavingThrowStats);
    FinalizeNonPrimaryStat<FSavingThrowStats>(docObj,primary,saving);
    // Skills
    let skill = stats.GetComponent<FSkillStats>(FSkillStats);
    FinalizeNonPrimaryStat<FSkillStats>(docObj,primary,skill);
    // modifier
    let modifier = stats.GetComponent<FModifierStats>(FModifierStats);
    FinalizeModifiers(primary,modifier);
    

}
function FinalizeClassAndLvl(docObj:any,playerObj:Player){
    let keyCont = SKeyContainerSystem.GetInstance().GetContainerByClass<CPlayerKeyContainer>(CPlayerKeyContainer);
    //@todo make strings for double keys, so no random string usage.
    let classLvl:string = 'ClassLevel';
    let classfield = keyCont.GetDoubleKey(classLvl);
    if(classfield){
        let str:string = docObj[classfield.Pdfkey][0].value;
        // get numbers
        const rgxN = /\d+/;
        let matches = str.match(rgxN);
        let classLvl:number = 0;
        if(matches){
            classLvl =  parseInt(matches[0]);
        }
        // Classname, might be in two parts, third one is the level
        let strarr = str.split(' ');
        let className:string = '';
        if(strarr.length == 2){
            className = strarr[0];
        }
        else if(strarr.length == 3){
            className = strarr[0] + strarr[1];
        }
        playerObj.Class = className;
        playerObj.Level = classLvl;
    }

}

