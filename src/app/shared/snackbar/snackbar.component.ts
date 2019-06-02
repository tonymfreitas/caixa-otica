import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { NotificationService } from "src/app/shared/notification.service";
import { timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators'


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: 0
      })),
      state('visible', style({
        opacity: 1,
        bottom: 30
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = ''
  snackVisibility: string = 'hidden'

  constructor(private notification: NotificationService) { }

  ngOnInit() {
    this.notification.notifier
      .pipe(
      tap(message => {
        this.message = message
        this.snackVisibility = 'visible'
      }), switchMap(message => timer(4000)))
      .subscribe(timer => this.snackVisibility = 'hidden')
  }

}
