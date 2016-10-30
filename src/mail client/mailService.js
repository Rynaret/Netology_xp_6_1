export class MailService{

    constructor() {
    }

    get accounts(){return this._accounts;}
    set accounts(value){this._accounts = value;}

    create(account){
        this.accounts.push(account);
    }
}
