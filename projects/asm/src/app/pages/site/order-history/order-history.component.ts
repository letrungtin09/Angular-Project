import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormatPricePipe } from '../../../pipes/format-price.pipe';
import { Router } from '@angular/router';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
    FormatPricePipe,
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent implements OnInit {
  products: any;
  bill: any;
  priceCart: number = 0;
  priceSale: number = 0;
  totalMoney: number = 0;
  constructor(private router: Router, private dataService: DataService) {}
  ngOnInit(): void {
    this.getDetailBill();
    this.getBill();
  }
  getDetailBill() {
    this.dataService.setApiUrl('http://localhost:3000/detailBill');
    this.dataService.getItems().subscribe((data) => {
      this.products = data;
      for (let pd of this.products) {
        this.priceCart += pd.quantity * (pd.price - pd.price * pd.sale);
        this.priceSale += pd.quantity * (pd.price * pd.sale);
      }
      this.totalMoney += this.priceCart - this.priceSale;
    });
  }
  getBill() {
    this.dataService.setApiUrl('http://localhost:3000/bill');
    this.dataService.getItems().subscribe((data) => {
      this.bill = data;
    });
  }
}
