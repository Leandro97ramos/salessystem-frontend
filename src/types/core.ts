/*
GeoLocation

id: number
city_name: string
region_country: string
postal_code: string

*/

export interface GeoLocation {
    id: number;
    city_name: string;
    region_country: string;
    postal_code: string;
}


/*
Person

id: number
first_name: string
last_name: string
identification: string
phone?: string
personal_address?: string
*/

export interface Person {
    id: number;
    first_name: string;
    last_name: string;
    identification: string;
    phone?: string;
    personal_address?: string;
}


/*
Company
*/

export interface Company {
    id: number;
    tax_id_number: string; // <-- es unico para cada empresa, refiere a la identificacion fiscal de la empresa
    legal_name: string,
    parent_company_id?: number;
    parent_configuration_det_id?: number;
}
