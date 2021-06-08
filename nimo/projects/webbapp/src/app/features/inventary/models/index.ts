export interface IBrand {
  id: number;
  name: string;
}

export interface ICategory {
  id: number;
  name: string;
  description: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  stock: number;
  created: Date;
  mont_enter: number;
  mont_exist: number;

  // brand

  // category
}
