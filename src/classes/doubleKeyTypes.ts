export class FDoubleKeyAndTypes{
    Pdfkey:string;
    PlayerKey1:string;
    PlayerKey1Type:string;
    PlayerKey2:string;
    PlayerKey2Type:string;
    bIsRequired:boolean;
    constructor(pdfkey:string,playerkey1:string,playerkey1type:string,playerkey2:string,playerkey2type:string,isRequired:boolean = false){
        this.Pdfkey =pdfkey;
        this.PlayerKey1 = playerkey1;
        this.PlayerKey2 = playerkey2;
        this.PlayerKey1Type = playerkey1type;
        this.PlayerKey2Type = playerkey2type;
        this.bIsRequired = isRequired;
    }    
}