import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private cookieService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  public logout(){
    this.cookieService.logout();
    this.router.navigateByUrl('/login');
    this.warning('Logged Out!');
  }

  private warning(message: string) {
    this.toastr.warning(message, 'Info!', {
      timeOut: 2000
    })
  }

}
