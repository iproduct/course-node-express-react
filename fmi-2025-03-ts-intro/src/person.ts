import { Identifiable } from "./common-types";

export interface Person extends Identifiable {
    firstName: string;
    lastName: string;
    email: string;
    contact?: Contact
}

export interface Contact {
    country: string;
    city?: string;
    address?: string;
    phone?: string;
}