import { Component,OnInit , Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from '../payment.service';
import { MenuDishesService } from '../menu-dishes.service';
import { response } from 'express';

declare var Razorpay: any;

@Component({
  selector: 'app-paymentmodal',
  templateUrl: './paymentmodal.component.html',
  styleUrl: './paymentmodal.component.css'
})
export class PaymentmodalComponent
 {

tableNumber: number ;
name:string='';
amount:number;
tablestatus :Number= 1;
  Sessioncode:boolean=false;
constructor(private paymentservice:PaymentService ,private dishesservice:MenuDishesService,  public dialogRef: MatDialogRef<PaymentmodalComponent>, @Inject(MAT_DIALOG_DATA) public data: any)
 {
  this.amount = data.amount; // Set predefined amount from passed data
   
  this.tableNumber = this.dishesservice.getTableNumber();
    
  
}

ngOnInit(): void 
{
  if (this.tableNumber === null ||  this.tableNumber === undefined) 
    {
    alert("Scan againfrom payment modal");
  }
}

close():void
{
  this.dialogRef.close();
}


submit(form: any) 
{
  console.log("the amount of toatl",this.amount)
  if (form.valid)
     {
    const customerName = this.name;

    console.log('Form submitted with:', { name: customerName, amount: this.amount });
     
    this.dishesservice.gettablestatus(this.tableNumber,'check').subscribe((response) =>
      {
      this.tablestatus = response;
      console.log("the table response",response);
      //check session code
      //this.Sessioncode = true;
      if(this.tablestatus == 0 || this.Sessioncode)
        {
  
          this.paymentservice.Createorder(this.amount,customerName,this.tableNumber).subscribe((response) => 
            {
            const OrderId = response.orderId;
      
            const options = {
              key: '', // Your Razorpay key
              name: customerName,
              description: '',
              order_id: OrderId,
              image: '', // Your company logo URL
              prefill: {
                name: customerName,
                email: '', // Optional
                contact: '', // Optional
              },
              notes: {
                address: 'Table no', // Optional address
              },
              theme: {
                color: '#3399cc',
              },
              handler: (response:any) => 
                {
                const paymentId = response.razorpay_payment_id;
                const signature = response.razorpay_signature;
      
                this.dialogRef.close();
                this.paymentservice.verifypayment(paymentId, OrderId, signature).subscribe(
                  
                  (result) => {
                    if (result.success) 
                      {
                        alert("Payment success redirecting tocart");
                      this.saveOrderItems(result.OrderItems, customerName,OrderId);
                    } else {
                      alert('Payment Failed, During payment verification');
                    }
                  },
                  
                  (error: any) => {
                    alert('Error verifying payment, please try again. ' + error.message);
                    console.error('Error verifying payment:', error); // Log the error to the console for debugging
                  }
                  
                );
              },
              modal: {
                ondismiss: function() 
                {
                  console.log('Payment modal closed');
                },
              },
            };
      
            const razorpay = new Razorpay(options);
            razorpay.open();
          }, (error) => {
            console.error('Error creating order:', error);
            alert('Error creating order, please try again.');
          });
      
        }else{
          alert("please wait and try and try again")
        }
      });

    

  } else {
    console.log('Form is invalid');
  }
}





saveOrderItems(orderItems: any, customerName: string,OrderId:any) 
{
 var name =  customerName;
  this.dishesservice.saveOrderItems(name,OrderId).subscribe ((result) => 
  {
    console.log(result);
    console.log("the order items saved---");
    
    localStorage.removeItem('cart');
    window.location.reload();
  });
  console.log('Customer Name:', customerName);
}












}
