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
const article_service_1 = require('./articles/article-service');
const article_shared_service_1 = require('./articles/article-shared-service');
const platform_browser_1 = require('@angular/platform-browser');
let AppComponent = class AppComponent {
    constructor(articleService, articleSharedService, sanitizer) {
        this.articleService = articleService;
        this.articleSharedService = articleSharedService;
        this.sanitizer = sanitizer;
        this.videosPerPage = 5;
        this.articlesFromService = articleService.orderedArticles;
        this.articleSharedService.changeEmitted.subscribe(changedSourceMessage => {
            this.currentSource = changedSourceMessage;
        });
    }
    //constructor(private http: Http)
    //{
    //    this.http.get('app/data/data.json')
    //        .map(response => response.json().screenshots)
    //        .subscribe(data => this.spaceScreens = data);
    //}
    likeMe(article) {
        article.votes += 1;
    }
    dislikeMe(article) {
        article.votes -= 1;
    }
    deleteMe(article) {
        article.hide = true;
    }
    switchTab(tabEvent) {
        if (tabEvent.tab.textLabel.toLowerCase() === 'youtube') {
            this.currentSource = 'YouTube';
        }
    }
    receiveResults(event) {
        console.log('results received');
        console.dir(event);
        this.videosFromService = event;
    }
    goToSource(article) {
        window.open(article.url, '_blank');
    }
    pagesChanged(event) {
        this.videosPerPage = event.value;
    }
    clearCache() {
        this.videosFromService = null;
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/app.component.template.html'
    }), 
    __metadata('design:paramtypes', [article_service_1.ArticleService, article_shared_service_1.ArticleSharedService, platform_browser_1.DomSanitizer])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map