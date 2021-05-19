import { Button } from 'primeng/button';

export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: number;
    country?: Country;
    company?: string;
    date?: string;
    status?: string;
    representative?: Representative;
}

export interface Notice {
    data?: string;
    ID?: number;
    Top?: string;
    Notice?: string;
    ReleaseDate?: string;
    Function?: Button;
}

export interface News {
    data?: string;
    ID?: number;
    Top?: string;
    Notice?: string;
    ReleaseDate?: string;
    Function?: Button;
}

export interface Order {
    data?: string;
    ID?: number;
    Top?: string;
    Notice?: string;
    ReleaseDate?: string;
    Function?: Button;
}

export interface Quotation {
    data?: string;
    ID?: number;
    Top?: string;
    Notice?: string;
    ReleaseDate?: string;
    Function?: Button;
}

export interface Dispatch {
    data?: string;
    ID?: number;
    Top?: string;
    Notice?: string;
    ReleaseDate?: string;
    Function?: Button;
}

export interface Cars {
    data?: string;
    ID?: number;
    Top?: string;
    Notice?: string;
    ReleaseDate?: string;
    Function?: Button;
}

export interface Contract {
    data?: string;
    ID?: number;
    Top?: string;
    Notice?: string;
    ReleaseDate?: string;
    Function?: Button;
}

export interface Note {
    data?: string;
    ID?: number;
    Top?: string;
    Notice?: string;
    ReleaseDate?: string;
    Function?: Button;
}