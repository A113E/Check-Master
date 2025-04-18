export interface Product {
  id: number;                // Identificador único del producto (número)
  title: string;             // Título del producto (texto)
  description: string;       // Descripción detallada del producto (texto)
  status?: 'pendiente' | 'aprobado' | 'rechazado';  // Estado del producto (pendiente, aprobado o rechazado)
  createdAt: Date;           // Fecha de creación del producto (tipo Date)
}
