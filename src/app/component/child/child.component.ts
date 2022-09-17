import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent
  implements OnInit, OnChanges, DoCheck, AfterContentInit
{
  @Input() master = '';
  @Output() sendChildData = new EventEmitter<any>();

  public sendParentData: string;

  constructor() {}

  /**
   * @description : vue mounted
   */
  ngOnInit() {
    console.log('child ngOnInit');
    this.sendParentData = '';
  }

  /**
   * @description : @Input(vue에서의 props)의 값이 변경되었을때 사용된다.
   */
  ngOnChanges(changes: SimpleChanges) {
    console.log('child ngOnChanges : ', changes);
  }

  ngDoCheck() {
    console.log('child ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('child ngAfterContentInit');
  }

  /**################## method  ##################*/
  sendParent() {
    this.sendChildData.emit(this.sendParentData);
  }
}
