import { Component, OnInit } from '@angular/core';
import { ApiService } from '@/app/service/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  public coffeeList: any = [];
  public condition: boolean;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    //
    this.condition = false;
    this.apiService.getCoffeAll().subscribe(
      (res) => {
        this.coffeeList = res;
        if (this.coffeeList.length > 0) {
          this.condition = true;
        }
      },
      (error) => {
        console.error('error : ', error);
      },
      () => console.log('HTTP request completed.')
    );
  }
}
