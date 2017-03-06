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
const http_1 = require('@angular/http');
const Rx_1 = require('rxjs/Rx');
const article_1 = require('./article');
const sortByTime = (direction) => (a, b) => {
    return direction *
        (b.publishedAt.getTime() - a.publishedAt.getTime());
};
const sortByVotes = (direction) => (a, b) => {
    return direction * (b.votes - a.votes);
};
const sortFns = {
    'Time': sortByTime,
    'Votes': sortByVotes
};
let ArticleService = class ArticleService {
    constructor(http) {
        this.http = http;
        this._articles = new Rx_1.BehaviorSubject([]);
        // Sorting
        this._sortByDirectionSubject = new Rx_1.BehaviorSubject(1);
        this._sortByFilterSubject = new Rx_1.BehaviorSubject(sortByTime);
        // Search filter
        this._sortBySearchSubject = new Rx_1.BehaviorSubject('');
        // News sources
        this._sources = new Rx_1.BehaviorSubject([]);
        // Used when sources are being updated
        this._refreshSubject = new Rx_1.BehaviorSubject('reddit-r-all');
        this.sources = this._sources.asObservable();
        this.articles = this._articles.asObservable();
        this._refreshSubject.subscribe(this.getArticles.bind(this));
        this.orderedArticles = Rx_1.Observable.combineLatest(this._articles, this._sortByDirectionSubject, this._sortByFilterSubject, this._sortBySearchSubject)
            .map(([articles, direction, sorter, searchStr]) => {
            const re = new RegExp(searchStr, 'gi');
            return articles
                .filter(a => re.exec(a.title))
                .sort(sorter(direction));
        });
    }
    sortBy(filter, direction) {
        this._sortByDirectionSubject.next(direction);
        this._sortByFilterSubject.next(sortFns[filter]);
    }
    filterBy(filter) {
        this._sortBySearchSubject.next(filter);
    }
    updateArticles(sourceKey) {
        this._refreshSubject.next(sourceKey);
    }
    // New Observer pattern
    getArticles(sourceKey = 'reddit-r-all') {
        // make the http request -> Observable
        // convert response into article class
        // update our subject
        this._makeHttpRequest('/v1/articles', sourceKey)
            .map(json => json.articles)
            .subscribe(articlesJSON => {
            const articles = articlesJSON.map((articlejson) => article_1.Article.fromJSON(articlejson));
            this._articles.next(articles);
            console.dir(articles);
        });
    }
    getSources() {
        this._makeHttpRequest('/v1/sources')
            .map(json => json.sources)
            .filter(list => list.length > 0)
            .subscribe(this._sources);
    }
    _makeHttpRequest(path, sourceKey) {
        let params = new http_1.URLSearchParams();
        params.set('apiKey', 'ec077c2f444b4944bbc8f2f1ac938977');
        //if (sourceKey && sourceKeys !== '')
        //{
        //    params.set('source', sourceKey);
        //}
        if (sourceKey !== '') {
            params.set('source', sourceKey);
        }
        return this.http
            .get(`${'https://newsapi.org'}${path}`, { search: params })
            .map(a => a.json());
    }
};
ArticleService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article-service.js.map