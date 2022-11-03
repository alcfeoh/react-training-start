export interface LicensePlateData {
    _id: string;
    onSale: boolean;
    picture: string;
    title: string;
    price: number;
    year: number;
    state: string;
    description: string;
}


export type Currency = "USD" | "EUR" | "GBP";
