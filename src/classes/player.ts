import { FBaseComponent } from "../../pdfToObject/baseClasses/baseComponent";
import {FEquipment,FCoinbag,FProficiencies,FSpells,FStats,FItemType} from "./playercomponents";

export class Player extends FBaseComponent{
  UserId:string;         // ONLY Discord
  PlayerName:string;     // discord name, exists also in pdf
  CharacterName:string;
  Class:string;
  Level:number;
  Race:string;
  Alignment:string;
  XP:number;

  ProficiencyBonus:number;
  AC:number;
  Initiative:number;
  Speed:number;
  HPMax:number;
  HPCurrent:number;
  HPTemporary:number;
  Hitdie:number;
  HitdieTotal:number;
  PassivePerception:number;
  FeaturesAndTraits:string[] =[];
  PersonalityTraits:string;
  Ideals:string;
  Bonds:string;
  Flaws:string;

  Stats:FStats; 
  Equipment:FEquipment; 
  Proficiencies:FProficiencies; 
  Spells:FSpells;
  
 
  constructor(){
    super();
    this.Stats = this.AddComponent<FStats>(new FStats(),this);
    this.Equipment = this.AddComponent<FEquipment>(new FEquipment(),this); 
    this.Proficiencies = this.AddComponent<FProficiencies>(new FProficiencies(),this); 
    this.Spells = this.AddComponent<FSpells>(new FSpells(),this); ;
  }
  // GetComponentByName(className:string):object{
  //   return (this.ComponentMap.get(className));
    
  // }
  // @todo possible resistances ----> damagetypes ?
  TakeDamage(damage:number){
    let val = damage - this.HPTemporary;
    if(val <=0){
      this.HPTemporary = Math.abs(val);
      return this.HPCurrent;
    }
    else{
      this.HPCurrent -= val;
      return this.HPCurrent;
    }
  }
  Heal(hp:number){
    this.HPCurrent = Math.min( this.HPMax,hp+this.HPCurrent);
    return this.HPCurrent;
  }
  TemporaryHitpoints(hp:number){
    this.HPTemporary += hp;
  }
  GetSpells():FSpells{
    return this.Spells;
  }
  GetStats():FStats{
    return this.Stats;
  }
  GetEquipment():FEquipment{
    return this.Equipment;
  }
  GetProficiencies(){
    return this.Proficiencies;
  }
  GetCoins():FCoinbag{
    return this.GetEquipment().Coinbag;
  }
  GetWeapons():FItemType[]{
    return this.GetEquipment().Weapons;
  }
  GetProficiencyScore(){
    return this.CalcProficiency(this.Level);
  }
  GetBonusProficiency(skillName:string){
    //calculate if there is bonus proficiencies.
  }
  CalcProficiency(lvl:number){ // debugging purposes
    return Math.floor(2+(lvl)/4);
  }
  GetModifierScore(name:string){

  }

  // we want the type info, this is unefficient. Damn reinterpret cast would be nice here.
  FinishCreation(){
    // AssignCoins(this,this.Equipment);
    // this.AssignProficiency();
    // this.AssignStats();
    
    //this.Spells = Object.assign(new Spells(),this.Spells);
  }
  GetName(){
    return this.CharacterName;
  }
  //@todo purkkaa
  // AssignProficiency(playerobj,profobj){
  //   this.Proficiencies = Object.assign(new Proficiencies(),this.Proficiencies);
  // }
  // AssignStats(){
  //   Object.keys(FStatsAll).forEach(key=>{
  //     if(key in this){
  //       this.Stats[key] = this[key];
  //     }
  //     delete this[key];
  //   });
  //   Object.keys(FStatsAll).forEach(key=>{
  
  //     if(isNaN(this.Stats[key])){ // trusted that player has inputted right score
  //       var skillkey = FStatSkillMapping.GetSkillStat(key);
  //       //@todo this is ultra purkka FIX
  //       const rgxsaving = /[Ss]aving/;
  //       const rgxmodifier = /[mM]odifier/
  //       var isSaving  = key.match(rgxsaving);
  //       var isModifier = key.match(rgxmodifier);
  //       var mod = 0;
  //       if(skillkey && isSaving){
  //         mod = this.GetModifierScore(skillkey);
  //         mod += this.GetProfScoreIfProf(key,FProfientType.Saving);
  //         this.Stats[key] = mod;
  //       }else if(isModifier){
  //         //@todo ultra purkka
  //         const rgx = /[\w]+(?=[mM]odifier)/;
  //         mod = this.GetModifierScore(key.match(rgx));
  //         this.Stats[key] = mod;
  
  //       }else if(skillkey){ // type is skill, since it nothing else succesded
  //         mod = this.GetModifierScore(skillkey);
  //         mod += this.GetProfScoreIfProf(key,FProfientType.Skills);
  //         this.Stats[key] = mod;
  
  //       }
  //       else{
  //         console.log("Couldnt set value for key: ",key);
  //       }
  //     }
  //   });
  // }
}



// data processing.
// function  AssignCoins(playerobj,eqobj){
//   //@todo purkkaa
//   let cb  = new CoinBag();
//   //console.log(eqobj);
//   Object.keys(cb).forEach(key=>{
//     cb[key] =  playerobj[key];
//     delete playerobj[key]; // might cause problem?
//   });
//   eqobj.CoinBag = cb;
// }

module.exports = {
  Stats: FStats,FProficiencies,FSpells,FEquipment,Player
}

//console.log(pl.GetProficiencies().ProficiencyExist(FProfientType.Saving));



//pl = Object.create(Player.prototype,Object.getOwnPropertyDescriptors(obj));


// for(key of Object.getOwnPropertyDescriptors(pl)){
//   console.log(key);
// }

//desc = Object.getOwnPropertyDescriptors(pl);
//console.log(desc.CharacterName);
//pl= obj;
//console.log(Player.prototype);
//console.log(Object.getOwnPropertyDescriptors(obj).Player.value);
// if(pl instanceof Player){
//   console.log("IS A PLAYER");
//   //console.log("Is type of player");
//   //console.log(pl);
// }
//console.log(obj);