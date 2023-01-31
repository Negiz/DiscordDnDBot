// defines rules how we fetch and set the keys for object
export class KeyAndTypes{  
    Pdfkey:string;      // key in pdf
    Pdftype:string;     // what type we want the pdfkey as (i.e type in our object)
    ObjKey:string;      // key for object
    bRequired:boolean;  // required, validation fails if key does not exist or invalid value
    //provide custom function to set the value. Ex. if long strings converted to arrays of strings.
    SetterFunction:Function; 
    constructor(pdfkey:string,playerkey:string,pdftype:string = 'string',required:boolean=false,setterFunction:Function = null)
    {
        // key in the pdf document
        this.Pdfkey = pdfkey;
        // we parse the pdf value to this type.
        this.Pdftype = pdftype;
        this.ObjKey = playerkey
        this.bRequired= required;
        this.SetterFunction = setterFunction;
    }
    // defaulted value string = '', number = 0;
    getDefaultValue():string|number{
        return this.Pdftype == 'number' ? 0 : '';
    }
    // for easier creation
    static MakeFieldStr(key:string,bIsRequired = false){
        return new KeyAndTypes(key,key,'string',bIsRequired);
    }
    // for easier creation
    static MakeFieldNumber(key:string,bIsRequired = false){
        return new KeyAndTypes(key,key,'number',bIsRequired);
    }
}
