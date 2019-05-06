import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "status"
})
export class StatusPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if ("CONF" === value) {
      return "Confirmed";
    } else if ("CNXL" === value) {
      return "Cancelled";
    } else if ("CMPL" === value) {
      return "Completed";
    } else if ("EXP" === value) {
      return "Expired";
    }
    return value;
  }
}
