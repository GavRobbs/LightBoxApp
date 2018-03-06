import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { PatternComponent } from '../../components/pattern/pattern';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  white : boolean;
  red : boolean;
  green : boolean;
  blue : boolean;
  orange : boolean;
  yellow : boolean;
  blink : boolean;
  delay : number;
  pattern_sent : boolean;
  pattern : string;
  psdelay : number;

  myserver = "localhost:3000";

  constructor(public navCtrl: NavController, private myhttp : HttpClient, public mdctrl : ModalController) {
    this.pattern_sent = false;
    this.white = false;
    this.red = false;
    this.green = false;
    this.blue = false;
    this.orange = false;
    this.yellow = false;
    this.blink = false;
    this.delay = 0;
    this.psdelay = 0;
    this.pattern = "";
  }

  Reset(){
    this.pattern_sent = false;
    this.white = false;
    this.red = false;
    this.green = false;
    this.blue = false;
    this.orange = false;
    this.yellow = false;
    this.blink = false;
    this.delay = 0;
    this.psdelay = 0;
    this.pattern = "";
  }

  Update(){
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
    if(!this.pattern_sent){
      this.myhttp.post("https://fathomless-sands-81815.herokuapp.com/update", {type: "nopattern", data_out: {
        color_array : this.CreateColorArray(),
        blink : +this.blink,
        blink_delay : this.delay
      }}, httpOptions).subscribe((result : any) => {
        if(result.result == "valid"){
          alert("Press the reset button and take a look at the lights!");
        }
      });
    } else{
      this.myhttp.post("https://fathomless-sands-81815.herokuapp.com/update", {type: "pattern", data_out: {
        pattern_code: this.pattern,
        pattern_switch_delay : this.psdelay
      }}, httpOptions).subscribe((result : any) => {
        if(result.result == "valid"){
          alert("Press the reset button and take a look at the lights!");
        }
      });
    }
  }

  CreateColorArray(){
    return [+this.white, +this.red, +this.green, +this.orange, +this.blue, +this.yellow];
  }

  OpenPatternMenu(){
    let patbox = this.mdctrl.create(PatternComponent);
    patbox.onDidDismiss(data => {
      if(data.result == "confirm"){
        this.pattern_sent = true;
        this.pattern = data.pattern;
        this.psdelay = data.delay;
      }

    });
    patbox.present();
  }

}
