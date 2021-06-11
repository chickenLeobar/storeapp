import { Observable, of } from 'rxjs';
export type AvalibleModes = 'MONT' | 'UNITY' | 'kilo' | 'LITER';
import { Injectable } from '@angular/core';
const labels: {
  [key in AvalibleModes]?: {
    enter: string;
    exit: string;
    stocKLabel?: string;
  };
} = {
  MONT: {
    enter: 'Entrada',
    exit: 'Ganancia'
  },
  UNITY: {
    enter: 'Costo de compra',
    exit: 'Precio de venta',
    stocKLabel: 'Unidades'
  },
  kilo: {
    enter: 'Costo de compra (por kilo)',
    exit: 'Precio de venta (por kilo)',
    stocKLabel: 'Kilos'
  },
  LITER: {
    enter: 'Costo de compra (por litro)',
    exit: 'Precio de venta (por Litro)',
    stocKLabel: 'Litros'
  }
};

export type IInterfaz = {
  labels: [string, string];
  stockVisible: boolean;
  labelStock: string;
};


@Injectable()
export class HandleCountMode {
  private mode: AvalibleModes = 'MONT';
  constructor() {
    // this.mode = mode;
  }

  //changue mode
  public changueMode(mode: AvalibleModes) {
    this.mode = mode;
  }
  public get stockVisible() {
    return this.mode != 'MONT';
  }
  private get labelStock(): string {
    let label = labels[this.mode];
    return label?.stocKLabel || 'null';
  }

  public get labels(): [string, string] {
    let label = labels[this.mode];
    if (label) {
      return [label?.enter, label?.exit];
    }
    return ['', ''];
  }
  public get value(): Observable<IInterfaz> {
    return of({
      labelStock: this.labelStock,
      labels: this.labels,
      stockVisible: this.stockVisible
    });
  }
}
