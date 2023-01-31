import { FBaseComponent } from "../baseClasses/baseComponent";
import { SModelObjSystem } from "../systems/modelObjSystem";


export function ObjectFromJson(jsonFile:string,Obj:any,basecl:any = FBaseComponent):void{
    const fs = require('fs');
    let dataObj:any = JSON.parse(fs.readFileSync(jsonFile));
    let baseComp = SModelObjSystem.GetInstance().GetTemplateObj(basecl);
    Iterate(dataObj,Obj,baseComp);
}

// json file, object where the data is saved
function Iterate(dataObj:any,Obj:any,baseComp:any):void{
    Object.keys(Obj).forEach(key=>{
        if(baseComp.hasOwnProperty(key)) return;
        let kk = key as keyof typeof Obj;
        let kkd = key as keyof typeof dataObj;
        if(typeof(Obj[kk]) == 'object'&& !Array.isArray(Obj[kk]) ){
            //console.log(kkd);
            Iterate(dataObj[kkd],Obj[kk],baseComp);
            return;
        }
        else if(Array.isArray(Obj[kk]) && Array.isArray(dataObj[kkd]) ){
            for(let el of dataObj[kkd]){
                Obj[kk].push(el);
            }
        }
        //console.log(kkd,':',dataObj[kkd]);
        Obj[kk] = dataObj[kkd];
    });
}



