import { EventEmitter, Injectable } from "@angular/core";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()
export class NotificationService {

    notifier = new EventEmitter<string>()
    loader: Ng4LoadingSpinnerService

    constructor(loader: Ng4LoadingSpinnerService) {
        this.loader = loader;
    }

    notify(message: string) {
        this.notifier.emit(message)
    }

    startLoader(value: boolean) {
        if(value) {
            this.loader.show();
        } else {
            this.loader.hide();
        }
    }

}