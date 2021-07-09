import { AvalibleModes } from './../libs/HandleCountMode';
import { CloudinaryResponse } from 'shared';
export interface IBrand {
  id?: number;
  name: string;
  business?: number;
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
  image: CloudinaryResponse | {};
  description: string;
  direction: string;
  social_reason: string;
  meta: Meta;
  last_open?: Date;
  date_updated?: Date;
  date_created?: Date;
  user: number;
}

export type TypeContact = 'PROVIDER' | 'CLIENT';
export type TypeDocument = 'DNI' | 'RUC';

export interface IContact {
  id: number;
  name: string;
  type_document?: TypeDocument;
  type_contact?: TypeContact;
  notes?: string;
  business: number;
  email?: string;
  num_document?: string;
  direction?: string;
  create?: Date;
  phone?: string;
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
  images?: CloudinaryResponse[];
  business?: number;
}

export interface IDetailSale {
  producto: number;
  cantidad: number;
}

// model for sale
// export interface ISale {
//   id?: number;
//   fecha_venta?: Date;
//   monto_total?: number;
//   cliente?: number;
//   serie_documento?: string;
//   tipo_documento?: string;
//   vendedor?: number;
//   meta?: {
//     business?: number;
//   };
//   details?: Partial<IDetailSale>[];

// }

export interface ISaleShow {
  id_venta: number;
  fecha_venta: Date;
  monto_total: string;
  
  client_name?: string;
  client_id?: number;
  itemscount: number;
  business: number;
  seller: string;
  seller_id: number;
}
