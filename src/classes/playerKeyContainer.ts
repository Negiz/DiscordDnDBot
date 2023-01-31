import { KeyAndTypes } from "../../pdfToObject/baseClasses/keyAndTypes";
import { CKeyContainer } from "../../pdfToObject/baseClasses/keyContainer";
import { FKeySetBase } from "../../pdfToObject/baseClasses/KeySetBase";
import { FDoubleKeyAndTypes } from "./doubleKeyTypes";

// makes array \r\n line breakes.
//@Review should we make this super general, providing separation
// and creating regex by user input?
function StringArrFromStringField(dataStr:string):string[]{
    let strs:string[] = [];
    const rgx = /.+?\r|\n|(.+$)/g;
    let matches  = dataStr.match(rgx);
    if(matches){
        for(let i = 0; i != matches.length; ++i ){
            let str = matches[i].trimEnd();
            strs.push(str);
        }
    }
    return strs;
}



//@Review how does js handle initialization if we would do it in while defining variables
// would reduce writing amount. All keys must be written anyways
export class FDnDKeys extends FKeySetBase{
    Background:KeyAndTypes;
    CharacterName:KeyAndTypes;
    PlayerName:KeyAndTypes;
    Race:KeyAndTypes;
    Alignment:KeyAndTypes;
    PersonalityTraits:KeyAndTypes;
    Equipment:KeyAndTypes;
    Proficiencies:KeyAndTypes;
    FeaturesAndTraits:KeyAndTypes;
    Ideals:KeyAndTypes;
    Flaws:KeyAndTypes;
    Bonds:KeyAndTypes;
    XP:KeyAndTypes;
    AC:KeyAndTypes;
    Initiative:KeyAndTypes;
    Speed:KeyAndTypes;
    ProficiencyBonus:KeyAndTypes;
    HPMax:KeyAndTypes;
    HPCurrent:KeyAndTypes;
    HPTemporary:KeyAndTypes;
    HitdieTotal:KeyAndTypes;
    Hitdie:KeyAndTypes;
    PassivePerception:KeyAndTypes;
    Copper:KeyAndTypes;
    Silver:KeyAndTypes;
    Electrum:KeyAndTypes;
    Gold:KeyAndTypes;
    Platinum:KeyAndTypes;
    Strength:KeyAndTypes;
    Dexterity:KeyAndTypes;
    Constitution:KeyAndTypes;
    Intelligence:KeyAndTypes;
    Wisdom:KeyAndTypes;
    Charisma:KeyAndTypes;
    SavingThrowStrength:KeyAndTypes;
    SavingThrowDexterity:KeyAndTypes;
    SavingThrowConstitution:KeyAndTypes;
    SavingThrowIntelligence:KeyAndTypes;
    SavingThrowWisdom:KeyAndTypes;
    SavingThrowCharisma:KeyAndTypes;
    Acrobatics:KeyAndTypes;
    AnimalHandling:KeyAndTypes;
    Arcana:KeyAndTypes;
    Athletics:KeyAndTypes;
    Deception:KeyAndTypes;
    History:KeyAndTypes;
    Insight:KeyAndTypes;
    Intimidation:KeyAndTypes;
    Investigation:KeyAndTypes;
    Medicine:KeyAndTypes;
    Nature:KeyAndTypes;
    Perception:KeyAndTypes;
    Performance:KeyAndTypes;
    Persuasion:KeyAndTypes;
    Religion:KeyAndTypes;
    SleightOfHand:KeyAndTypes;
    Survival:KeyAndTypes;
    Stealth:KeyAndTypes;
    StrengthModifier:KeyAndTypes;
    DexterityModifier:KeyAndTypes;
    ConstitutionModifier:KeyAndTypes;
    IntelligenceModifier:KeyAndTypes;
    WisdomModifier:KeyAndTypes;
    CharismaModifier:KeyAndTypes;

    constructor(){
        super();
        this.InitiateKeys();
        this.MakeDefaultKeys();
    }

