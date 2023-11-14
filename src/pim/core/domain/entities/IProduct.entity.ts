export type IProduct = {
  id: string;
  name: string;
  description: string;
  category: Category;
  sku: string;
  image: string;
  tags: string[];
  price: number;
  stock: number;
  typeStock: TypeStock;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;
};

export enum Category {
  HOUSEHOLD = 'HOUSEHOLD',
  OFFICE = 'OFFICE',
  ELECTRONICS = 'ELECTRONICS',
  SHOES = 'SHOES',
  ACCESSORIES = 'ACCESSORIES',
  GAMES = 'GAMES'
}

export enum Status {
  PUBLISH = 'PUBLISH',
  SCHEDULED = 'SCHEDULED',
  INACTIVE = 'INACTIVE'
}

export enum TypeStock {
  IN_STOCK = 'IN_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK'
}

export type IProductFilter = Pick<IProduct, 'status' | 'typeStock' | 'category'> & {
  searchValue?: string;
};

export interface IProductStaticByStatus {
  _id: string;
  totalPrice: number;
  totalProduct: number;
}

export interface IProductStaticByStock {
  _id: string;
  totalStock: number;
  totalProduct: number;
}

export type Statistic = Record<TypeStock & Status, IProductStaticByStatus | IProductStaticByStock>;
