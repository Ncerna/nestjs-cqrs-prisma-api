import { Price } from '../value-objects/price.vo';
import { Stock } from '../value-objects/stock.vo';
export class Product {
  private _events: any[] = [];

  constructor(
    public id: number | null,
    public name: string,
    public price: Price,
    public stock: Stock,
    public categoryId: number,
  ) {
  }



  get events() {
    return this._events;
  }
}