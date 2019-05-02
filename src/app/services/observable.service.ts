import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ObservableService {
  searchKeySubject = new Subject<string>();
  isLoggedInSubject = new Subject<boolean>();
  isAdminSubject = new Subject<boolean>();
}
