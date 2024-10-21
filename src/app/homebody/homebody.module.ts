import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomesectionComponent } from './welcomesection/welcomesection.component';
import { HomemenuComponent } from './homemenu/homemenu.component';
import { MenuDishesService } from '../menu-dishes.service';

@NgModule({
  declarations: [
    WelcomesectionComponent,
    HomemenuComponent,MenuDishesService
  ],
  imports: [
    CommonModule
  ]
})
export class HomebodyModule { }
