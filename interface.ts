interface IUser {
    id: number | null,
    email: string | null,
    preferredName: string | null
}

interface IUserState {
    user: IUser | null;
    loading: boolean;
    error: string | null;
}

interface IPurchaseItem {
    businessId: string,
    createdAt: string | null,
    description: string,
    id: string,
    name: string,
    price: number,
    updatedAt: null,
    business(options: any): void;
}