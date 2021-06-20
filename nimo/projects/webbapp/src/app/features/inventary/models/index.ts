import { AvalibleModes } from './../libs/HandleCountMode';
import { CloudinaryResponse } from 'shared';
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

export interface Meta {
  [key: string]: unknown;
}

export interface INegocio {
  id: number;
  name: string;
  image: CloudinaryResponse;
  description: string;
  direction: string;
  social_reason: string;
  meta: Meta;
  last_open?: Date;
  date_updated?: Date;
  date_created?: Date;
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

export interface IDetailSale {
  producto: number;
  cantidad: number;
}

// model for sale
export interface ISale {
  id?: number;
  fecha_venta?: Date;
  monto_total?: number;
  cliente?: number;
  serie_documento?: string;
  tipo_documento?: string;
  vendedor?: number;
  meta?: {
    business?: number;
  };
  details?: Partial<IDetailSale>[];
}
