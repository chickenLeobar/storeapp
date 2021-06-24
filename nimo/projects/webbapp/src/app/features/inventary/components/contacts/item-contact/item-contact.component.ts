import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

import { IContact } from '../../../models';

@Component({
  selector: 'leo-item-contact',
  template: `
    <nz-list-item class="item_contact">
      <nz-list-item-meta
        nzDescription="{{ contact.create | date: 'shortDate' }}"
      >
        <nz-list-item-meta-title>
          <p nz-typography>
            {{ contact.name }}
          </p>
        </nz-list-item-meta-title>
      </nz-list-item-meta>
      <ul nz-list-item-actions>
        <nz-list-item-action>
          <nz-space nzDirection="vertical" nzAlign="end">
            <span nz-typography *nzSpaceItem>
              {{ contact.phone || '' }}
            </span>
            <span nz-typography *nzSpaceItem>
              {{ contact.email || '' }}
            </span>
          </nz-space>
        </nz-list-item-action>
      </ul>
    </nz-list-item>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemContactComponent implements OnInit {
  @Input() contact!: IContact;

  @Output() onSelected = new EventEmitter<IContact>();

  constructor() {}

  ngOnInit(): void {}

  @HostListener('click', ['$event'])
  onClickCard() {
    this.onSelected.emit(this.contact);
  }
}
