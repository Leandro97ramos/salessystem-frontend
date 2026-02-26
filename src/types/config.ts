/**
 * 1. CONFIGURACIÓN TIPO
 * Define las grandes categorías (ej: "SISTEMA", "VENTAS", "LOGISTICA").
 */
export interface ConfiguracionTipo {
    configuracion_tipo_id: number;
    codigo: string; // Único
    nombre: string;
    estado: string;
    activo: boolean;
}

/**
 * 2. CONFIGURACIÓN CABECERA
 * Agrupadores específicos dentro de un tipo (ej: "METODOS_PAGO", "ESTADOS_PEDIDO").
 */
export interface ConfiguracionCab {
    configuracion_cab_id: number;
    configuracion_tipo_id: number; // Relación con Tipo
    codigo: string; // Único
    nombre: string;
    parametro?: string; // Metadata adicional
    estado: string;
    activo: boolean;
}

/**
 * 3. CONFIGURACIÓN DETALLE
 * Los valores finales que verás en los Dropdowns (ej: "Efectivo", "Tarjeta", "Pendiente").
 */
export interface ConfiguracionDet {
    configuracion_det_id: number;
    configuracion_cab_id: number; // Relación con Cabecera
    padre_configuracion_det_id?: number; // Permite jerarquías (ej: Ciudad -> Localidad)
    codigo: string; // Único
    nombre: string;
    parametro?: string; // Aquí podrías guardar el % de un impuesto o un color hexadecimal
    estado: string;
    activo: boolean;
}