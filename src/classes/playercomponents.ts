import { Component } from "../../node_modules/discord.js/typings/index";
import { FBaseComponent,IValueSetter } from "../../pdfToObject/baseClasses/baseComponent";



export class FProficiencyInfo extends IValueSetter{
    Value:number;
    IsProficient:boolean;
    BonusProficiency:number;
    // not modifier as in modifier thingy
    ModifierValue:number;// negative or positive buffs calculated
    constructor(val:number =0,isProf:boolean = false,bonusProf:number =0, modVal:number = 0){
        super();
        this.Value = val;
        this.IsProficient = isProf;
        this.BonusProficiency = bonusProf;
        this.ModifierValue = modVal;
    }
    GetValueFull():number{
      return this.Value + this.ModifierValue;
    }
    SetValue(value: any): void {
        this.Value = value;
    }
    SetAllValues(val:number,){

    }
}

//@Review these are basically just data, do we need these to be FBaseComponent?
// these don't seem to benefit from that.
// ~ getting components are easier though.
export class FPrimaryStats extends FBaseComponent{
    Strength:FProficiencyInfo; 
    Dexterity:FProficiencyInfo; 
    Constitution:FProficiencyInfo; 
    Intelligence:FProficiencyInfo; 
    Wisdom:FProficiencyInfo; 
    Charisma:FProficiencyInfo;
    constructor(owner:FBaseComponent|null = null ){
        super(owner);
        this.Strength = new FProficiencyInfo();
        this.Dexterity = new FProficiencyInfo();
        this.Constitution= new FProficiencyInfo();
        this.Intelligence = new FProficiencyInfo();
        this.Wisdom = new FProficiencyInfo();
        this.Charisma = new FProficiencyInfo();
    }
}
//@Review should these be just numbers? or even exists, since these can be calculated.
//~ iff there is no bonuses on modifiers, is there?
export class FModifierStats extends FBaseComponent{
    StrengthModifier:FProficiencyInfo; 
    DexterityModifier:FProficiencyInfo; 
    ConstitutionModifier:FProficiencyInfo; 
    IntelligenceModifier:FProficiencyInfo; 
    WisdomModifier:FProficiencyInfo; 
    CharismaModifier:FProficiencyInfo;
    constructor(owner:FBaseComponent|null = null ){
        super(owner);
        this.StrengthModifier = new FProficiencyInfo();
        this.DexterityModifier = new FProficiencyInfo();
        this.IntelligenceModifier = new FProficiencyInfo();
        this.ConstitutionModifier = new FProficiencyInfo();
        this.WisdomModifier = new FProficiencyInfo();
        this.CharismaModifier = new FProficiencyInfo();
    }
}
export class FSavingThrowStats extends FBaseComponent{
    SavingThrowStrength:FProficiencyInfo;
    SavingThrowDexterity:FProficiencyInfo;
    SavingThrowConstitution:FProficiencyInfo;
    SavingThrowIntelligence:FProficiencyInfo;
    SavingThrowWisdom:FProficiencyInfo;
    SavingThrowCharisma:FProficiencyInfo;
    constructor(owner:FBaseComponent|null = null ){
        super(owner);
        this.SavingThrowStrength = new FProficiencyInfo();
        this.SavingThrowDexterity = new FProficiencyInfo();
        this.SavingThrowConstitution= new FProficiencyInfo();
        this.SavingThrowIntelligence = new FProficiencyInfo();
        this.SavingThrowWisdom = new FProficiencyInfo();
        this.SavingThrowCharisma = new FProficiencyInfo();
    }
}
export class FSkillStats extends FBaseComponent{

    Acrobatics:FProficiencyInfo;
    AnimalHandling:FProficiencyInfo;
    Arcana:FProficiencyInfo;
    Athletics:FProficiencyInfo;
    Deception:FProficiencyInfo;
    History:FProficiencyInfo;
    Insight:FProficiencyInfo;
    Intimidation:FProficiencyInfo;
    Investigation:FProficiencyInfo;
    Medicine:FProficiencyInfo;
    Nature:FProficiencyInfo;
    Perception:FProficiencyInfo;
    Performance:FProficiencyInfo;
    Persuasion:FProficiencyInfo;
    Religion:FProficiencyInfo;
    SleightOfHand:FProficiencyInfo;
    Survival:FProficiencyInfo;
    constructor(owner:FBaseComponent|null = null ){
        super(owner);
        this.Acrobatics = new FProficiencyInfo();
        this.AnimalHandling = new FProficiencyInfo();
        this.Arcana= new FProficiencyInfo();
        this.Athletics = new FProficiencyInfo();
        this.Deception = new FProficiencyInfo();
        this.History = new FProficiencyInfo();
        this.Insight = new FProficiencyInfo();
        this.Intimidation = new FProficiencyInfo();
        this.Investigation = new FProficiencyInfo();
        this.Medicine = new FProficiencyInfo();
        this.Nature = new FProficiencyInfo();
        this.Perception = new FProficiencyInfo();
        this.Performance = new FProficiencyInfo();
        this.Persuasion = new FProficiencyInfo();
        this.Religion = new FProficiencyInfo();
        this.SleightOfHand = new FProficiencyInfo();
        this.Survival = new FProficiencyInfo();
    }
}

