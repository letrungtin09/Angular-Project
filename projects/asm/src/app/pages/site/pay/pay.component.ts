import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { FormatPricePipe } from '../../../pipes/format-price.pipe';
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
  selector: 'app-pay',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormatPricePipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css',
})
export class PayComponent {
  constructor(private dataService: DataService, private router: Router) {}
  formPay = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });
  onSubmit() {
    let date = new Date();
    let getDay = date.getDate();
    let getMonth = date.getMonth();
    let getYear = date.getFullYear();
    let fullDate = `${getDay}/${getMonth + 1}/${getYear}`;

    if (this.formPay.valid) {
      let payItem = {
        date: fullDate,
        fullName: this.formPay.value.fullName,
        phoneNumber: this.formPay.value.phoneNumber,
        email: this.formPay.value.email,
        address: this.formPay.value.address,
      };
      this.dataService.setApiUrl('http://localhost:3000/bill');
      this.dataService.addItem(payItem).subscribe(() => {
        alert('Thanh toán đơn hàng thành công !');
        localStorage.removeItem('cart');
        this.router.navigateByUrl('/');
      });
    }
  }
}
