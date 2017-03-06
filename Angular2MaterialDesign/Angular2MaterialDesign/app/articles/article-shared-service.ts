import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class ArticleSharedService {
    // Observable string sources
    private emitChangeSource = new Subject<any>();
    // Oservable string streams
    changeEmitted = this.emitChangeSource.asObservable();
    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }
}