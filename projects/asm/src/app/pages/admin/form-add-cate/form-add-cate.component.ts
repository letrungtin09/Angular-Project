import { Component } from '@angular/core';
import { HeaderAdminComponent } from '../../../components/header-admin/header-admin.component';
import { FooterAdminComponent } from '../../../components/footer-admin/footer-admin.component';
import { SidebarAdminComponent } from '../../../components/sidebar-admin/sidebar-admin.component';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataService } from '../../../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-add-cate',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    FooterAdminComponent,
    SidebarAdminComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './form-add-cate.component.html',
  styleUrl: './form-add-cate.component.css',
})
export class FormAddCateComponent {
  constructor(private dataService: DataService, private router: Router) {
    this.dataService.setApiUrl('http://localhost:3000/categories');
  }
  formCate = new FormGroup({
    nameCate: new FormControl('', [Validators.required]),
  });
  onSubmit() {
    if (this.formCate.valid) {
      let cateItem = { nameCate: this.formCate.value.nameCate };
      this.dataService.addItem(cateItem).subscribe(() => {
        alert('Thêm loại sản phẩm thành công !');
        this.router.navigateByUrl('/adminCate');
      });
    }
  }
}
