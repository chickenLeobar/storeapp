import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config, CONFIG_CLOUDINARY } from './internals';
import { CloudinaryService } from './upload-cloudinary.service';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [CloudinaryService]
})
export class CloudinaryMeModule {
  static forRoot(config: Config): ModuleWithProviders<CloudinaryMeModule> {
    return {
      ngModule: CloudinaryMeModule,
      providers: [
        {
          provide: CONFIG_CLOUDINARY,
          useValue: config
        }
      ]
    };
  }
}
