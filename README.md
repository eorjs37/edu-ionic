# edu-ionic

## add android/ios

### android

```
ionic cordova platform add android
```

### ios

```
ionic cordova platform add ios
```

## web-serve

```
ionic serve
```

## livereload-android

```
ionic cordova run android -l
```

## livereload-ios

```
ionic cordova run ios -l --external
```

## ionic-android-build

```
ionic cordova build android
```

## ionic-ios-build

```
ionic cordova build ios
```

# Angular 사용

## LifeCycle

> 인스턴스가 생성되고 소멸되기까지의 과정을 말한다. 순서는 아래처럼 이루어진다.  
> constructor => ngOnChanges => ngOnInit => ngDoCheck => ngOnDestory  
> 코드들은 src/component/child/child.component.ts에서 확인할 수 있다.

#### ngOnChanges(vue 비교 대상 updated)

> 부모에서 받은 값들(vue로 비교하면 props에서 받은 값)을 변경될때 사용된다.

#### ngOnInit(vue 비교 대상 mounted)

> vue에서는 mounted같은 성격이며, api호출을 하거나, 값을 초기화 할때 작업 필요

#### ngDoCheck(vue 비교 대상 updated)

> 부모에서 받은 값들이 변경될때 사용되긴 하지만, 특정값이 아닌 모든값에 대해서 변경 될때 사용되므로 "ngOnChanges"을 사용하는것이 나아보인다.

#### ngOnDestory(vue 비교 대상 unmounted)

> 인스턴스 종료될때 동작하며, 보통 메모리 누수를 위해사용된다(interval사용했을때 clearInterval를 사용해줘야 할때).

#### ionic lifecycle

> ionic lifecycle도 존재하므로 참조하면 될듯하며 https://ionicframework.com/docs/angular/lifecycle 여기서 확인이 가능하다.

## @Input

> vue에서 props의 같은 역할을 한다. 부모컴퍼넌트에서 데이터를 받고 싶을때 사용

#### child.component.ts

```typescript
import { Input } from "@angular/core";
export class ChildComponent {
  @Input() master = "";
}
```

#### home.page.html

```html
<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title> MAIN </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">
  <ion-header collapse="condense">
    <ion-toolbar>
      <ion-title size="large">Blank</ion-title>
    </ion-toolbar>
  </ion-header>

  <div id="container">
    <app-child [master]="'dddd'"></app-child>
  </div>
</ion-content>
```

#### child.component.html

```html
<p>child works!</p>

<h1>{{ master }}</h1>
```

## @Output

> vue에서는 emit역할로 부모컴퍼넌트한테 값을 전달할때 사용된다.  
> 전체코드는 child.component.ts, child.component.html, home.page.html, home.page.ts를 참조하면 된다.

#### child.component.ts

```typescript
import { EventEmitter } from "@angular/core";
export class ChildComponent {
  @Output() sendChildData = new EventEmitter<any>();
  public sendParentData: string;

  sendParent() {
    this.sendChildData.emit(this.sendParentData);
  }
}
```

#### homa.page.ts

```typescript
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  public getChildSendData: string;
  constructor() {}

  ngOnInit() {
    this.getChildSendData = "";
  }

  /** method */
  onChildData($event: any) {
    console.log("$event : ", $event);
    this.getChildSendData = $event;
  }
}
```

#### home.page.html

```html
<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title> MAIN </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">
  <div class="ion-text-center">
    <h1>Parent Component</h1>
  </div>

  <app-child
    [master]="'parent data'"
    (sendChildData)="onChildData($event)"
  ></app-child>

  <div>
    <h4>자식한테서 전달받은 데이터 : {{ getChildSendData }}</h4>
  </div>
</ion-content>
```

## ngModel

> vue에서는 v-model과 같다.  
> 사용할려면 app.module.ts에서 FormsModule를 import 해줘야 한다.

```typescript
.
.
.
import { FormsModule } from '@angular/forms';
.
.
.
import { AppComponent } from './app.component';
.
.
@NgModule({
  declarations: [AppComponent],
  imports: [
    .
    .
    FormsModule,
  ],
  .
  .
  .
})
export class AppModule {}
```

> 사용 방법은 vue에서 v-model 하는것처럼 [(ngModel)]로 사용해주면 된다.

#### child.component.ts

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
  styleUrls: ["./child.component.scss"],
})
export class ChildComponent {
  public sendParentData: string;

  constructor() {}

  /**
   * @description : vue mounted
   */
  ngOnInit() {
    console.log("child ngOnInit");
    this.sendParentData = "";
  }
}
```

### child.component.html

```html
<!-- [(ngModel)]에 값을 바인딩 시켜주면 된다. -->
<div class="child">
  <ion-input
    placeholder="부모에 전달할 값을 입력하세요."
    [(ngModel)]="sendParentData"
  ></ion-input>
</div>
```
