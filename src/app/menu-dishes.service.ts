import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Session } from 'node:inspector';
@Injectable({
  providedIn: 'root'
})
export class MenuDishesService {

  Dishes = 
  [
    { Category: 'Pizza', Dishname: 'Chicken Pizza', Price: 240, Imageurl: 'img/pizza.jpg', id: '123', Food: 'non-veg' },
    { Category: 'Pizza', Dishname: 'Veg Pizza', Price: 220, Imageurl: 'img/vegpizza.jpg', id: '124', Food: 'veg' },
    { Category: 'Burger', Dishname: 'Delicious Burger', Price: 220, Imageurl: 'img/burger.png', id: '125', Food: 'veg' },
    { Category: 'Pasta', Dishname: 'French Pasta', Price: 210, Imageurl: 'img/pasta.png', id: '126', Food: 'veg' }
  ];


  menuItems =
   [
    { name: 'Pizza', id: 'pizza', icon: 'bi bi-pizza' },
    { name: 'Burger', id: 'burger', icon: 'bi bi-hamburger' },
    { name: 'Pasta', id: 'pasta', icon: 'bi bi-box-arrow-in-right' },
    { name: 'Fries', id: 'fries', icon: 'bi bi-emoji-smile' },
    { name: 'Biryani', id: 'biryani', icon: 'bi bi-bowl-rice' },
    { name: 'Rolls', id: 'rolls', icon: 'bi bi-emoji-wink' },
    { name: 'Soup', id: 'soup', icon: 'bi bi-droplet' },
    { name: 'South Indian', id: 'southIndian', icon: 'bi bi-circle-square' }
  ];
  private baseUrl = 'https://localhost:44368/api/Json/'; // Your backend API URL
                    //id   quantity   
OrderedItems: any =[ { "123": 2, "124": 2 },{"123":1}]; // Example: Dish IDs with their quantities


FilteredKeys:any = Object.keys(this.OrderedItems);
SessionCode:Number=0;

//Orderedmenu:any[] = this.FilteredKeys.map((key:string)=>{return this.Dishes.find((dish:any)=>dish.id===key))};



getquantity(id:string)
{
return this.OrderedItems[id];
}

gettotalprice()
{
  
debugger
  let totalPrice: number = 0;
  this.FilteredKeys.forEach((key:string)=>{
    const dish = this.Dishes.find((dish)=>dish.id === key);


    if(dish)
    {
      totalPrice += dish.Price * this.getquantity(key);
    }
  
  });
 
  return totalPrice;
}




  constructor(private router:ActivatedRoute,private http:HttpClient)
   {
    this.loadCart(); 
    
   let  OrderedItems: any[] = [ { "123": 2, "124": 2 }, { "123": 1 } ]; // Input array

    let Orderedmenu: any[] = OrderedItems.map((order: { [key: string]: number }, index: number) => {
      let dishesInOrder = Object.keys(order).map((dishId: string) => {
        let dish = this.Dishes.find(item => item.id === (dishId)); // Cast dishId to number for comparison
        if (dish) {
          return dish; // Return the dish object
        }
        return null; // Return null if dish not found
      }).filter(item => item !== null); // Remove null entries if a dish is not found
    
      return { orderIndex: index, dishes: dishesInOrder }; // Return the dishes in each order, indexed
    });
    
    console.log("from menu dish",Orderedmenu);
    

    this.getTableNumber();

    this.getSessionCode().subscribe((response) => {
      console.log("Session code response is", response);
      let session = response as { code: string }; // Type assertion
      
      if (session.code !== 'No session Code') 
        {
        let code = prompt("Enter Code"); // Use prompt to get user input
        if (session.code === code) 
          { // Ensure you check the right property
            this.SessionCode =Number(session.code);
          return; // Valid code entered
        } else {
          alert("Error: You entered the wrong code.");
        }
      } else 
      {
    return       
      }
    });
    

  }
  tableNumber: string="" ;

  getTableNumber():(any)
  {
    this.router.queryParams.subscribe(params => {
      this.tableNumber = params['tableNumber']; // Get the tableNumber from the query params
      console.log(this.tableNumber); // Log or use the tableNumber
    });
    
    return this.tableNumber;   
  }


