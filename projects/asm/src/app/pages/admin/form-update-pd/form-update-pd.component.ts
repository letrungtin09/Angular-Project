import { Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../../../components/header-admin/header-admin.component';
import { FooterAdminComponent } from '../../../components/footer-admin/footer-admin.component';
import { SidebarAdminComponent } from '../../../components/sidebar-admin/sidebar-admin.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-update-pd',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    FooterAdminComponent,
    SidebarAdminComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './form-update-pd.component.html',
  styleUrl: './form-update-pd.component.css',
})
export class FormUpdatePDComponent implements OnInit {
  id: any;
  listCate: any;
  productDetail: any = {};
  product: any = {};
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getDataCate();
    this.getDataPd();
  }
  getDataPd() {
    this.id = +this.route.snapshot.params['id'];
    this.dataService.setApiUrl('http://localhost:3000/products');
    this.dataService.getDetailItem(this.id).subscribe((data) => {
      this.productDetail = data;
    });
  }
  getDataCate() {
    this.dataService.setApiUrl('http://localhost:3000/categories');
    this.dataService.getItems().subscribe((data) => {
      this.listCate = data;
    });
  }

  onSubmit(formPD: NgForm) {
    if (formPD.valid) {
      this.product = {
        id: this.id,
        nameProduct: this.productDetail.nameProduct,
        image: this.productDetail.image,
        price: +this.productDetail.price,
        sale: +this.productDetail.sale,
        featured: +this.productDetail.featured,
        purchase: +this.productDetail.purchase,
        idCate: +this.productDetail.idCate,
        brand: this.productDetail.brand,
      };
      this.dataService.setApiUrl('http://localhost:3000/products');
      this.dataService.updateItem(this.id, this.product).subscribe(() => {
        alert('Cập nhật sản phẩm thành công !');
        this.router.navigateByUrl('/adminProduct');
      });
    }
  }
}
