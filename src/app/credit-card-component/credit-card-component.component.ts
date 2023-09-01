import { Component, Input } from '@angular/core';
import { IBankAccount } from '../_models/ibank-account';

@Component({
  selector: 'app-credit-card-component',
  templateUrl: './credit-card-component.component.html',
  styleUrls: ['./credit-card-component.component.scss']
})
export class CreditCardComponentComponent {
  @Input() account:IBankAccount;
  constructor(){}
}
