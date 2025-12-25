
interface StruckItem {
  productId: string,
  name: string,
  price: number
  qty: number
}

export interface StruckDataType {
  id: string,
  createdAt: Date,
  items: StruckItem[],
}