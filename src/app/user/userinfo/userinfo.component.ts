import { Component, OnInit } from "@angular/core";

import { UserService } from "../user.service";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-userinfo",
  templateUrl: "./userinfo.component.html",
  styleUrls: ["./userinfo.component.css"]
})
export class UserinfoComponent implements OnInit {
  userInfo;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userService.getUserInfo().subscribe(response => {
      this.userInfo = response;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
