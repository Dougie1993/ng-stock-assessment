import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { RemoveStock, Stock } from './interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'stock-assessment';
  @ViewChild('f', {static: true}) addStockForm: NgForm;
  @ViewChild('g', {static: true}) removeStockForm: NgForm;

  stock: Stock;
  removedStock: RemoveStock;
  stocks: Stock[] = [];
  emailArr: string[] = [];

  quantityProduct1 = 0;
  priceProduct1 = 0;

  quantityProduct2 = 0;
  priceProduct2 = 0;

  quantityProduct3 = 0;
  priceProduct3 = 0;
  constructor () {}

  ngOnInit () {

  }

  onAddStock () {
    this.stock = {
      productCode : '',
      productQuantity: 0,
      productPrice: 0

    }
    if (this.addStockForm.valid) {
      this.stock = {
        productCode : this.addStockForm.value.product,
        productQuantity: this.addStockForm.value.items,
        productPrice: this.addStockForm.value.itemPrice
      }

       this.findAndUpdateStock(this.stock);
    } else {
      alert('Please ensure all fields have values');
      return false;
    }
  }

  onRemoveStock () {
    this.removedStock = {
      productCode: '',
      buyerEmail: '',
      itemsBought: 0
    }
    

    if (this.removeStockForm.valid) {
      this.removedStock = {
        productCode: this.removeStockForm.value.productRemove,
        buyerEmail: this.removeStockForm.value.email,
        itemsBought: this.removeStockForm.value.itemsBought
      }
      this.findEmailAndUpdate(this.removedStock);
    } else {
      alert('Please ensure all fields have values');
      return false;
    }

  }

  // helper methods
  findAndUpdateStock(stock: Stock) {
    let found = -1;
      for (let i = 0; i < this.stocks.length; i++) {
        if (this.stocks[i].productCode == stock.productCode) {
            found = 1;
            // quantity
            this.stocks[i].productQuantity = this.stocks[i].productQuantity + stock.productQuantity;
            // average price
            this.stocks[i].productPrice = (this.stocks[i].productPrice + stock.productPrice) / 2;
            this.updateStocks();
            break;
        }
      }
    
    if (found !== -1) {
     // updateStocks();
      alert(`${stock.productCode} has been updated in the inventory`);
      return false;
  } else {
      this.stocks.push(stock);
      this.updateStocks();
      alert(`${stock.productCode} has been added to inventory`);
      
  }

  found = -1
  }

  removeStock (removedStock: RemoveStock) {
    // check if the stock to be removed is in inventory
        if (this.stocks.length === 0) {
          alert(`${removedStock.productCode} does not exist in inventory`);
          return false;
        }
        let foundProduct = -1;
        for (let i = 0; i < this.stocks.length; i++) {
          if (this.stocks[i].productCode === removedStock.productCode) {
              foundProduct = 1;
              if (this.stocks[i].productQuantity >= removedStock.itemsBought) {
                  this.stocks[i].productQuantity = this.stocks[i].productQuantity - removedStock.itemsBought;
              } else {
                  alert('There are less products in inventory than the requested sale');
                  return false;
              }   
              this.updateStocks();
              alert(`${removedStock.productCode} has been succesfully shipped`);
              return true;
          } 
      } 

      if (foundProduct === -1) {
            alert(`${removedStock.productCode} does not exist in inventory`);
            return false;
      }
  }

  findEmailAndUpdate(removedStock: RemoveStock) {
    // here we check if this is a 1st time buyer if so we then update inventory after buy
    let foundEmail = -1;
    for (let i = 0; i < this.emailArr.length; i++) {
        if (this.emailArr[i] === removedStock.buyerEmail) {
            foundEmail = 1;
            alert('The customer has exceeded the buying limit');
            // clear the input fields
            return false;
        }       
    }

    if (foundEmail === -1) {
        // find product and subract the quantity
        
        if(this.removeStock(removedStock)) {
            //update email container
            this.emailArr.push(removedStock.buyerEmail);
        } else {
            return false;
        }

        
            
    }
  }

  updateStocks() {
    for (let i = 0; i < this.stocks.length; i++) {
      if (this.stocks[i].productCode === 'product1') {
        this.quantityProduct1 = this.stocks[i].productQuantity;
        this.priceProduct1 = this.stocks[i].productPrice;
      } else if (this.stocks[i].productCode === 'product2') {
        this.quantityProduct2 = this.stocks[i].productQuantity;
        this.priceProduct2 = this.stocks[i].productPrice;
      } else {
        this.quantityProduct3 = this.stocks[i].productQuantity;
        this.priceProduct3 = this.stocks[i].productPrice;
      }
    }
  }
}
