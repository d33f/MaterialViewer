"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const Rx_1 = require('rxjs/Rx');
const youtube_service_1 = require('../youtube/youtube-service');
let AppHeaderYouTubeComponent = class AppHeaderYouTubeComponent {
    constructor(youtubeService, el) {
        this.youtubeService = youtubeService;
        this.el = el;
        this.loadingGif = 'http://i.imgur.com/AcGrX5w.gif';
        this.results = new core_1.EventEmitter();
    }
    liveSearch(event) {
        console.dir(event);
        // convert the `keyup` event into an observable stream
        Rx_1.Observable.fromEvent(this.el.nativeElement, 'keyup')
            .map((e) => e.target.value) // extract the value of the input
            .filter((text) => text.length > 1) // filter out if empty
            .debounceTime(250) // only once every 250ms
            .do(() => this.loading = true) // enable loading
            .map((query) => this.youtubeService.search(query))
            .switch()
            .subscribe((results) => {
            this.loading = false;
            this.results.next(results);
        }, (err) => {
            console.log(err);
            this.loading = false;
        }, () => {
            this.loading = false;
        });
        //this.articleService.filterBy(value);
    }
    _updateSort() {
        //this.articleService.sortBy(this.currentFilter, this.sortDirection);
    }
    ngOnInit() { }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], AppHeaderYouTubeComponent.prototype, "results", void 0);
AppHeaderYouTubeComponent = __decorate([
    core_1.Component({
        selector: 'app-header-youtube',
        templateUrl: 'app/header/app-header-youtube.component.html'
    }), 
    __metadata('design:paramtypes', [youtube_service_1.YouTubeService, core_1.ElementRef])
], AppHeaderYouTubeComponent);
exports.AppHeaderYouTubeComponent = AppHeaderYouTubeComponent;
//# sourceMappingURL=app-header-youtube.component.js.map
