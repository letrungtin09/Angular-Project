import { FormatPricePipe } from '../../../pipes/format-price.pipe';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { DataService } from '../../../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormatPricePipe,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  productCart: any;
  priceCart: number = 0;
  priceSale: number = 0;
  totalMoney: number = 0;
  quantityInCart: number = 0;
  constructor(private dataService: DataService, private router: Router) {}
  ngOnInit(): void {
    let cartString = localStorage.getItem('cart');
    if (cartString !== null) {
      let cart = JSON.parse(cartString);
      this.productCart = cart;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id) {
          this.quantityInCart++;
        }
      }
      cart.forEach((pd: any) => {
        this.priceCart += pd.quantity * (pd.price - pd.price * pd.sale);
        this.priceSale += pd.quantity * (pd.price * pd.sale);
      });
      this.totalMoney += this.priceCart - this.priceSale;
    }
  }
  sumMoney(id: any) {
    let cartString = localStorage.getItem('cart');
    let getVal = document.querySelector('#quantityCart') as HTMLInputElement;
    if (cartString !== null) {
      let cart = JSON.parse(cartString);
      this.productCart = cart;
      getVal.addEventListener('change', () => {
        for (let i = 0; i < this.productCart.length; i++) {
          if (id == this.productCart[i].id) {
            this.priceCart +=
              this.productCart[i].price -
              this.productCart[i].price * this.productCart[i].sale;
            this.priceSale +=
              this.productCart[i].price * this.productCart[i].sale;
          }
        }
        this.totalMoney = this.priceCart - this.priceSale;
      });
    }
  }
  removeCart() {
    localStorage.removeItem('cart');
    window.location.reload();
  }
  payCart() {
    let cartString = localStorage.getItem('cart');
    if (cartString !== null) {
      this.dataService.setApiUrl('http://localhost:3000/detailBill');
      let cart = JSON.parse(cartString);
      for (let item of cart) {
        this.dataService.addItem(item).subscribe(() => {
          this.router.navigateByUrl('/pay');
        });
      }
    }
  }
}
