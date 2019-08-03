import express, {Router} from 'express';
import DbConnectivity from './lib/database';
import appUseFunc from './utils/app-use';

class App {
    app='';
    router = new Router();
    constructor () {
        this.app = express ();
        this.initDB();
        appUseFunc(this.app, this.router);
        this.initUserRoutes(this.router);
    }

    initDB = () => {
        new DbConnectivity();
    }

    initUserRoutes =(router) => {
        //fileRoutes(router)
    }

    initAppUse = () => {
        this.app.use()
    }

}

export default new App().app;