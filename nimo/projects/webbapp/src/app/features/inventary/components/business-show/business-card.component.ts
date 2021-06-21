import { CloudinaryResponse } from 'shared';
import { INegocio } from './../../models/index';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  Input
} from '@angular/core';
import { StoreBusinessService } from '../../containers/business/business.store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { obtainPreviewUrlOrNotFound } from '../../utils';

@Component({
  selector: 'leo-business-card',
  template: `
    <nz-card
      class="card_business_show"
      style="width:300px; margin: 10px 10px;"
      [nzCover]="coverTemplate"
      [nzActions]="[actionSetting, actionEdit]"
      nzHoverable
    >
      <nz-card-meta
        [nzTitle]="negocio.name"
        [nzDescription]="negocio.description"
      ></nz-card-meta>
      <ng-template #coverTemplate>
        <div class="contain_image">
          <img [alt]="negocio.name" [src]="urlImage" />
        </div>
      </ng-template>
      <ng-template #actionSetting>
        <a nz-button (click)="deleteBusiness()">
          <i nz-icon nzType="delete"></i>
        </a>
      </ng-template>
      <ng-template #actionEdit>
        <a nz-button (click)="editBusiness()">
          <i nz-icon nzType="edit"></i>
        </a>
      </ng-template>
    </nz-card>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessCardComponent implements OnInit {
  @Input() negocio!: INegocio;
  constructor(
    private businessService: StoreBusinessService,
    private modalService: NzModalService
  ) {}

  public get urlImage() {
    return obtainPreviewUrlOrNotFound(this.negocio);
  }
  public deleteBusiness(): void {
    this.modalService.confirm({
      nzTitle: 'Eliminar negocio',
      nzContent: '¿Desea eliminar este negocio? \n',
      nzOnOk: () => {
        this.businessService.deleteBusiness(this.negocio);
      }
    });
  }
  public editBusiness() {
    this.businessService.editBusiness(this.negocio);
  }
  ngOnInit(): void {}
}
