export default class ParamsBuilder{
    constructor(keys,values){
        this.paramsArray = {
            keys:keys,
            values:values
        };
    }

    build(){
        var params = {};

        this.paramsArray.keys.forEach((key,index)=>{
            params[key] = this.paramsArray.values[index];
        })

        return params;

    }
}