import { Component, OnInit, Input, EventEmitter, ElementRef, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { YouTubeService } from '../youtube/youtube-service';
import { SearchResult } from '../youtube/searchResult';

@Component({
    selector: 'app-header-youtube',
    templateUrl: 'app/header/app-header-youtube.component.html'
})

export class AppHeaderYouTubeComponent implements OnInit {
    public loadingGif: string = '/app/assets/loading.gif';
    public loading: boolean;
    @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

    constructor(private youtubeService: YouTubeService, private el: ElementRef) { }

    liveSearch(event: any) {
        console.dir(event);
        // convert the `keyup` event into an observable stream
        Observable.fromEvent(this.el.nativeElement, 'keyup')
            .map((e: any) => e.target.value) // extract the value of the input
            .filter((text: string) => text.length > 1) // filter out if empty
            .debounceTime(250)                         // only once every 250ms
            .do(() => this.loading = true)         // enable loading
            // search, discarding old events if new input comes in
            .map((query: string) => this.youtubeService.search(query))
            .switch()
            // act on the return of the search
            .subscribe(
            (results: SearchResult[]) => { // on sucesss
                this.loading = false;
                this.results.next(results);
            },
            (err: any) => { // on error
                console.log(err);
                this.loading = false;
            },
            () => { // on completion
                this.loading = false;
            }
            );

        //this.articleService.filterBy(value);
    }

    _updateSort() {
        //this.articleService.sortBy(this.currentFilter, this.sortDirection);
    }
    ngOnInit()
    { }
}