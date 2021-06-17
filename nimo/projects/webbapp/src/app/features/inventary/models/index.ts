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
/**
 * {
   "vendedor":1,
	 "bussiness" : 1 ,
   "details":[
      {
         "producto":78,
         "cantidad":220
      },
		  {
         "producto":79,
         "cantidad": 300
      }
   ]
}
 */
