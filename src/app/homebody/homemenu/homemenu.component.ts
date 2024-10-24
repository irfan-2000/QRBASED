import { Component } from '@angular/core';
import { MenuDishesService } from '../../menu-dishes.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
@Component({
  selector: 'app-homemenu',
  templateUrl: './homemenu.component.html',
  styleUrl: './homemenu.component.css'
})
export class HomemenuComponent 
{
  menuItems:any[]=[];
  tableNumber: string | null = null;

  SelectedmenuItems:any[]=[];
  chunkedMenuItems: any[] = [];
  Dishes:any[]=[];
  currentCart: { [key: string]: number }; // Declare currentCart as an object
  selectmenuOnhome:any='pizza';


  ngOnInit() 
  {   
    
    this.tableNumber = this.dishesservice.getTableNumber();
    
    if (this.tableNumber === null || this.tableNumber === "" || this.tableNumber === undefined)
   {
      alert("Scan again");
    }
    
   

  }


  getCount(dishId: string): number 
  {
    return this.currentCart[dishId] || 0; // Return 0 if not found
  }
 // SelectedmenuItems:any[]=this.Dishes.filter(dish =>dish.Category === 'Pizza' );
  selectedmenu(menuName: string) 
  {
    console.log('Click detected!');
    console.log("Selected menu--:",menuName);

    this.selectmenuOnhome=menuName;

    this.SelectedmenuItems= this.Dishes.filter(dish =>dish.Menuname === menuName );

    console.log("Selected dishes:",this.SelectedmenuItems);
    debugger

  }
  
  count: number = 0;

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




  constructor(private dishesservice:MenuDishesService,private router: Router,private route:ActivatedRoute) 
  {
   this.chunkedMenuItems = this.chunkArray(this.menuItems, 4);
   this.dishesservice.getDishes().then((dishes) => {
    this.Dishes = dishes; // Assign the resolved value
    console.log("Dishes assigned:", this.Dishes);
}).catch((error) => {
    console.error("Error fetching dishes:", error);
});   
this.currentCart = this.dishesservice.getCart();

  this.dishesservice.getmenus().then((menus) => {
    this.menuItems = menus; // Assign the resolved value
    console.log("Menu items assigned:", this.menuItems);
  }).catch((error) => {
    console.log("Error fetching menus:", error);
  });
  
  }
  // Function to chunk the array into smaller arrays of 4
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

  Viewmore()
      {
        

      this.router.navigate(['./menu-details'],{queryParams:{tableNumber:this.tableNumber}});
      }


}
