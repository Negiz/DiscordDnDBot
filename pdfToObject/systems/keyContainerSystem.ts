import { CKeyContainer } from "../baseClasses/keyContainer";

// holds all keyContainers by class. KeyContainers are only datatypes
// that are not modified after creation -> only one required
// singleton use SKeyContainerSystem.GetInstance()
export class SKeyContainerSystem{
    private static Instance:SKeyContainerSystem;

    private Map:Map<string,CKeyContainer>;
    // Type for casting (linting purposes)
    GetContainerByClass<Type>(Class:any):Type{
        let className:string = Class.name;
        if(this.Map.has(className)){
            return (this.Map.get(className) as Type);
        }
        this.Map.set(className,new Class());
        return (this.Map.get(className) as Type);
    }
    private constructor(){
        this.Map = new Map();
    }
    static GetInstance():SKeyContainerSystem{
        if(this.Instance){
            return this.Instance;
        }
        this.Instance = new SKeyContainerSystem();
        return this.Instance;
    }
}