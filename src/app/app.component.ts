import { Component, Inject, Input, OnInit } from '@angular/core';
import { Card } from './models/card.model';
import { CardService } from './service/card.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Input() inputcard: Card = {
    id: 0,
    card: "",
    cardType: "",
    cvc: "",
    monthOfExpiry: "",
    yearOfExpiry: "",
    date: new Date()
  }


  constructor(private cardService: CardService) {
  }

 


  regex_message: any = ""
  error_message: any = "";
  err: boolean = false;
  title = 'form';
  format = new RegExp('[0-9]+$');
  cards:Card[] = [];

  ngOnInit(): void {
    if (localStorage.getItem("card")) {
      // this.inputcard.card = localStorage.getItem("card");
    }
    this.cardService.getCreditCard().subscribe(res=>{
      if(res){
        this.cards = res;
        console.log(res);
      }
    }, err=>{
      console.log(err.error);
    })
    
  }
  onKey(e: any) {
    if (e.target.value) {
      var card = e.target.value;
      this.validateCard(card);
    }
  }
  validateCard(card: any) {
    if (!this.format.test(card)) {
      this.err = true;
      this.regex_message = "Please enter digits from 0 to 9 only!";
      this.inputcard.cardType = "";
    }
    else {
      this.err = false;
      this.regex_message = "";
    }


    if (card.charAt(0) == '4') {
      this.inputcard.cardType = "Visa Card detetected.";
    }
    else if (card.charAt(0) == '5') {
      this.inputcard.cardType = "Master Card detetected.";
    }
    else if (card.substring(0, 2) == '37') {
      this.inputcard.cardType = "American Express Card detetected.";
    }
    else {
      this.inputcard.cardType = "";
    }


    if (card.length < 13 || card.length > 16) {
      this.err = true;
      this.error_message = "Enter Valid Card Number";
      this.inputcard.cardType = "";
    }
    else {

      this.error_message = "";

      if (!this.format.test(card)) {
        this.err = true;
        this.regex_message = "Please enter digits from 0 to 9 only!";
        this.inputcard.cardType = "";
      }
      else {
        this.err = false;
        this.regex_message = "";
        localStorage.setItem("card", this.inputcard.card);
      }

    }
  }

  submit() {
    // if(this.inputcard.card!="" && this.inputcard.cvc!="" && this.inputcard.yearOfExpiry!="" && 
    //   this.inputcard.cardType!="" && this.inputcard.monthOfExpiry!="" )
    this.cardService.addCreditCard(this.inputcard).subscribe(res => {
      console.log(res);
    },
      err => {
        console.log(err.error);
  });
}


}
// A credit card number must have between 13 and 16 digits. It must start with:

// 4 for Visa cards

// 5 for Master cards

// 37 for American Express cards
