import { AvalibleModes } from './../libs/HandleCountMode';
export interface IBrand {
  id?: number;
  name: string;
}

export interface ICategory {
  id?: number;
  name: string;
  description: string;
  business?: number;
}

export interface INegocio {
  id: number;
  nombre: string;
  decripcion: string;
  imagen: string;
  direction: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  stock?: number;
  created: Date;
  mont_enter: number;
  mont_exist: number;
  method_cont: AvalibleModes;
  brand?: number;
  category: number;
  images?: [];
  // brand
  // category
}
