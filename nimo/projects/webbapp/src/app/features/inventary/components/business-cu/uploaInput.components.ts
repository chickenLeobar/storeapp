import { take } from 'rxjs/operators';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { of } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import {
  CloudinaryService,
  CloudinaryResponse as ICloudinaryResponse
} from 'shared';

@Component({
  selector: 'le-upload-input',
  template: `
    <!-- Upload image  -->
    <nz-upload
      class="avatar-uploader"
      nzAction="null"
      nzName="avatar"
      nzListType="picture-card"
      [nzShowUploadList]="false"
      [nzCustomRequest]="customRequest"
    >
      <ng-container *ngIf="!imageUrl">
        <i
          class="upload-icon"
          nz-icon
          [nzType]="loading ? 'loading' : 'plus'"
        ></i>
        <div class="ant-upload-text">Upload</div>
      </ng-container>
      <img *ngIf="imageUrl" [src]="imageUrl" style="width: 100%" />
    </nz-upload>
    <!-- Upload image  -->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadInputComponent implements OnInit {
  loading = false;
  @Input() imageUrl?: string;
  public fileImage!: File;
  @Output() payloadUploadEvent = new EventEmitter<{
    errors: string[];
    file: File | null;
  }>();
  constructor(
    private cloudinaryService: CloudinaryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
  get type(): string {
    return this.type || 'text';
  }
  public customRequest = (info: NzSafeAny) => {
    const errors: string[] = [];
    // el formato de validacion debe serapararse en un archivo de configuracion
    const isJpgOrPng =
      info.file.type === 'image/jpeg' || info.file.type === 'image/png';
    if (!isJpgOrPng) {
      errors.push('Este tipo de archivo no esta permitido');
    }
    this.getBase64(info.file, image => {
      const imagetest = new Image();
      imagetest.onload = () => {
        // validations image
        imagetest.width;
        if (imagetest.width <= 400) {
          errors.push('Esta image es muy pequeña');
        }
        if (info.size / 1024 / 1024 > 5) {
          errors.push('Excedio las 5mb por archivo');
        }
        if (errors.length == 0) {
          this.imageUrl = image;
          this.fileImage = info.file;
          this.cdr.markForCheck();
          this.payloadUploadEvent.emit({
            errors: errors,
            file: this.fileImage
          });
        }
      };
      imagetest.src = URL.createObjectURL(info.file);
    });
    // launch errors
    if (errors.length > 0) {
      this.payloadUploadEvent.emit({
        errors: errors,
        file: null
      });
    }
    const sub = of(null).subscribe();
    return sub;
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }
}
