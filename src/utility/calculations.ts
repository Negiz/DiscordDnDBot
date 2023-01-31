
export function CalculateModifierFromValue(value:number):number{
    return Math.max(-5,Math.min(10,Math.floor( (value-10)/2 )));
}

export function CalculateProficiency(lvl:number):number {
    return Math.floor(2+(lvl)/4);
}
