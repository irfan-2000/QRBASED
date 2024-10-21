import { Component } from '@angular/core';
import { MenuDishesService } from '../menu-dishes.service';
import { json } from 'stream/consumers';
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
   



  getStatus()
  {
    return "preparing";
  }


  getTotalPrice(orderIndex: number): number {
  let totalPrice: number = 0;

  // Get the dish IDs (keys) from the OrderedItems array for the specified order
  let keys: string[] = Object.keys(this.OrderedItems[orderIndex]);

  // Loop through the keys (dish IDs)
  keys.forEach((key: string) => {
    // Find the dish from the dishes list based on the id (key)
    const dish = this.Dishes.find((dish: { id: string; }) => dish.id === key);

    if (dish) {
      // Multiply the dish price by the quantity for this dish and add to total price
      totalPrice += dish.Price * this.getQuantity(key, orderIndex);
    }
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
      console.log("the response of get",this.OrderedItems);
      
     // this.processOrderedMenu();
    },
    (error) => {
      console.error("Error fetching ordered items:", error);
    }
  );

  this.Dishes = this.dishes.getDishes();


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
