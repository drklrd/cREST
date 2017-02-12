import Axios from 'axios';

export default class ApiCall{

    constructor(requestConfig){
        this.requestConfig = requestConfig;
    }

    fire(){

        return Axios(this.requestConfig);

    }

}