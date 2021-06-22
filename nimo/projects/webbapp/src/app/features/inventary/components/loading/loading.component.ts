import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';
@Component({
  selector: 'leo-loading',
  templateUrl: './loading.component.html',
  styles: []
})
export class LoadingComponent implements OnInit {
  constructor(private loadingService: LoadingService) {}
  ngOnInit(): void {}
  message$ = this.loadingService.message.pipe(
    map(message => {
      return message ? message : 'Loading...';
    })
  );
}
