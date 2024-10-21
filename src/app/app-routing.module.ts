import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MenuDetailsComponent } from './menu-details/menu-details.component';
import { CartComponent } from './cart/cart.component';
const routes: Routes = [
{path:'',component:HomepageComponent},
{path:'menu-details',component:MenuDetailsComponent},
{path:'Cart',component:CartComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
