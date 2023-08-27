import {Injectable} from '@angular/core';
import {Item} from "../Types";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {

  items: Item[] = [];

  constructor( ) {
    console.log("Hello GroceriesServiceProvider Provider");

  }

  getItems(){
    return this.items;
  }

  removeItem(index: number){
    this.items.splice(index, 1)
  }

  addItem(item: Item){
    this.items.push(item);
  }

  editItem(item: Item, index: number) : void{
    this.items[index] = item;
  }
}
