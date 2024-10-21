import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomesectionComponent } from './homebody/welcomesection/welcomesection.component';
import { HomemenuComponent } from './homebody/homemenu/homemenu.component';
import { CommonModule } from '@angular/common';
import { MenuDetailsComponent } from './menu-details/menu-details.component';
import { CartComponent } from './cart/cart.component';
import { PaymentmodalComponent } from './paymentmodal/paymentmodal.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { PostOrderDataComponent } from './post-order-data/post-order-data.component'; // Import HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    FooterComponent,WelcomesectionComponent,HomemenuComponent, MenuDetailsComponent, CartComponent, PaymentmodalComponent, PostOrderDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,CommonModule,  MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,FormsModule,HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
