export default class User {
    public created: string;
    public firstName: string;
    public lastName: string;
    public username: string;
    public email: string;
    public password: string;
    public generateHash: Function;
    public validatePassword: Function;
}
