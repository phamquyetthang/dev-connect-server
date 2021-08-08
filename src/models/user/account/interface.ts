export default interface IUser{
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    position: string;
    permissions: string[],
    createdAt: Date;
}