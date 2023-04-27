import { Component, OnInit } from '@angular/core';
import { Coffee } from './coffee';
import { CoffeeService } from './coffee.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css'],
})
export class CoffeeComponent implements OnInit {
  public coffees: Array<Coffee> = [];

  constructor(private coffeeService: CoffeeService) {}

  getCoffees(): void {
    this.coffeeService.getCoffees().subscribe((coffees) => {
      this.coffees = coffees;
      console.log(this.coffees);
    });
  }

  ngOnInit() {
    this.getCoffees();
  }
}
