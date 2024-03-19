import { Component } from '@angular/core';
import { HeaderAdminComponent } from '../../../components/header-admin/header-admin.component';
import { FooterAdminComponent } from '../../../components/footer-admin/footer-admin.component';
import { RouterModule } from '@angular/router';
import { SidebarAdminComponent } from '../../../components/sidebar-admin/sidebar-admin.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderAdminComponent, FooterAdminComponent, SidebarAdminComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
