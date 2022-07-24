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

  @Input() card: Card = {
    card_no: "",
    card_type: "",
    fromDate: new Date()
  }


  constructor(private cardService: CardService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("card_no")) {
      this.card.card_no = localStorage.getItem("card_no");
    }
  }


  regex_message: any = ""
  error_message: any = "";
  err: boolean = false;
  title = 'form';
  format = new RegExp('[0-9]+$');

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
      this.card.card_type = "";
    }
    else {
      this.err = false;
      this.regex_message = "";
    }


    if (card.charAt(0) == '4') {
      this.card.card_type = "Visa Card detetected.";
    }
    else if (card.charAt(0) == '5') {
      this.card.card_type = "Master Card detetected.";
    }
    else if (card.substring(0, 2) == '37') {
      this.card.card_type = "American Express Card detetected.";
    }
    else {
      this.card.card_type = "";
    }


    if (card.length < 13 || card.length > 16) {
      this.err = true;
      this.error_message = "Enter Valid Card Number";
      this.card.card_type = "";
    }
    else {

      this.error_message = "";

      if (!this.format.test(card)) {
        this.err = true;
        this.regex_message = "Please enter digits from 0 to 9 only!";
        this.card.card_type = "";
      }
      else {
        this.err = false;
        this.regex_message = "";
        localStorage.setItem("card_no", this.card.card_no);
      }

    }
  }

  submit() {
    this.cardService.addCreditCard(this.card).subscribe(res => {
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
