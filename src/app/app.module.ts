import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { HotelComponent } from "./hotel/hotel.component";
import { RegistrationComponent } from "./registration/registration.component";
import { AccountsComponent } from "./accounts/accounts.component";
import { BookingsComponent } from "./bookings/bookings.component";
import { RestaurantDetailComponent } from "./restaurant-detail/restaurant-detail.component";
import { ProfileComponent } from "./profile/profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegistrationService } from "./services/registration.service";
import { HttpClientModule } from "@angular/common/http";
import { CreateRestaurantComponent } from "./create-restaurant/create-restaurant.component";
import { AuthGuard } from "./services/auth-guard.service";
import { AuthService } from "./services/auth.service";
import { LoginComponent } from "./login/login.component";
import { LoginService } from "./services/login.service";
import { RestaurantListComponent } from "./home/restaurant-list/restaurant-list.component";
import { RestaurantService } from "./services/restaurant.service";
import { ObservableService } from "./services/observable.service";
import { AdminAuthGuard } from "./services/admin-auth-guard.service";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "restaurant/:id", component: RestaurantDetailComponent },
  { path: "signUp", component: RegistrationComponent },
  { path: "login", component: LoginComponent },
  { path: "bookings", component: BookingsComponent },
  { path: "home", redirectTo: "" },
  { path: "profile/:username", component: ProfileComponent },
  {
    path: "createRestaurant",
    canActivate: [AdminAuthGuard],
    component: CreateRestaurantComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    HotelComponent,
    RegistrationComponent,
    AccountsComponent,
    BookingsComponent,
    RestaurantDetailComponent,
    ProfileComponent,
    CreateRestaurantComponent,
    LoginComponent,
    RestaurantListComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    NgbDatepickerModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    RegistrationService,
    AuthGuard,
    AuthService,
    AdminAuthGuard,
    LoginService,
    RestaurantService,
    ObservableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
