// Used when object(inside of object) has multiple keys but only one set by pdf
export class IValueSetter{
    SetValue(value:any):void{};
}

export class FBaseComponent extends Object{
    // set if component owns this. Otherwise not set
    Parent:FBaseComponent | null;
    ComponentMap:Map<string,FBaseComponent>; //className, object ref

    constructor(owner:FBaseComponent|null = null ){
        super();
        this.ComponentMap = new Map();
        this.Parent = owner;
    }
    GiveParent(owner:any = null){
        if(owner instanceof FBaseComponent)
            this.Parent = owner;
        else
            this.Parent = null;
    }
    GetParent(){
        return this.Parent;
    }
    // delete keys that are not saved
    PrepareForSave(){
        delete this.ComponentMap;
        delete this.Parent;
    }
    AddComponent<Type extends FBaseComponent>(Obj:Type,parent:FBaseComponent):Type{
        Obj.GiveParent(parent);
        this.ComponentMap.set(Obj.constructor.name,Obj);
        return Obj;
    }
    GetComponent<Type extends FBaseComponent>(Class:any):Type{
        return this.ComponentMap.get(Class.name) as Type;
    }
    // Gets first instance of component recursively if some child owns this type of component
    SearchComponent<Type extends FBaseComponent>(Class:any):Type{
        if(this.ComponentMap.has(Class.name)) 
            return this.ComponentMap.get(Class.name) as Type;
        for(const [key,el] of this.ComponentMap){
            return el.SearchComponent<Type>(Class);
        }
        return null;
    }
}