    protected InitiateKeys(){
        // normal keys
        
        //this.Background =    new KeyAndTypes("Background", "string","Background");
        this.CharacterName = new KeyAndTypes("CharacterName","CharacterName", "string",true);
        //this.Race =          new KeyAndTypes("Race", "string","Race");
        //this.Alignment =     new KeyAndTypes("Alignment","Alignment");
        //this.PersonalityTraits = new KeyAndTypes("PersonalityTraits","PersonalityTraits");
        //this.Equipment = new KeyAndTypes("Equipment","Equipment");
        this.Proficiencies = new KeyAndTypes("ProficienciesLang","Proficiencies");
        this.FeaturesAndTraits = new KeyAndTypes("Features and Traits","FeaturesAndTraits",'string',false,StringArrFromStringField);
        //this.Ideals =        new KeyAndTypes("Ideals","Ideals");
        //this.Flaws =         new KeyAndTypes("Flaws","Flaws");
        //this.Bonds =         new KeyAndTypes("Bonds","Bonds");
        this.XP =            new KeyAndTypes("XP", "XP","number");
        this.AC =            new KeyAndTypes("AC", "AC","number",true);
        this.Initiative =    new KeyAndTypes("Initiative", "Initiative","number");
        this.Speed =         new KeyAndTypes("Speed", "Speed","number",true);
        this.ProficiencyBonus =  new KeyAndTypes("ProfBonus", "ProficiencyBonus","number");
        this.HPMax =         new KeyAndTypes("HPMax", "HPMax","number",true);
        this.HPCurrent =     new KeyAndTypes("HPCurrent", "HPCurrent","number");
        this.HPTemporary =   new KeyAndTypes("HPTemp", "HPTemporary","number");
        this.HitdieTotal =   new KeyAndTypes("HDTotal", "HitdieTotal","number");
        this.Hitdie =        new KeyAndTypes("HD", "Hitdie","number");
        this.PassivePerception =     new KeyAndTypes("Passive", "PassivePerception","number");
        this.Copper =        new KeyAndTypes("CP", "Copper","number");
        this.Silver =        new KeyAndTypes("SP", "Silver","number");
        this.Electrum =      new KeyAndTypes("EP", "Electrum","number");
        this.Gold =          new KeyAndTypes("GP", "Gold","number");
        this.Platinum =      new KeyAndTypes("PP", "Platinum","number");
        this.Strength =      new KeyAndTypes("STR", "Strength","number",true);
        this.Dexterity =     new KeyAndTypes("DEX", "Dexterity","number",true);
        this.Constitution =  new KeyAndTypes("CON", "Constitution","number",true);
        this.Intelligence =  new KeyAndTypes("INT", "Intelligence","number",true);
        this.Wisdom =        new KeyAndTypes("WIS", "Wisdom","number",true);
        this.Charisma =      new KeyAndTypes("CHA", "Charisma","number",true);
        this.SavingThrowStrength =       new KeyAndTypes("ST Strength","SavingThrowStrength","number");
        this.SavingThrowDexterity =      new KeyAndTypes("ST Dexterity","SavingThrowDexterity","number");
        this.SavingThrowConstitution =   new KeyAndTypes("ST Constitution","SavingThrowConstitution","number");
        this.SavingThrowIntelligence =   new KeyAndTypes("ST Intelligence","SavingThrowIntelligence","number");
        this.SavingThrowWisdom =         new KeyAndTypes("ST Wisdom","SavingThrowWisdom","number");
        this.SavingThrowCharisma =       new KeyAndTypes("ST Charisma","SavingThrowCharisma","number");
        this.Acrobatics =  new KeyAndTypes("Acrobatics", "Acrobatics","number");
        this.AnimalHandling =  new KeyAndTypes("Animal", "AnimalHandling","number");
        this.Arcana =        new KeyAndTypes("Arcana", "Arcana","number");
        this.Athletics =     new KeyAndTypes("Athletics", "Athletics","number");
        this.Deception =     new KeyAndTypes("Deception", "Deception","number");
        this.History =       new KeyAndTypes("History", "History","number");
        this.Insight =       new KeyAndTypes("Insight", "Insight","number");
        this.Intimidation =  new KeyAndTypes("Intimidation", "Intimidation","number");
        this.Investigation =  new KeyAndTypes("Investigation", "Investigation","number");
        this.Medicine =      new KeyAndTypes("Medicine", "Medicine","number");
        this.Nature =        new KeyAndTypes("Nature", "Nature","number");
        this.Perception =    new KeyAndTypes("Perception", "Perception","number");
        this.Performance =   new KeyAndTypes("Performance", "Performance","number");
        this.Persuasion =    new KeyAndTypes("Persuasion", "Persuasion","number");
        this.Religion =      new KeyAndTypes("Religion", "Religion","number");
        this.SleightOfHand =     new KeyAndTypes("SleightofHand", "SleightOfHand","number");
        this.Survival =      new KeyAndTypes("Survival", "Survival","number");
        this.Stealth =       new KeyAndTypes("Stealth", "Stealth","number");
        this.StrengthModifier =      new KeyAndTypes("STRmod", "StrengthModifier","number");
        this.DexterityModifier =  new KeyAndTypes("DEXmod", "DexterityModifier","number");
        this.ConstitutionModifier =  new KeyAndTypes("CONmod", "ConstitutionModifier","number");
        this.IntelligenceModifier =  new KeyAndTypes("INTmod", "IntelligenceModifier","number");
        this.WisdomModifier =  new KeyAndTypes("WISmod", "WisdomModifier","number");
        this.CharismaModifier = new KeyAndTypes("CHamod", "CharismaModifier","number");
    }
}

