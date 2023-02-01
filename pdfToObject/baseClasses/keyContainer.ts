import { KeyAndTypes } from "./keyAndTypes";
import { FKeySetBase } from "./KeySetBase";
/*  required for GetObjectFromDocument?

*/
export class CKeyContainer{
    // Object's key, KeyAndTypes
    SimpleKeyMap:Map<string,KeyAndTypes>;
    // all required keys collected into an array.
    ValidationArray:KeyAndTypes[];
    // datastructure that holds all mapped keys from pdf to obj
    // all key types should be type of KeyAndTypes, used to create SimpleKeyMap in InitiateMaps()
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
    constructor(keysObjectClass:any){
        this.KeysObject = new keysObjectClass();
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
    }
}

