import { ProductListModel } from './productList.model';

export interface FactorModel {
  id?: number;
  created_at: string;
  items: ProductListModel;
  totalPrice: number;
}
