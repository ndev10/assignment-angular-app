import { Component, OnInit } from "@angular/core";

import { UserService } from "../user.service";

@Component({
  selector: "app-userinfo",
  templateUrl: "./userinfo.component.html",
  styleUrls: ["./userinfo.component.css"]
})
export class UserinfoComponent implements OnInit {
  userInfo;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserInfo().subscribe(response => {
      this.userInfo = response;
    });
  }
}
