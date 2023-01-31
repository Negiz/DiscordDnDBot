import { KeyAndTypes } from "./keyAndTypes";
export class FKeySetBase{
    // call this after initiatekeys
    protected MakeDefaultKeys(){
        Object.keys(this).forEach(key=>{
            let kk = key as keyof (typeof this);
            if(this[kk] == undefined){
                this.ForceStupidTypeScript(this,key);
            }
        });
    }
    ForceStupidTypeScript(obj:any,key:any){
        obj[key] = new KeyAndTypes(key,key);
    }
    GetField(key:string):KeyAndTypes{
        return this[key as keyof this] as KeyAndTypes;
    }
}
