import { Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../../../components/header-admin/header-admin.component';
import { FooterAdminComponent } from '../../../components/footer-admin/footer-admin.component';
import { SidebarAdminComponent } from '../../../components/sidebar-admin/sidebar-admin.component';
import { DataService } from '../../../service/data.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-add-pd',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    FooterAdminComponent,
    SidebarAdminComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './form-add-pd.component.html',
  styleUrl: './form-add-pd.component.css',
})
export class FormAddPDComponent implements OnInit {
  listCate: any;
  constructor(private dataService: DataService, private router: Router) {}
  ngOnInit(): void {
    this.getDataCate();
  }
  getDataCate() {
    this.dataService.setApiUrl('http://localhost:3000/categories');
    this.dataService.getItems().subscribe((data) => {
      this.listCate = data;
    });
  }
  formPD = new FormGroup({
    namePd: new FormControl('', [Validators.required]),
    imgPd: new FormControl('', [Validators.required]),
    pricePd: new FormControl(null, [Validators.pattern('^[^0][1-9]+$')]),
    salePd: new FormControl(null, [
      Validators.pattern('^[0](.([0-9]{1,2}))?$'),
    ]),
    featuredPd: new FormControl('0', [Validators.required]),
    idCate: new FormControl('0', [Validators.required]),
    brandPd: new FormControl('', [Validators.required]),
  });
  onSubmit() {
    if (this.formPD.valid) {
      let pdItem = {
        nameProduct: this.formPD.value.namePd,
        image: this.formPD.value.imgPd,
        price: +this.formPD.value.pricePd!,
        sale: +this.formPD.value.salePd!,
        featured: +this.formPD.value.featuredPd!,
        purchase: 0,
        idCate: +this.formPD.value.idCate!,
        brand: this.formPD.value.brandPd,
      };
      this.dataService.setApiUrl('http://localhost:3000/products');
      this.dataService.addItem(pdItem).subscribe(() => {
        alert('Thêm sản phẩm thành công !');
        this.router.navigateByUrl('/adminProduct');
      });
    }
  }
}