  // Method to load cart from local storage
private loadCart(): { [key: string]: number } 
{
  
  if (typeof localStorage !== 'undefined') 
    {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : {}; // Parse and return the cart data, or return an empty object if no data
  }
  return {}; // If localStorage is undefined (for example, during SSR), return an empty object
}

// Method to retrieve the cart from local storage
getCart(): { [key: string]: number } 
{
  return this.loadCart(); // Call loadCart to retrieve the cart
}

// Method to save the cart to local storage
private saveCart(cart: { [key: string]: number }) 
{
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart)); // Convert the cart object to JSON string and store in localStorage
  }
}


  // Method to retrieve the dishes data
  getDishes() {
    return this.Dishes;
  }

  getmenus()
  {
    return this.menuItems;
  }
  // Method to add a dish to the cart
  addToCart(dishId: string): void 
  {
    const cart = this.getCart(); // Get the current cart from local storage
    console.log("addToCart service");
    
    if (cart[dishId])
     {
      cart[dishId]++; // Increment quantity if dish is already in cart
    } else {
      cart[dishId] = 1; // Start with 1 when the item is added to cart
    }

    this.saveCart(cart); // Save updated cart to local storage
  }

  // Method to increment dish quantity in cart
  increment(dishId: string): void 
  {
    
    const cart = this.getCart(); // Get the current cart from local storage
    if (cart[dishId]) {
      cart[dishId]++; // Increment quantity
      this.saveCart(cart); // Save updated cart to local storage
    }
  }

 emptyCart()
 {
localStorage.removeItem('cart');
}

  removeFromCart(dishId:string)  
  {
      const cart = this.getCart(); 
    if(cart[dishId])
      {
        delete cart[dishId];
        this.saveCart(cart); // Save updated cart to local storage
      }
    
  }

  decrement(dishId: string): void 
  { 
    const cart = this.getCart(); // Get the current cart from local storage
    if (cart[dishId]) {
      cart[dishId]--; // Decrement quantity
      if (cart[dishId] <= 0) 
        {
        delete cart[dishId]; // Remove the dish if quantity is 0
      }
      this.saveCart(cart); // Save updated cart to local storage
    }
  }

  // Method to get the count of a specific dish
  getCount(dishId: string): number
   {
    const cart = this.getCart(); // Get the current cart from local storage
    return cart[dishId] || 0; // Return the count or 0 if not in the cart
  }


  gettablestatus(tableNumber: number, Action: string): Observable<any> {
    // Create HttpParams object to hold the query parameters
    const params = new HttpParams()
      .set('tableNumber', tableNumber)
      .set('Action', Action);
  
    return this.http.get(`${this.baseUrl}gettablestatus`, { params });
  }
  

  
getOrderedItems()
{

  const params = new HttpParams()
  .set('tableNumber',this.tableNumber)
  return this.http.get(`${this.baseUrl}getOrderedItems`,{params});
}



  // cart.forEach(item => {
  //   const key = Object.keys(item)[0];  // Get the key from the object
  //   const value = item[key];           // Get the corresponding value
  //   params = params.append(key, value.toString());  // Append to params
  // });
  saveOrderItems(name: string,OrderId:any)
   {

    let cartitems: { [key: string]: number } = this.getCart();
    let items = Object.keys(cartitems);

    // Get the quantities using map
    let quantities = items.map(id => cartitems[id]);
    
    // Now you have separate arrays
    console.log("menu items to be sent",items); // Array of item IDs
    console.log("and there quantities",quantities);   // Array of quantities
        debugger;
  
    // Initialize HttpParams with the 'name' parameter
    let params = new HttpParams()
    .set('name', name)
    .set('items',String(items))
    .set('Quantities',String(quantities))
    .set('TableNumber',this.tableNumber)
    .set('Orderid',OrderId);
    // Make the HTTP GET request with the accumulated params
 
    return this.http.get(`${this.baseUrl}saveOrderItems`, { params });
    
  }


  getSessionCode()
  {
    const params = new HttpParams()
  .set('tableNumber',this.tableNumber)
    return this.http.get(`${this.baseUrl}getTableSessionCode`,{params});
  }





}
