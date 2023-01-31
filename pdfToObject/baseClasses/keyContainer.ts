import { KeyAndTypes } from "./keyAndTypes";
import { FKeySetBase } from "./KeySetBase";
// base class for all KeyContainers
export class CKeyContainer{
    // Object's key, KeyAndTypes
    SimpleKeyMap:Map<string,KeyAndTypes>;
    ValidationArray:KeyAndTypes[];
    // put the key object here.
    KeysObject:any;
    GetKeysObj<Type>():Type{
        return this.KeysObject as Type;
    }
    GetMappedKeyField(key:string):KeyAndTypes{
        return this.SimpleKeyMap.get(key); 
    }
    GetPdfKey(key:string):string{
        let kk:KeyAndTypes = this.SimpleKeyMap.get(key);
        return kk.Pdfkey;
    }
    constructor(Class:any){
        this.KeysObject = new Class();
        this.InitiateMaps();

    }
    protected InitiateMaps():void{
        this.SimpleKeyMap = new Map();
        this.ValidationArray = new Array();
        let kObj = this.KeysObject as FKeySetBase;
        Object.keys(kObj).forEach(key=>{
            let kk = key as keyof typeof kObj;
            if(kObj[kk] instanceof KeyAndTypes){
                let keyobj:KeyAndTypes = kObj.GetField(key);
                this.SimpleKeyMap.set( keyobj.ObjKey, keyobj);
                if(keyobj.bRequired){
                    this.ValidationArray.push(keyobj);
                }
            }
        });
        //console.log('simplekeymap:',this.SimpleKeyMap);
    }
}

