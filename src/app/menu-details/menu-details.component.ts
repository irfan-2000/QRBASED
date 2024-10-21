import { Component } from '@angular/core';
import { MenuDishesService } from '../menu-dishes.service';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrl: './menu-details.component.css'
})
export class MenuDetailsComponent {

  menuItems:any[]=[];
  chunkedMenuItems: any[] = [];
  SelectedmenuItems:any[]=[];
  Dishes:any[]=[];
  currentCart: { [key: string]: number }; // Declare currentCart as an object
  tableNumber: string | null = null;



  ngOnInit() 
  {
    this.Dishes = this.dishesservice.getDishes();
    this.selectedmenu('Pizza'); // Initialize with default selection to load cards

   
    this.tableNumber = this.dishesservice.getTableNumber();
    
    if (this.tableNumber === null || this.tableNumber === "" || this.tableNumber === undefined)
   {
      alert("Scan again");
    }
   


  }

  selectedmenu(menuName: string) 
  {
    console.log('Click detected!');
    console.log("Selected menu--:",menuName);

    
    this.SelectedmenuItems= this.Dishes.filter(dish =>dish.Category === menuName );

    console.log("Selected dishes:",this.SelectedmenuItems);
    

  }


  addToCart(dishId: string) 
  {
    console.log("the dishid is",dishId);
    this.dishesservice.addToCart(dishId);
    this.currentCart = this.dishesservice.getCart(); // Refresh currentCart after adding

  }

  // Method to increment dish quantity in cart
  increment(dishId: string) {
    this.dishesservice.increment(dishId);
    this.currentCart = this.dishesservice.getCart(); // Refresh currentCart after adding

  }

  // Method to decrement dish quantity in cart
  decrement(dishId: string)
   {
    this.dishesservice.decrement(dishId);
    this.currentCart = this.dishesservice.getCart(); // Refresh currentCart after adding

  }

  getCount(dishId: string): number 
  {
    return this.currentCart[dishId] || 0; // Return 0 if not found
  }
  

constructor(private dishesservice:MenuDishesService,private router: Router,private route:ActivatedRoute)
{
  this.Dishes = this.dishesservice.getDishes();
  this.currentCart = this.dishesservice.getCart(); // Get the cart as an object
this.menuItems = this.dishesservice.getmenus();
this.chunkedMenuItems = this.chunkArray(this.menuItems, 4);

}

chunkArray(arr: any[], chunkSize: number): any[] 
{
console.log(arr);    
  let result = [];
  for (let i = 0; i < arr.length; i += chunkSize)
     {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}



Viewcart()
{
  
  this.router.navigate(['./Cart'],{queryParams:{tableNumber:this.tableNumber}});


}


}