export class CPlayerKeyContainer extends CKeyContainer{
    // base class owns the actual object.
    static KeyClass:any = FDnDKeys;
    // value in pdf document if checked
    static bCheckedCheckBox = "Yes"; 
    // first part of the id in pdf document. add number from CheckBoxMapping is the second
    static CheckBoxStr = "Check Box ";
    // key might have two variables, these are exceptions
    DoubleKeyMap:Map<string,FDoubleKeyAndTypes>;
    // what skill map to what primary attribute ex. Athletics -> Strenght
    SkillToPrimaryMap:Map<string,string>;

    // checkbox mappings, can mean proficiency or readied spell ex.
    CheckBoxMapping:Map<string,number>;
    // player key gets checkbox string
    GetCheckBoxKey(playerKey:string):string{
        //console.log(playerKey);
        return CPlayerKeyContainer.CheckBoxStr + this.CheckBoxMapping.get(playerKey);
    }
    GetSkillToPrimary(key:string):string{
        return this.SkillToPrimaryMap.has(key) ?  this.SkillToPrimaryMap.get(key) : "";
    }
    // class that has the keys of  pdf to object mapping 
    constructor(){
        super(CPlayerKeyContainer.KeyClass);
        this.InitDoublekey();
        this.InitSkillToPrimary();
        this.InitCheckBoxMapping();
    }
    InitCheckBoxMapping(){
        let KeysObj = this.GetKeysObj<FDnDKeys>();
        this.CheckBoxMapping = new Map()
        .set(KeysObj.SavingThrowStrength.ObjKey,       11)
        .set(KeysObj.SavingThrowDexterity.ObjKey,      18)
        .set(KeysObj.SavingThrowConstitution.ObjKey,   19)
        .set(KeysObj.SavingThrowIntelligence.ObjKey,   20)
        .set(KeysObj.SavingThrowWisdom.ObjKey,         21)
        .set(KeysObj.SavingThrowCharisma.ObjKey,       22)
        .set(KeysObj.Acrobatics.ObjKey,     23)
        .set(KeysObj.AnimalHandling.ObjKey, 24)
        .set(KeysObj.Arcana.ObjKey,         25)
        .set(KeysObj.Athletics.ObjKey,      26)
        .set(KeysObj.Deception.ObjKey,      27)
        .set(KeysObj.History.ObjKey,        28)
        .set(KeysObj.Insight.ObjKey,        29)
        .set(KeysObj.Intimidation.ObjKey,   30)
        .set(KeysObj.Investigation.ObjKey,  31)
        .set(KeysObj.Medicine.ObjKey,       32)
        .set(KeysObj.Nature.ObjKey,         33)
        .set(KeysObj.Perception.ObjKey,     34)
        .set(KeysObj.Performance.ObjKey,    35)
        .set(KeysObj.Persuasion.ObjKey,     36)
        .set(KeysObj.Religion.ObjKey,       37)
        .set(KeysObj.SleightOfHand.ObjKey,  38)
        .set(KeysObj.Stealth.ObjKey,        39)
        .set(KeysObj.Survival.ObjKey,       40);
    }
    InitSkillToPrimary(){
        let KeysObj = this.GetKeysObj<FDnDKeys>();
        this.SkillToPrimaryMap = new Map()
        // Strength
        .set(KeysObj.StrengthModifier.ObjKey,KeysObj.Strength.ObjKey)
        .set(KeysObj.SavingThrowStrength.ObjKey,KeysObj.Strength.ObjKey)
        .set(KeysObj.Athletics.ObjKey,KeysObj.Strength.ObjKey)
        // Dexterity
        .set(KeysObj.DexterityModifier.ObjKey,KeysObj.Dexterity.ObjKey)
        .set(KeysObj.SavingThrowDexterity.ObjKey,KeysObj.Dexterity.ObjKey)
        .set(KeysObj.Acrobatics.ObjKey,KeysObj.Dexterity.ObjKey)
        .set(KeysObj.Stealth.ObjKey,KeysObj.Dexterity.ObjKey)
        .set(KeysObj.SleightOfHand.ObjKey,KeysObj.Dexterity.ObjKey)
        // Constitution
        .set(KeysObj.ConstitutionModifier.ObjKey,KeysObj.Constitution.ObjKey)
        .set(KeysObj.SavingThrowConstitution.ObjKey,KeysObj.Constitution.ObjKey)
        // Intelligence
        .set(KeysObj.IntelligenceModifier.ObjKey,KeysObj.Intelligence.ObjKey)
        .set(KeysObj.SavingThrowIntelligence.ObjKey,KeysObj.Intelligence.ObjKey)
        .set(KeysObj.Arcana.ObjKey,KeysObj.Intelligence.ObjKey)
        .set(KeysObj.History.ObjKey,KeysObj.Intelligence.ObjKey)
        .set(KeysObj.Investigation.ObjKey,KeysObj.Intelligence.ObjKey)
        .set(KeysObj.Nature.ObjKey,KeysObj.Intelligence.ObjKey)
        .set(KeysObj.Religion.ObjKey,KeysObj.Intelligence.ObjKey)
        // Wisdom
        .set(KeysObj.WisdomModifier.ObjKey,KeysObj.Wisdom.ObjKey)
        .set(KeysObj.SavingThrowWisdom.ObjKey,KeysObj.Wisdom.ObjKey)
        .set(KeysObj.AnimalHandling.ObjKey,KeysObj.Wisdom.ObjKey)
        .set(KeysObj.Insight.ObjKey,KeysObj.Wisdom.ObjKey)
        .set(KeysObj.Medicine.ObjKey,KeysObj.Wisdom.ObjKey)
        .set(KeysObj.Perception.ObjKey,KeysObj.Wisdom.ObjKey)
        .set(KeysObj.Survival.ObjKey,KeysObj.Wisdom.ObjKey)
        // Charisma
        .set(KeysObj.CharismaModifier.ObjKey,KeysObj.Charisma.ObjKey)
        .set(KeysObj.SavingThrowCharisma.ObjKey,KeysObj.Charisma.ObjKey)
        .set(KeysObj.Deception.ObjKey,KeysObj.Charisma.ObjKey)
        .set(KeysObj.Intimidation.ObjKey,KeysObj.Charisma.ObjKey)
        .set(KeysObj.Performance.ObjKey,KeysObj.Charisma.ObjKey)
        .set(KeysObj.Persuasion.ObjKey,KeysObj.Charisma.ObjKey)
        ;
    }
    InitDoublekey():void{
        
        // class level is now the only exception
        this.DoubleKeyMap = new Map()
        .set("ClassLevel", new FDoubleKeyAndTypes("ClassLevel","Class","string","Level","number",true));
        this.InitSkillToPrimary();
    }
    GetDoubleKey(key:string):FDoubleKeyAndTypes|null{
        return this.DoubleKeyMap.get(key);
    }
}