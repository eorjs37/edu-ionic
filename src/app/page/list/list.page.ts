import { Component, OnInit } from '@angular/core';
import { ApiService } from '@/app/service/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  public coffeeList: any;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getCoffeAll().subscribe(
      (res) => {
        this.coffeeList = res;
      },
      (error) => {
        console.error('error : ', error);
      },
      () => console.log('HTTP request completed.')
    );
  }
}
