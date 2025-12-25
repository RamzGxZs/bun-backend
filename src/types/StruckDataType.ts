export type StruckStatus = "debt" | "paid";

export interface StruckItem {
  id?: string;
  name: string;
  price: number;
  qty: number | null;
}

export interface StruckDataType {
  id?: string;
  date?: string | Date;
  items: StruckItem[];
  totalPurcashes: number;
  status: StruckStatus;
  pay: number;
  return: number;
}
