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

## 1.LifeCycle

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

## 2. @Input

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

## 3. @Output

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

## 4. ngModel

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

## 5. Router

> vue에서 처럼 angular에서도 라우터가 존재한다.

### navigate

> 이동하고자 하는 화면으로 이동할때 사용된다.

#### 파라미터가 없는 경우

```typescript
export class HomePage {
  constructor(private router: Router) {}
  //이동하고자 하는 경로로 이동하고 싶을때 사용된다.
  moveRouter(path: string) {
    this.router.navigate([path]);
  }
}
```

#### 파라미터가 있는 경우

> 파라미터가 있는 경우 key:value형태로 {key:value} 형태로 던져준다.  
> 파리미터 받을 때는 ActivatedRoute를 활용하여 받을 수 있다.

```typescript
import { Router } from "@angular/router";
// 파라미터 던지는 부분
export class HomePage {
  constructor(private router: Router) {}
  //이동하고자 하는 경로로 이동하고 싶을때 사용된다.
  moveRouter(path: string) {
    this.router.navigate([path, { id: 1 }]);
  }
}

//파라미터 받는 부분
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

export class ListDetailPage implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    console.log("id : ", id);
  }
}
```

## 6. Backend 통신 부분

> angular 에서는 axios를 사용하지 않고 angular/http를 사용한다.
> 이를 위해서는 app.moudule.ts 세팅이 필요하다.

#### app.module.ts

```typescript
.
.
.
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  .
  .
  .
  imports: [
    .
    .
    .
    HttpClientModule,
  ],
  .
  .
  .
})
export class AppModule {}
```

### api 폴더 만들기

```
ionic g service service/api
```

위 명령어를 커멘트창에 입력하면 자동으로 파일을 만들어준다.

#### service/api.service.ts

```typescript
import { Injectable } from "@angular/core";
import { environment } from "@/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  //http options
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  constructor(private http: HttpClient) {}

  /**
   *
   * @returns coffeeList
   */
  getCoffeAll() {
    //사용하고자 하는 http method를 사용하면 된다.
    return this.http.get(environment.apiUrl + "coffees/all", this.httpOptions);
  }
}
```

#### list.page.ts

> 사용하고자 하는 api를 import하여 해당화면에서 사용한다.

```typescript
import { Component, OnInit } from "@angular/core";
import { ApiService } from "@/app/service/api.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.page.html",
  styleUrls: ["./list.page.scss"],
})
export class ListPage implements OnInit {
  public coffeeList: any;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    //1.subscribe를 호출해야 api를 호출한다.
    this.apiService.getCoffeAll().subscribe(
      //1-1. 응답 데이터 받는 부분
      (res) => {
        this.coffeeList = res;
      },
      //1-2. error 데이터 받는 부분
      (error) => {
        console.error("error : ", error);
      },
      //1-3. HTTP 통신이 끝나는 부분
      () => console.log("HTTP request completed.")
    );
  }
}
```

## 7. ngFor(v-for),ngIf(v-if)

> vue에서와 마찬가지로 v-for,v-if가 angular 에서는 ngFor와,ngIf를 사용할 수 있다.

#### list.page.html

```html
<ion-header>
  <ion-toolbar>
    <ion-title>list</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <!-- ngIf를 사용할수 있다. -->
  <ion-list *ngIf="condition; else elseBlock">
    <!-- ngFor를 사용할수 있다. -->
    <ion-item *ngFor="let item of coffeeList;index as i">
      <ion-label>{{ item.menuNm }} / {{ item.price }}</ion-label>
    </ion-item>
  </ion-list>

  <!-- ngIf 이외의 조건일 때 보여준다. -->
  <ng-template #elseBlock>
    <h1 class="ion-text-center">NO FOUND</h1>
  </ng-template>
</ion-content>
```
