import { Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../../../components/header-admin/header-admin.component';
import { FooterAdminComponent } from '../../../components/footer-admin/footer-admin.component';
import { SidebarAdminComponent } from '../../../components/sidebar-admin/sidebar-admin.component';
import { DataService } from '../../../service/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-cate',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    FooterAdminComponent,
    SidebarAdminComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './admin-cate.component.html',
  styleUrl: './admin-cate.component.css',
})
export class AdminCateComponent implements OnInit {
  listCate: any;
  constructor(private dataService: DataService) {
    this.dataService.setApiUrl('http://localhost:3000/categories');
  }
  ngOnInit(): void {
    this.getDataCate();
  }
  getDataCate() {
    this.dataService.getItems().subscribe((data) => {
      this.listCate = data.sort(function (a, b) {
        return b.id - a.id;
      });
    });
  }
  deleteCate(id: any) {
    this.dataService.deleteItem(id).subscribe(() => {
      alert('Xóa thành công !');
      window.location.reload();
    });
  }
}
