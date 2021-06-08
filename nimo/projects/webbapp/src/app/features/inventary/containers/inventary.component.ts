import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'leo-inventary',
  templateUrl: './inventary.component.html',
  styleUrls: ['./../styles/inventary.component.scss'],
})
export class InventaryComponent implements OnInit {
  categories = ['gaseosas', 'inergumenos', 'lacteos'];

  constructor() {}

  ngOnInit(): void {}
}
