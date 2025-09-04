import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      @if (type() === CardType.CITY) {
        {{ data().name }}
      } @else {
        {{ data().firstName }}
      }
      <button (click)="delete(data().id)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  private teacherStore = inject(TeacherStore);
  private studentStore = inject(StudentStore);

  readonly type = input.required<CardType>();
  readonly data = input.required<any>();

  readonly CardType = CardType;

  delete(id: number) {
    const type = this.type();
    if (type === CardType.TEACHER) {
      this.teacherStore.deleteOne(id);
    } else if (type === CardType.STUDENT) {
      this.studentStore.deleteOne(id);
    }
  }
}
