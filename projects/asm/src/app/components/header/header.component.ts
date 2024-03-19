import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  categories: any;
  keyword: string = '';
  constructor(
    private router: Router,
    private authService: AuthService,
    private dataService: DataService
  ) {}
  user: any = null;
  quantityInCart: number = 0;
  ngOnInit(): void {
    this.getDataCate();
    this.user = this.authService.getUserInfo();
    if (this.user == null)
      this.authService.user$.subscribe((data) => {
        this.user = data;
      });
    let cartString = localStorage.getItem('cart');
    if (cartString !== null) {
      let cart = JSON.parse(cartString);
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id) {
          this.quantityInCart++;
        }
      }
    }
  }
  getDataCate() {
    this.dataService.setApiUrl('http://localhost:3000/categories');
    this.dataService.getItems().subscribe((data) => {
      this.categories = data;
    });
  }
  searchPD(): void {
    let getInput = document.getElementById(
      'header__inputSearch'
    ) as HTMLInputElement;
    this.keyword = getInput.value;
    this.router.navigateByUrl(`/searchProduct/${this.keyword}`);
    setInterval(() => {
      window.location.reload();
    }, 300);
  }
  logOut() {
    this.authService.logout();
    this.user = null;
  }
}
