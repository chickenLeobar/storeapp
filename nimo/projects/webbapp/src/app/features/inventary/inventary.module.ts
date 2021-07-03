import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DisplaySaleComponent } from './components/display-sale/display-sale.component';
import { HandleBrandComponent } from './components/handle-brand/handle-brand.component';
import { ItemBrandComponent } from './components/handle-brand/item-brand.component';
import {
  CreateCategorieComponent,
  HandleCategoriesComponent
} from './components/handle-categories/handle-categories.component';
import { HandleProductComponent } from './components/handle-product/handle-product.component';
import { ItemSaleComponent } from './components/sale-products/item-sale.component';
import { SaleProductsComponent } from './components/sale-products/sale-products.component';
import { ProductComponent } from './components/sale-show-products/product.component';
import { SaleShowProductsComponent } from './components/sale-show-products/sale-show-products.component';
import { InventaryComponent } from './containers/inventary/inventary.component';
import { SaleComponent } from './containers/sale/sale.component';
import effects from './effects';
import { InventaryRoutingModule } from './inventary-routing.module';
import * as fromInventary from './reducers';
import services from './services';
import { UI_MODULES } from './ui.module';
import { CloudinaryMeModule } from 'shared';
import { environment } from '../../../environments/environment';
import { BusinessComponent } from './containers/business/business.component';
import { BusinessCuComponent } from './components/business-cu/business-cu.component';
import { UploadInputComponent } from './components/business-cu/uploaInput.components';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';
import { BusinessShowComponent } from './components/business-show/business-show.component';
import { BusinessCardComponent } from './components/business-show/business-card.component';
import { BaseComponent } from './containers/base/base.component';
import { ContactsComponent } from './containers/contacts/contacts.component';
import { ItemContactComponent } from './components/contacts/item-contact/item-contact.component';
import { HandleContactComponent } from './components/contacts/handle-contact/handle-contact.component';
import { ContactPreviewComponent } from './components/contacts/contact-preview/contact-preview.component';
import { SearchComponent } from './components/contacts/search/search.component';
import { MenuContactComponent } from './containers/contacts/menu-contact.component';
import { DescriptionsComponent } from './components/contacts/contact-preview/descriptions.component';
import { ErrorInterceptor } from '../../core/interceptors/error.interceptor';
// add params to url
import { AddParamsInterceptor } from './services/add-params.interceptor';

// APP_INITIALIZER
import { NegocioService } from './services/business.service';
import { SalesComponent } from './containers/sales/sales.component';
@NgModule({
  declarations: [
    // fields
    UploadInputComponent,
    InventaryComponent,
    HandleBrandComponent,
    HandleCategoriesComponent,
    ItemBrandComponent,
    CreateCategorieComponent,
    HandleProductComponent,
    SaleComponent,
    SaleProductsComponent,
    SaleShowProductsComponent,
    ProductComponent,
    ItemSaleComponent,
    DisplaySaleComponent,
    BusinessComponent,
    BusinessCuComponent,
    BusinessShowComponent,
    BusinessCardComponent,
    BaseComponent,
    ContactsComponent,
    ItemContactComponent,
    HandleContactComponent,
    ContactPreviewComponent,
    SearchComponent,
    MenuContactComponent,
    DescriptionsComponent,
    SalesComponent
  ],
  imports: [
    CommonModule,
    InventaryRoutingModule,
    HttpClientModule,
    UI_MODULES,
    FormsModule,
    FormlyModule.forRoot({}),
    FormlyNgZorroAntdModule,
    CloudinaryMeModule.forRoot({
      apiKey: '827568399999768',
      uploadPreset: 'ml_default',
      url: environment.apiUrl.concat('api/cloudinary'),
      cloudName: 'wellnesspro'
    }),
    ReactiveFormsModule,
    StoreModule.forFeature(fromInventary.featureKey, fromInventary.reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [
    ...services,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AddParamsInterceptor, multi: true }
  ]
})
export class InventaryModule {
  constructor(private negocioService: NegocioService) {
    this.negocioService.prepareBusiness();
  }
}
