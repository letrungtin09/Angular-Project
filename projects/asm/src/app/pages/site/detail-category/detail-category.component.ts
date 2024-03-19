import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { Category } from '../../../models/category';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormatPricePipe } from '../../../pipes/format-price.pipe';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-detail-category',
  standalone: true,
  imports: [CommonModule, FormatPricePipe, HeaderComponent, FooterComponent],
  templateUrl: './detail-category.component.html',
  styleUrl: './detail-category.component.css',
})
export class DetailCategoryComponent implements OnInit {
  products: any;
  categories: any;
  getId: any;
  productCate: any = [];
  category: any = [];
  sub: any;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.getDataCate();
    this.getDataPD();
  }
  getDataCate() {
    this.dataService.setApiUrl('http://localhost:3000/categories');
    this.dataService.getItems().subscribe((data) => {
      this.categories = data;
      this.getId = +this.route.snapshot.params['id'];
      this.category = this.categories.find(
        (cate: any) => cate.id === this.getId
      );
    });
  }
  getDataPD() {
    this.dataService.setApiUrl('http://localhost:3000/products');
    this.dataService.getItems().subscribe((data) => {
      this.products = data;
      this.getId = +this.route.snapshot.params['id'];
      for (let pd of this.products) {
        if (pd.idCate == this.getId) {
          this.productCate.push(pd);
        }
      }
    });
  }
}
