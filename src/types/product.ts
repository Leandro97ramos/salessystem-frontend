

export interface Product {

    id: number;
    sku: string;
    code?: string;
    name: string;
    description?: string;
    is_serialized: boolean;
    applies_tax: boolean;
    length?: number;
    width?: number;
    height?: number;
    measure_value?: number;
    unit_measure_config_det_id?: number;
    tax_category_config_det_id?: number;
    base_price: number;
}

