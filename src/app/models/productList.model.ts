import { ProductModel } from './product.model';

export interface ProductListModel {
  [key: number]: ProductModel[];
}
