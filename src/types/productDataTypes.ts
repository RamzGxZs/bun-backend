export interface ProductDataType {
  id?: string;
  name: string;
  price: number;
  qty: number | null | undefined;
  category: string;
  barcode: string;
}
