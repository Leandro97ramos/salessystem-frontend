/*AdditionalField */


export interface AdditionalField {
    id: number;
    datasource_config_det_id: number;
    data_type_config_det_id: number;
    name: string;
    description: string;
    attribute?: any;
}


export interface ClassInfo {
    id: number;
    additional_fields_id: number;
    entity_id: number;
    value: string;
}