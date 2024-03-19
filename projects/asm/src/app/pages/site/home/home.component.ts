import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';
import { FormatPricePipe } from '../../../pipes/format-price.pipe';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormatPricePipe,
    RouterModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: any;
  productAll: any;
  productSelling: any = [];
  arrSortPurchase: any = [];
  productPromotion: any = [];
  productFeatured: any = [];
  constructor(private dataService: DataService) {
    this.dataService.setApiUrl('http://localhost:3000/products');
  }
  ngOnInit(): void {
    this.dataService.getItems().subscribe((data) => {
      this.products = data;
      this.productAll = this.products;

      this.arrSortPurchase = this.products.sort(function (a: any, b: any) {
        return b.purchase - a.purchase;
      });

      for (let i = 0; i < 10; i++) {
        this.productSelling.push(this.arrSortPurchase[i]);
      }

      for (let pd of this.products) {
        if (pd.sale != 0) {
          this.productPromotion.push(pd);
        }
      }
      for (let pd of this.products) {
        if (pd.featured == 1) {
          this.productFeatured.push(pd);
        }
      }
    });
  }
}
