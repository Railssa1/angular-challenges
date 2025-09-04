import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [data]="cities()"
      [cardType]="cardType"
      customClass="bg-light-gray">
      <img
        slot="image"
        ngSrc="assets/img/city.png"
        width="200"
        height="200"
        priority />

      <button
        slot="button"
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
  `,
  imports: [CardComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  http = inject(FakeHttpService);
  store = inject(CityStore);

  cities = this.store.cities;
  cardType = CardType.CITY;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }
}
