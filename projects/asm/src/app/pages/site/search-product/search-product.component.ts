import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { FormatPricePipe } from '../../../pipes/format-price.pipe';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [
    CommonModule,
    FormatPricePipe,
    FormsModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css',
})
export class SearchProductComponent implements OnInit {
  products: any;
  keyword: string = '';
  arrSearchPD: any;
  productFilter: any = [];
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.dataService.setApiUrl('http://localhost:3000/products');
    this.dataService.getItems().subscribe((data) => {
      this.products = data;
      this.keyword = this.route.snapshot.params['keyword'];
      this.arrSearchPD = this.products.filter((pd: any) =>
        pd.nameProduct.toLowerCase().includes(this.keyword.toLowerCase())
      );

      let getSelect = document.querySelector(
        '#filter-select'
      ) as HTMLSelectElement;
      getSelect.addEventListener('change', () => {
        let selectedOpt = getSelect.options[getSelect.selectedIndex];
        let getValue = parseInt(selectedOpt.value);
        if (getValue == 1) {
          this.productFilter = this.arrSearchPD.sort(function (a: any, b: any) {
            return a.id - b.id;
          });
        } else if (getValue == 2) {
          this.productFilter = this.arrSearchPD.sort(function (a: any, b: any) {
            return b.id - a.id;
          });
        } else if (getValue == 3) {
          this.productFilter = this.arrSearchPD.sort(function (a: any, b: any) {
            return a.price - b.price;
          });
        } else if (getValue == 4) {
          this.productFilter = this.arrSearchPD.sort(function (a: any, b: any) {
            return b.price - a.price;
          });
        }
      });
    });
  }
}
