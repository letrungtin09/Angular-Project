import { Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../../../components/header-admin/header-admin.component';
import { FooterAdminComponent } from '../../../components/footer-admin/footer-admin.component';
import { SidebarAdminComponent } from '../../../components/sidebar-admin/sidebar-admin.component';
import { DataService } from '../../../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-update-cate',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    FooterAdminComponent,
    SidebarAdminComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './form-update-cate.component.html',
  styleUrl: './form-update-cate.component.css',
})
export class FormUpdateCateComponent implements OnInit {
  id: any;
  cate: any = {};
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.dataService.setApiUrl('http://localhost:3000/categories');
  }
  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.dataService.getDetailItem(this.id).subscribe((data) => {
      this.cate = data;
    });
  }
  onSubmit(formCate: NgForm) {
    if (formCate.valid) {
      this.dataService.updateItem(this.id, this.cate).subscribe(() => {
        alert('Cập nhật loại sản phẩm thành công !');
        this.router.navigateByUrl('/adminCate');
      });
    }
  }
}
