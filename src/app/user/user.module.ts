import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserinfoComponent } from "./userinfo/userinfo.component";
import { UserRoutingModule } from "./user.routing.module";

@NgModule({
  declarations: [UserinfoComponent],
  imports: [CommonModule, UserRoutingModule]
})
export class UserModule {}
