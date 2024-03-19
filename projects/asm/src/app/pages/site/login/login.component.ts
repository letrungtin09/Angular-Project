import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}
  onLogin(formData: any) {
    this.authService.login(formData.email, formData.password);
  }
  ngOnInit(): void {
    console.log('login:' + this.authService.isLoggedIn());
  }
}
