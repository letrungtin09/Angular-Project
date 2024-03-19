import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormatPricePipe } from '../../../pipes/format-price.pipe';
import { CommonModule } from '@angular/common';
import { Category } from '../../../models/category';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [
    RouterModule,
    FormatPricePipe,
    CommonModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css',
})
export class DetailProductComponent implements OnInit {
  products: any;
  categories: any;
  productSame: any = [];
  product: any = [];
  category: any = [];
  getIdPD: any;
  getIdCate: any;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getDataCate();
    this.getDataPD();
  }
  getDataCate() {
    this.dataService.setApiUrl('http://localhost:3000/categories');
    this.dataService.getItems().subscribe((data) => {
      this.categories = data;
      this.getIdCate = +this.route.snapshot.params['idCate'];
      this.category = this.categories.find(
        (cate: any) => cate.id === this.getIdCate
      );
    });
  }
  getDataPD() {
    this.dataService.setApiUrl('http://localhost:3000/products');
    this.dataService.getItems().subscribe((data) => {
      this.products = data;
      this.getIdPD = +this.route.snapshot.params['id'];
      this.product = this.products.find((pd: any) => pd.id === this.getIdPD);
      this.getIdCate = +this.route.snapshot.params['idCate'];
      for (let pd of this.products) {
        if (pd.idCate == this.getIdCate) {
          this.productSame.push(pd);
        }
      }
    });
  }
  addProduct(
    id: number,
    name: string,
    img: string,
    price: number,
    sale: number,
    idCate: number
  ) {
    let cartString = localStorage.getItem('cart');
    if (cartString == null) {
      let cart = [];
      cart.push({
        id: id,
        nameProduct: name,
        image: img,
        price: price,
        sale: sale,
        idCate: idCate,
        quantity: 1,
      });
      alert('Đã thêm vào giỏ hàng !');
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      let cart = JSON.parse(cartString);
      let item = cart.find((item: any) => item.id === id);
      if (item) {
        item.quantity++;
      } else {
        cart.push({
          id: id,
          nameProduct: name,
          image: img,
          price: price,
          sale: sale,
          idCate: idCate,
          quantity: 1,
        });
      }
      alert('Đã thêm vào giỏ hàng !');
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
}
