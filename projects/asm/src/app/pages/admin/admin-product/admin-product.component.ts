import { Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../../../components/header-admin/header-admin.component';
import { FooterAdminComponent } from '../../../components/footer-admin/footer-admin.component';
import { SidebarAdminComponent } from '../../../components/sidebar-admin/sidebar-admin.component';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../service/data.service';
import { FormatPricePipe } from '../../../pipes/format-price.pipe';

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    FooterAdminComponent,
    SidebarAdminComponent,
    CommonModule,
    FormatPricePipe,
  ],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css',
})
export class AdminProductComponent implements OnInit {
  listPD: any;
  constructor(private dataService: DataService) {
    this.dataService.setApiUrl('http://localhost:3000/products');
  }
  ngOnInit(): void {
    this.getDataPD();
  }
  getDataPD() {
    this.dataService.getItems().subscribe((data) => {
      this.listPD = data.sort(function (a, b) {
        return b.id - a.id;
      });
    });
  }
  deletePd(id: any) {
    this.dataService.deleteItem(id).subscribe(() => {
      alert('Xóa thành công !');
      window.location.reload();
    });
  }
}
