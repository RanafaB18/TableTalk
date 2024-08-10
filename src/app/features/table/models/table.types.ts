export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  rating: number;
  date_added: Date | string;
}

export type Sort = 'Asc' | 'Desc' | 'Rand';

export interface ApiResponse<T> {
    data: T[];
    total: number;
}

export type RowModel<T> = {
    [Property in keyof T]: unknown;
}

export interface ColumnDefinition<T, V = unknown> {
    field: string;
    headerName?: string;
    valueFormatter?: (params: T) => string;
    valueGetter?: (params: T) => V
}

