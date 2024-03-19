import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css',
})
export class HeaderAdminComponent implements OnInit {
  user: any = null;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.user = this.authService.getUserInfo();
    if (this.user == null)
      this.authService.user$.subscribe((data) => {
        this.user = data;
      });
  }
  logOut() {
    this.authService.logout();
    this.user = null;
  }
}
