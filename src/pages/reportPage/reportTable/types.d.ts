export type Column =
  | "id"
  | "city"
  | "state"
  | "type"
  | "price"
  | "avgPrice"
  | "houses";

export interface Columns {
  key: Column;
  dataIndex: Column;
  [key: string]: any;
}

export interface DataSource {
  id: string | number;
  city: string;
  state: string;
  type: string;
  price: number;
}

export interface GroupedDataSource extends DataSource {
  avgPrice: number;
  houses: number;
}

export type DataSourceKeys = keyof DataSource;
export type GroupedDataSourceKeys = keyof GroupedDataSource;
