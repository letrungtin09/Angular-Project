import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';
import { FormatPricePipe } from '../../../pipes/format-price.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { DataService } from '../../../service/data.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-all-product',
  standalone: true,
  imports: [
    CommonModule,
    FormatPricePipe,
    RouterModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    NgxPaginationModule,
  ],
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.css',
})
export class AllProductComponent implements OnInit {
  products: any;
  productFilter: any = [];
  p: number = 1;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.setApiUrl('http://localhost:3000/products');
    this.dataService.getItems().subscribe((data) => {
      this.products = data;

      let getSelect = document.querySelector(
        '#filter-select'
      ) as HTMLSelectElement;
      getSelect.addEventListener('change', () => {
        let selectedOpt = getSelect.options[getSelect.selectedIndex];
        let getValue = parseInt(selectedOpt.value);
        if (getValue == 1) {
          this.productFilter = this.products.sort(function (a: any, b: any) {
            return a.id - b.id;
          });
        } else if (getValue == 2) {
          this.productFilter = this.products.sort(function (a: any, b: any) {
            return b.id - a.id;
          });
        } else if (getValue == 3) {
          this.productFilter = this.products.sort(function (a: any, b: any) {
            return a.price - b.price;
          });
        } else if (getValue == 4) {
          this.productFilter = this.products.sort(function (a: any, b: any) {
            return b.price - a.price;
          });
        }
      });
    });
  }
}
