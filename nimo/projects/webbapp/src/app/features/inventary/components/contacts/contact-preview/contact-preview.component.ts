import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { IContact, TypeContact } from './../../../models/index';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  ChangeDetectorRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  EventEmitter
} from '@angular/core';
import { isNull, isUndefined, get } from 'lodash';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'leo-contact-preview',
  template: `
    <nz-card
      gdArea="preview"
      style="height: 450px; width: 350px; padding: 10px;"
      fxLayout
      fxLayoutAlign="center start"
      [hidden]="!isValid"
    >
      <div #templatePortalContent></div>
      <nz-space nzAlign="start" nzDirection="vertical">
        <leo-descriptions
          *nzSpaceItem
          style="width: 300px; "
          [contact]="contact"
        ></leo-descriptions>

        <!-- buttons -->
        <div *nzSpaceItem>
          <div
            fxFlex="row"
            fxLayoutAlign="space-between"
            class="w-100"
            style="width: 250px !important;"
          >
            <button nz-button nzType="primary">
              ventas
            </button>
            <nz-space>
              <button
                (click)="deleteContact()"
                *nzSpaceItem
                nz-button
                nzType="primary"
                nzDanger
              >
                <i nz-icon nzType="delete" nzTheme="outline"></i>
              </button>
              <button
                *nzSpaceItem
                nz-button
                nzType="primary"
                (click)="onEdit.emit(contact)"
              >
                <i nz-icon nzType="edit" nzTheme="outline"></i>
              </button>
            </nz-space>
          </div>
        </div>
      </nz-space>
    </nz-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ContactPreviewComponent implements OnInit, AfterViewInit {
  @Input() contact!: IContact | undefined | null;

  @Output() onEdit = new EventEmitter<unknown>();
  @Output() onDelete = new EventEmitter<unknown>();

  public isContact(source: NzSafeAny): source is IContact {
    return source != null && source != undefined && 'name' in source;
  }

  public deleteContact() {
    this.modalService.confirm({
      nzTitle: 'Eliminar contacto',
      nzContent: '¿Esta seguro que desea realizar esta acción?',
      nzOnOk: () => {
        this.onDelete.emit(this.contact);
      }
    });
  }
  public get isValid() {
    return this.isContact(this.contact);
  }
  constructor(
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService
  ) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {}
}
