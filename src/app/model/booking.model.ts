import { SelectedTable } from "./selected.restaurant.table.model.";

export class Booking {
  public bookingDate = new Date();
  public bookingStatus: string;
  constructor(
    public id: number,
    public userName: string,
    public totalPrice: number,
    public restaurant: any,
    public bookedTable: SelectedTable[],
    public reservationDate: Date
  ) {}
}
