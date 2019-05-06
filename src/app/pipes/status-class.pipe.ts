import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "statusClass"
})
export class StatusClassPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if ("CONF" === value) {
      return "table-info";
    } else if ("CNXL" === value) {
      return "table-secondary";
    } else if ("CMPL" === value) {
      return "table-success";
    } else if ("EXP" === value) {
      return "table-warning";
    }
  }
}
