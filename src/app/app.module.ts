import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductListComponent } from './Components/Order/product-list/product-list.component';
import { OrderMasterComponent } from './Components/Order/order-master/order-master.component';
import { LightBoxDirective } from './Directives/light-box.directive';
import { USDtoEGPPipe } from './Pipes/usdto-egp.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { SpinnerComponent } from './Components/spinner/spinner.component';
import { CartComponent } from './Components/cart/cart.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    ProductListComponent,
    OrderMasterComponent,
    LightBoxDirective,
    USDtoEGPPipe,
    NotFoundComponent,
    UserLoginComponent,
    MainLayoutComponent,
    ProductDetailsComponent,
    AddProductComponent,
    SpinnerComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    BrowserAnimationsModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en', // Set the default language
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
