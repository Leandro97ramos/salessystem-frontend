

export interface TaxRule {
    id: number;
    geo_location_id: number;
    tax_category_config_det_id: number;
    tax_value_config_id: number;

}


export interface SaleHeader{
    id: number;
    company_id: number;
    seller_user_id: number;
    buyer_user_id: number;
    sale_date: string;
    status_config_det_id: number;
    total_tax: number;
    total_sale: number;
    subtotal: number;
}

export interface SaleDetail{
    id: number;
    sale_id: number;
    product_id: number;
    offer_id?: number;
    quantity: number;
    unit_price: number;
    applied_tax_value: number;
    tax_rate_config_det_id: number;
    tax_amount: number;
    discount_amount: number;
    total: number;

}


export interface  SalePayment {
    id: number;
    sale_id: number;
    payment_method_config_det_id: number;
    amount: number;
    transaction_reference: string;
}

export interface SaleDetailStock {
    id: number;
    sale_detail_id: number;
    item_id: number;
    quantity: number;
}


export interface Offer {
    id: number;
    name: string;
    description: string;
    discount_type_config_det_id: number;
    discount_value: number;
    start_date: string | Date;
    end_date: string | Date;
    is_active: boolean;


}

export interface OfferProduct {

    id: number;
    offer_id: number;
    product_id: number;

}