import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [""],
      password: [""]
    });
  }

  login() {
    let f = this.loginForm.controls;
    this.authService
      .login({
        username: f.username.value,
        password: f.password.value
      })
      .subscribe(success => {
        if (success) {
          this.router.navigate(["/user-info"]);
        }
      });
  }
}
