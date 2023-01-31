// gets model object if exists, creates and returns if not
// ensures that only one type of model exists to reduce needless object creation
// singleton class, use SModelObjSystem.GetInstance()
export class SModelObjSystem{
    static Instance:SModelObjSystem;
    TemplateObjsMap:Map<string,object>;
    GetTemplateObj(Class:any):any{
        let className = Class.name;
        if(!this.TemplateObjsMap.has(className)){
            this.TemplateObjsMap.set(Class.name,new Class());
        }
        return this.TemplateObjsMap.get(className);
    }
    private constructor(){
        this.TemplateObjsMap = new Map();
    }
    static GetInstance():SModelObjSystem{
        if(this.Instance == undefined){
            this.Instance = new SModelObjSystem();
        }
        return this.Instance;
    }
}
