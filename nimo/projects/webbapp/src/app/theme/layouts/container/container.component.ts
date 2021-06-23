import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'leo-container',
  template: `
    <div class="container">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['../styles.scss']
})
export class ContainerComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  /**
   * MODES  =  full
   * NORMAL =
   */
}
