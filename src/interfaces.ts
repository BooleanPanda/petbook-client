export interface IUser {
    name: string,
    surname: string,
    login: string,
    password: string,
    email: string,
    phone: string,
    pets: IPet[],
    avatar: string,
    tokens: Array<any>,
    _id: string
};

export interface IPet {
    name: string,
    species: string,
    onwer: any,
    _id: string
};