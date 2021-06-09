import { IBrand } from './../../models/index';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'leo-item-brand',
  template: `
    <li nz-list-item style="width: 500px;">
      <!-- actions -->
      <ul nz-list-item-actions>
        <nz-list-item-action>
          <button
            nz-button
            nzType="primary"
            (click)="deleteBrand(brand)"
            nzDanger
          >
            <i nz-icon nzType="delete" nzTheme="outline"></i>
          </button>
        </nz-list-item-action>
      </ul>
      <p
        [nzEditable]="true"
        (nzContentChange)="onEdit($event)"
        nz-typography
        [nzContent]="brand.name"
      ></p>
    </li>
  `,
  styles: []
})
export class ItemBrandComponent implements OnInit {
  @Input() brand!: IBrand;

  @Output() eventItem = new EventEmitter<{
    event: 'EDIT' | 'DELETE';
    payload: IBrand;
  }>();

  constructor(private modalService: NzModalService) {}

  ngOnInit(): void {}
  public deleteBrand(brand: IBrand) {
    this.modalService.confirm({
      nzTitle: 'ELiminar Marca',
      nzOkText: 'Si, eliminar',
      nzOnOk: () => {
        this.eventItem.emit({ event: 'DELETE', payload: brand });
      }
    });
  }
  public onEdit(name: string) {
    this.eventItem.emit({
      event: 'EDIT',
      payload: {
        name: name,
        id: this.brand.id
      }
    });
  }
}
