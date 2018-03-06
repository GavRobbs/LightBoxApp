import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the PatternComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pattern',
  templateUrl: 'pattern.html'
})
export class PatternComponent {

  pcode : string;
  sdelay : number;

  constructor(public vCtrl : ViewController) {
    this.sdelay = 500;
    this.pcode = "";
  }

  Cancel(){
    let data = {result: "cancel"};
    this.vCtrl.dismiss(data);
  }

  Accept(){
    let data = {result: "confirm", pattern: this.pcode.toLowerCase(), delay: this.sdelay}
    this.vCtrl.dismiss(data);
  }

}
