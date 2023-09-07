export interface IProduct {
    // id:number;
    // name: string;
    // price: number;
    // quantity: number;
    // imgURL?: string;
    // categoryID: number;
    // categoryName: string;

    id?:number;
    title?: string;
    description?: string;
    price: number;
    rating?: {count: number, rate?: number};
    image?: string;
    category?: string;

}
