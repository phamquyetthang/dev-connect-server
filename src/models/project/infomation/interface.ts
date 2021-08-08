export default interface IInfoProject{
    name: string;
    description: string;
    members: IMember[];
    units: IUnit[];
}

interface IMember{
    id: string;
    name: string;
    permission: string;
}

interface IUnit{
    id: string;
    name: string;
    description: string;
}