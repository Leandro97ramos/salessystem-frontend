
export interface Warehouse {
    id: number;
    company_id: number;
    geo_location_id: number;
    parent_warehouse_id?: number | null;
    parent_configuration_det_id?: number | null;
}

export interface Batch {
    id: number;
    product_id: number;
    company_id: number;
    code: string;
    initial_quantity: number;
    current_quantity: number;
    entry_date: string | Date;
    expiration_date: string | Date;
    unit_cost: number;
}

export interface Stock {

    id: number;
    batch_id: number;
    product_id: number;
    quantity: number;
    location_config_det_id: number;
    current_quantity: number;

}


export interface InventoryTransfer {
    id: number;
    source_warehouse_id: number;
    user_id: number;
    transfer_date: string | Date;
    status_config_det_id: number;
    destination_warehouse_id: number;
    description: string;

}

export interface InventoryTransferDetail{
    id: number;
    inventory_transfer_id: number;
    batch_id: number;
    quantity: number;
}


export interface item {
    id: number;
    product_id: number;
    serial_number: string;
    batch_id: number;
    status_config_det_id: number;

}