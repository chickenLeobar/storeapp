import { Observable, of } from 'rxjs';
export type AvalibleModes = 'MONT' | 'UNITY' | 'kilo' | 'LITER';
import { Injectable } from '@angular/core';
const labels: {
  [key in AvalibleModes]?: {
    enter: string;
    exit: string;
    stocKLabel?: string;
    saleLabel: string;
    letterIdentifier: string;
  };
} = {
  MONT: {
    enter: 'Entrada',
    exit: 'Ganancia',
    saleLabel: 'por monto',
    letterIdentifier: 'M'
  },
  UNITY: {
    enter: 'Costo de compra',
    exit: 'Precio de venta',
    stocKLabel: 'Unidades',
    saleLabel: 'por unidades',
    letterIdentifier: 'U'
  },
  kilo: {
    enter: 'Costo de compra (por kilo)',
    exit: 'Precio de venta (por kilo)',
    stocKLabel: 'Kilos',
    saleLabel: 'por kilos',
    letterIdentifier: 'K'
  },
  LITER: {
    enter: 'Costo de compra (por litro)',
    exit: 'Precio de venta (por Litro)',
    stocKLabel: 'Litros',
    saleLabel: 'por libros',
    letterIdentifier: 'L'
  }
};

export type IInterfaz = {
  labels: [string, string];
  stockVisible: boolean;
  labelStock: string;
};

@Injectable({
  providedIn: 'root'
})
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
  public get saleLabel() {
    return labels[this.mode]?.saleLabel;
  }
  public get letterIdentifier(): string {
    return labels[this.mode]?.letterIdentifier || '';
  }
}
