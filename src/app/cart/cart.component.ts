import { Component } from '@angular/core';
import { MenuDishesService } from '../menu-dishes.service';
import { MatDialog } from '@angular/material/dialog';
import { PaymentmodalComponent } from '../paymentmodal/paymentmodal.component';
import {  MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  Dishes:any[]=[];
  currentCart: { [key: string]: number }; // Declare currentCart as an object
  selectedItemscart:any[]=[];
  totalprice:any=0;
  totalitems:any=0;

  predefinedAmount: number = 500; // Example predefined amount
  tableNumber: string | null = null;
  SessionCode:Number=0;



  constructor(private dishesservice:MenuDishesService,private dialog:MatDialog)
  {
  

    this.currentCart = this.dishesservice.getCart(); // Get the cart as an object
    this.currentCart = this.dishesservice.getCart(); // Get the cart as an object
    this.SessionCode = this.dishesservice.SessionCode;
   
    
   
  }
 


  openPaymentModal(): void 
  {
    const dialogConfig = new MatDialogConfig(); // Create an instance of MatDialogConfig
    dialogConfig.disableClose = true; // Prevent closing on backdrop click
    dialogConfig.autoFocus = true; // Optional: focus the first input
    dialogConfig.data = { amount: this.totalprice }; // Pass data to the dialog

    const dialogRef = this.dialog.open(PaymentmodalComponent, dialogConfig); // Pass the config

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Payment details:", result); // Log the payment details if available
      }
    });
  }


  getCount(dishId: string): number 
  {
    return this.currentCart[dishId] || 0; // Return 0 if not found
  }
  

  isCartEmpty(): boolean 
  {
    return Object.keys(this.currentCart).length === 0;
  }
  


ngOnInit()
{
  this.tableNumber = this.dishesservice.getTableNumber();
  this.dishesservice.getDishes().then((dishes) => {
    this.Dishes = dishes; 
    this.selectedItemscart = Object.keys(this.currentCart).map(id => this.Dishes.find(dish => dish.dishId === parseInt(id, 10)));

    this.calculateTotalPrice();
    this.calculateCartItems();
    console.log("Dishes assigned:", this.Dishes);


  }).catch((error) => {
    console.error("Error fetching dishes:", error);
  });


  



setTimeout(() => {
  

  if (this.tableNumber === null || this.tableNumber === "" || this.tableNumber === undefined)
    {
    debugger
      alert("Scan again from cart");
  
  
     }
}, 2);

}


increment(dishId: any)
 {
  this.dishesservice.increment(dishId);
  this.currentCart = this.dishesservice.getCart(); // Refresh currentCart after adding
  this.calculateTotalPrice();

}

// Method to decrement dish quantity in cart
decrement(dishId: any)
 {
  this.dishesservice.decrement(dishId);
  this.currentCart = this.dishesservice.getCart(); // Refresh currentCart after adding
  this.selectedItemscart = Object.keys(this.currentCart).map(id => 
    this.Dishes.find(dish => dish.dishId === parseInt(id, 10))
  );
    this.calculateTotalPrice();


}
calculateTotalPrice() 
{
  
  
  this.totalprice = 0;
  for (const dishId in this.currentCart)
     {
    const count = this.currentCart[dishId];
    const dish = this.Dishes.find(d => d.dishId === parseInt(dishId));
    if (dish) 
      {
      this.totalprice += Number(dish.price) * count;
    }
  }
}

calculateCartItems()
{
this.totalitems=0;
console.log(Object.keys(this.currentCart).length);

}

removeFromCart(dishId:any)
{


const del = this.dishesservice.removeFromCart(dishId);
console.log(del);

this.currentCart = this.dishesservice.getCart(); // Refresh currentCart after adding

this.selectedItemscart = Object.keys(this.currentCart).map(id =>this.Dishes.find(dish => dish.dishId === parseInt(id, 10)));
this.calculateCartItems();
this.calculateTotalPrice();
this.calculateTotalPrice();




}


}
