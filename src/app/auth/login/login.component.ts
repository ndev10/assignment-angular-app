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
  invalidCredentialError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/user-info"]);
    }
    this.loginForm = this.formBuilder.group({
      username: [""],
      password: [""]
    });
  }

  login() {
    this.invalidCredentialError = false;
    const form = this.loginForm.controls;
    this.authService
      .login({
        username: form.username.value,
        password: form.password.value
      })
      .subscribe(success => {
        if (success) {
          this.router.navigate(["/user-info"]);
        } else {
          this.invalidCredentialError = true;
        }
      });
  }
}
