import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { Article } from './article';

interface ArticleSortFn {
    (a: Article, b: Article): number;
}

interface ArticleSortOrderFn {
    (direction: number): ArticleSortFn;
}

const sortByTime: ArticleSortOrderFn = (direction: number) => (a: Article, b: Article) => {
    return direction *
        (b.publishedAt.getTime() - a.publishedAt.getTime());
};

const sortByVotes: ArticleSortOrderFn = (direction: number) => (a: Article, b: Article) => {
    return direction * (b.votes - a.votes);
};

const sortFns = {
    'Time': sortByTime,
    'Votes': sortByVotes
};

@Injectable()
export class ArticleService {
    private _articles: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
    // Sorting
    private _sortByDirectionSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    private _sortByFilterSubject: BehaviorSubject<ArticleSortOrderFn> = new BehaviorSubject<ArticleSortOrderFn>(sortByTime);
    // Search filter
    private _sortBySearchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
    // News sources
    private _sources: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    // Used when sources are being updated
    private _refreshSubject: BehaviorSubject<string> = new BehaviorSubject<string>('reddit-r-all');

    public sources: Observable<any> = this._sources.asObservable();
    public articles: Observable<Article[]> = this._articles.asObservable();
    public orderedArticles: Observable<Article[]>;

    constructor(private http: Http) {
        this._refreshSubject.subscribe(this.getArticles.bind(this));

        this.orderedArticles = Observable.combineLatest(
            this._articles,
            this._sortByDirectionSubject,
            this._sortByFilterSubject,
            this._sortBySearchSubject
        )
            .map(([
                articles, direction, sorter, searchStr
            ]) => {
                const re = new RegExp(searchStr, 'gi');
                return articles
                    .filter(a => re.exec(a.title))
                    .sort(sorter(direction));
            });
    }

    public sortBy(filter: string, direction: number): void {
        this._sortByDirectionSubject.next(direction);
        this._sortByFilterSubject.next(sortFns[filter]);
    }

    public filterBy(filter: string) {
        this._sortBySearchSubject.next(filter);
    }

    public updateArticles(sourceKey: string): void {
        this._refreshSubject.next(sourceKey);
    }



    // New Observer pattern
    public getArticles(sourceKey = 'reddit-r-all'): void {
        // make the http request -> Observable
        // convert response into article class
        // update our subject

        this._makeHttpRequest('/v1/articles', sourceKey)
            .map(json => json.articles)
            .subscribe(articlesJSON => {
                const articles = articlesJSON.map((articlejson: any) => Article.fromJSON(articlejson));
                this._articles.next(articles);
                console.dir(articles);
            })
    }

    public getSources(): void {
        this._makeHttpRequest('/v1/sources')
            .map(json => json.sources)
            .filter(list => list.length > 0)
            .subscribe(this._sources);
    }

    private _makeHttpRequest(path: string, sourceKey?: string): Observable<any> {
        let params = new URLSearchParams();
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
}