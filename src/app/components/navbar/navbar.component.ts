import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  toggleArrow = false;
  scrHeight: any;
  scrWidth: any;

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          this.scrHeight = window.innerHeight;
          this.scrWidth = window.innerWidth;
    }

  constructor(private authService: AuthService, private router: Router) {
    this.getScreenSize();
    this.authService.authSubject.subscribe((res) => this.isLoggedIn = res);
  }

  ngOnInit() {
  }

  onLogin() {
    this.router.navigateByUrl('/login');
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  toggleChevron() {
    this.toggleArrow = !this.toggleArrow;
  }

}
