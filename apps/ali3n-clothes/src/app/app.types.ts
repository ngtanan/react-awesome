export interface ICategory {
  id: number;
  name: string;
  imageUrl: string;
}

export interface IProduct {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export interface ICartItem extends IProduct {
  quantity: number;
}