export class FStats extends FBaseComponent{
    PrimaryStats:FPrimaryStats; 
    ModifierStats:FModifierStats;
    SavingThrowStats:FSavingThrowStats;
    SkillStats:FSkillStats;

    constructor(owner:FBaseComponent|null = null ){
        super(owner);
        this.PrimaryStats = this.AddComponent(new FPrimaryStats(),this);
        this.ModifierStats = this.AddComponent(new FModifierStats(),this);
        this.SavingThrowStats = this.AddComponent(new FSavingThrowStats(),this);
        this.SkillStats = this.AddComponent(new FSkillStats(),this);
    }
    GetPrimaryStat(key: keyof FPrimaryStats,bfullstat:boolean=true):number{
        let anny:any = this.PrimaryStats[key];
        return bfullstat ? anny.GetValueFull():anny.Value;
    }
    GetModifierStat(key: keyof FModifierStats,bfullstat:boolean=true):number{
        let anny:any = this.ModifierStats[key];
        return bfullstat ? anny.GetValueFull():anny.Value;
    }
    GetSavingThrowStat(key: keyof FSavingThrowStats,bfullstat:boolean=true):number{
        let anny:any = this.SavingThrowStats[key];
        return bfullstat ?anny.GetValueFull():anny.Value;
    }
    GetSkillStat(key: keyof FSkillStats,bfullstat:boolean=true):number{
        let anny:any = this.SkillStats[key];
        return bfullstat ? anny.GetValueFull():anny.Value;
    }

    GetValue(key:string):any{
        // object key, this way is to do it, "as" is a form of casting
        let obj:FProficiencyInfo = (this[key as keyof this] as FProficiencyInfo);
        if(obj){
        return obj.GetValueFull();
        }
        else{
        //@todo error checking?
        console.log("Key not found stats:",key)
        }
        return 0;
    }
}
export class FProficiencies extends FBaseComponent{
    Languages:string[] = [];
    Weapons:string[] = [];
    Armors:string[] = [];
    Tools:string[] = [];
    Bonuses = {}; //@todo this better
}

export class FSpells extends FBaseComponent{
    // static SlotsAmount = 10;
    // Slots = new Array(this.SlotsAmount).fill(0);
    // CantripNames =[];
    // SpellNames = [];
    // GetUsagesInSpellSlot(i){
    //   return (i>=0 && i<= this.Slots.length-1) ? this.Slots[i] : 0;
    // }
    // HasCantrip(cantripName){
    //   return this.CantripNames.find(el=> el == cantripName) ? true: false;
    // }
    // HasSpell(spellName){
    //   return this.Spells.find(el=> el == spellName) ? true: false;
    // }
}
export class FCoinbag extends FBaseComponent{
    Copper:number;
    Silver:number;
    Electrum:number;
    Gold:number;
    Platinum:number;
}

export class FItemType{
    Name:string;
    Count:number;
    constructor(name:string,count:number=1){
        this.Name = name;
        this.Count = count;
    }
}

export class FEquipment extends FBaseComponent{
    Coinbag:FCoinbag;
    Ammo:FItemType[] = [];
    Weapons:FItemType[] = [];
    Tools:FItemType[] = [];
    Other:FItemType[] = [];

    constructor(){
        super();
        this.Coinbag = this.AddComponent<FCoinbag>(new FCoinbag(),this);
    }


    AddWeapon(name:string, count:number = 1){

        // if(this.HasWeapon(name)){
        //   this.Weapons[name] += count;
        // }
        // else{
        //   this.weaponName[weaponName] += count;
        // }
    }
    RemoveWeapon(name:string, count:number = 1){
        // if(this.HasWeapon(weaponName)){
        //   this.Weapons[weaponName] -= count;
        // }
        // else{
        //   this.weaponName[weaponName] -= count;
        // }
    }
    GetWeapons(){
        return this.Weapons;
    }
    HasWeapon(name:string){
        if(this.hasOwnProperty(name)){
        return true;
        }
        else{
        return false; // have some message?
        }
    }
    HasTools(name:string){
        if(this.hasOwnProperty(name)){
        return true;
        }
        else{
        return false; // message?
        }
    }
    GetTools(){
        return this.Tools;
    }
    // if can really afford to
    CanAfford(coins:FCoinbag){
        //@todo
    }
    Buy(coins:FCoinbag){
        // var savedCoins =  Object.create(this.CoinBag);
        // Object.keys(cash).forEach(key=>{
        //   this.CoinBag[key] += cash[key];
        // }); 
    }
    Sell(coins:FCoinbag){
        // var savedCoins =  Object.create(this.CoinBag);
        // Object.keys(cash).forEach(key=>{
        //   savedCoins[key] -= cash[key];
        // });
        // this.CanAfford(savedCoins);
    }
    AddAmmo(type:string,count:number){
        // if(this.Ammo[ammotype]){
        //   this.Ammo[ammotype] += amount;
        // }
    }
    SubtractAmmo(type:string,count:number){
        // if(this.Ammo[ammotype]){
        //   this.Ammo[ammotype] -= amount;
        // }
    }

}

// some keys have two values, we want to serate those.
// This class exists for consistency
export class FDoubleKeyd{

}