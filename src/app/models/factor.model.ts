import { ProductListModel } from './productList.model';

export interface FactorModel {
  userId: number;
  name : string;
  id?: string;
  created_at: string;
  items: ProductListModel;
  totalPrice: number;
}
