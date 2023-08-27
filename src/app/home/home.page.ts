import {Component} from '@angular/core';
import {Item} from "../../Types";
import {GroceriesServiceService} from "../groceries-service.service";
import {ToastController} from "@ionic/angular";
import {InputDialogServiceService} from "../input-dialog-service.service";
import {Share, SharePlugin, ShareResult} from "@capacitor/share";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  title: String =  "Grocery";
  loadItems(): Item[] {
    return this.dataService.getItems();
  }

  async handleEdit(item: Item, index: number) {
    console.log("Edit Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: `Editing Item - ${index} ...`,
      duration: 3000
    })
    await toast.present();
    await this.inputDialogService.showPrompt(item, index);
  }

  async handleRemove(item: Item, index: number)  {
      console.log("Removing Item - ", item, index);
      const toast = await this.toastCtrl.create({
        message: `Removing Item - ${index} ...`,
        duration: 3000
      });
      await toast.present();
      this.dataService.removeItem(index);
  }

  async shareItem(item: Item, index: number)   {
    try{
      console.log("share item");
      await Share.canShare();
      await Share.share({
        title: "Grocery Item",
        text: `Item Name: ${item.name}, Item Quantity: ${item.quantity}`,
        url: "",
        dialogTitle: ""
      })
    }catch(err){
      console.log("could not share - ", err);
    }

  }

  async handleAdd() {
    await this.inputDialogService.showPrompt();
  }

  constructor(public dataService: GroceriesServiceService, public toastCtrl: ToastController, public inputDialogService: InputDialogServiceService) {
  }

}
