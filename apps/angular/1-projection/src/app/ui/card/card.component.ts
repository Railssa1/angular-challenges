import { Component, input } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: '',
  imports: [ListItemComponent],
  standalone: true,
})
export class CardComponent {
  data = input.required<any[]>();
  cardType = input.required<CardType>();
  customClass = input('');
}
