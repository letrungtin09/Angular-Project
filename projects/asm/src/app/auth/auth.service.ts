import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  private isAuthenticated = false;

  // Khởi tạo BehaviorSubject với giá trị khởi đầu là null
  private userSubject = new BehaviorSubject<any>(null);

  // Để component khác có thể đăng ký và lắng nghe sự thay đổi
  user$ = this.userSubject.asObservable();

  login(email: string, password: string) {
    const user = {
      email: email,
      password: password,
    };
    // Gửi yêu cầu đăng nhập đến API
    this.http
      .post('http://localhost:8000/auth/login', user)
      .subscribe((response: any) => {
        // Nhận JWT token từ phản hồi và lưu vào localStorage
        const token = response.access_token;
        localStorage.setItem('access_token', token);

        // Có dữ liệu mới thông báo cho header thay đổi
        this.userSubject.next(this.getUserInfo());

        // Đánh dấu đã chứng thực thành công
        this.isAuthenticated = true;
        // Tiếp tục xử lý sau khi chứng thực thành công, ví dụ: chuyển hướng đến trang chính
        let dataUser = this.jwtHelper.decodeToken(response.access_token);

        if (dataUser.infoUser.role == 'user') {
          this.router.navigate(['/']);
          window.location.href = '/';
        } else {
          this.router.navigate(['/admin']);
        }
      });
  }

  signup(data: any) {
    const user = {
      email: data.email,
      password: data.password,
      username: data.username,
      role: 'user',
    };
    this.http
      .post('http://localhost:8000/auth/register', user)
      .subscribe((response: any) => {
        alert('Đăng ký thành công !');
        this.router.navigate(['/login']);
      });
  }

  logout() {
    // Xóa token khỏi localStorage
    localStorage.removeItem('access_token');
    // Có dữ liệu mới thông báo cho header thay đổi
    this.userSubject.next(null);
    // Đánh dấu đã đăng xuất
    this.isAuthenticated = false;
    // Tiếp tục xử lý sau khi đăng xuất, ví dụ: chuyển hướng đến trang đăng nhập
    this.router.navigate(['/login']);
  }

  getUserInfo(): any {
    let result: any = null;
    try {
      let token: any = localStorage.getItem('access_token');
      const decodedToken = this.jwtHelper.decodeToken(token);
      // Trả về thông tin người dùng từ token
      result = decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    return result;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    let result: boolean = false;
    try {
      // Kiểm tra token có tồn tại, hợp lệ và chưa hết hạn
      result = !!token && !this.jwtHelper.isTokenExpired(token);
    } catch {}
    return result;
  }
}
