import { Component } from '@angular/core';
import { MenuDishesService } from '../menu-dishes.service';
import { json } from 'stream/consumers';
import { Observable } from 'rxjs';
import { ok } from 'assert';
@Component({
  selector: 'app-post-order-data',
  templateUrl: './post-order-data.component.html',
  styleUrl: './post-order-data.component.css'
})
export class PostOrderDataComponent 
{
 // OrderedItems: any =[ { "123": 2, "124": 2 },{"123":1}]; // Example: Dish IDs with their quantities
 OrderedItems:any=[];
Dishes :any[]= [];
FilteredKeys:any = Object.keys(this.OrderedItems);

  

   OrderCompleted :boolean = false;



   getQuantity(id: any, orderIndex: number)
    {
     
     // Check if the order exists and if the dish ID exists in that order
     if (this.OrderedItems[orderIndex] && this.OrderedItems[orderIndex][id]) {
       return this.OrderedItems[orderIndex][id]; // Return the quantity for the specific dish ID
     }
     
     // If not found, return 0 (or handle it as per your logic)
     return 0;
   }
   
OrderStatus:any='';
Count:Number =0;
OrderStatuses: { [key: string]: string } = {};  // To store statuses keyed by orderID


fetchOrderStatus(orderId: string) {
  this.dishes.getOrderStatus(orderId).subscribe((response: string) =>
     {
    this.OrderStatuses[orderId] = response;  // Store the status keyed by order ID
    console.log(`Order Status for ${orderId}:`, response);
    
  }, error => {
    console.error('Error fetching order status:', error);
    this.OrderStatuses[orderId] = 'Error fetching status';  // Handle errors gracefully
  });
}


  getTotalPrice(orderIndex: number): number 
  {
    console.log("total price all");
  let totalPrice: number = 0;

  const orderItems = this.OrderedItems[orderIndex].orderdata;

  // Iterate over each dish in the orderdata
  orderItems.forEach((item: any) => {
    totalPrice += item.price * item.quantity;
  });

  // Return the calculated total price
  return totalPrice;
}




  Orderedmenu:any[]=[];

   

constructor(private dishes:MenuDishesService)
{

  this.dishes.getOrderedItems().subscribe(
    (response) => {
      this.OrderedItems = response;
       // Fetch all order statuses once when the component initializes
  this.OrderedItems.forEach((order:any) => {
    this.fetchOrderStatus(order.orderID);
  });
      console.log("the response of get",this.OrderedItems);
     
     // this.processOrderedMenu();
    },
    (error) => {
      console.error("Error fetching ordered items:", error);
    }
  );

  this.dishes.getDishes().then((dishes) => {
    this.Dishes = dishes; // Assign the resolved value
    console.log("Dishes assigned:", this.Dishes);
}).catch((error) => {
    console.error("Error fetching dishes:", error);
});
 // this.dishes.emptyCart();
//this.fetchOrderStatus('order_PC42CH1adMCpZM');
}

processOrderedMenu(): void 
 {
  this.Orderedmenu = this.OrderedItems.map((order: { [key: string]: number }, index: number) => {
    // Create an array to hold the dishes in the order
    let dishesInOrder = Object.keys(order).map((dishId: string) => {
        let dish = this.Dishes.find(item => item.id === dishId); 
        
        // If the dish exists, return it; otherwise, return null
        return dish ? dish : null; 
    }).filter(item => item !== null); // Filter out null values

    // Log the ordered menu for debugging
    
    // Return the desired structure
    return {
        orderIndex: index, // The index of the order
        dishes: dishesInOrder // The array of dish objects found
    };
});

console.log("the data for traverse",this.Orderedmenu);

}

}
