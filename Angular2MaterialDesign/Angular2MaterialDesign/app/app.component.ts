import { Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Article } from './articles/article';
import { ArticleService } from './articles/article-service';
import { ArticleSharedService } from './articles/article-shared-service';

import { SearchResult } from './youtube/searchResult';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.template.html'
})


export class AppComponent{
    articlesFromService: Observable<Article[]>;
    videosFromService: Observable<SearchResult[]>;

    // Current new source
    currentSource: string;

    public videosPerPage: number = 5;

    constructor(private articleService: ArticleService, private articleSharedService: ArticleSharedService, private sanitizer: DomSanitizer)
    {
        this.articlesFromService = articleService.orderedArticles;
        this.articleSharedService.changeEmitted.subscribe(
            changedSourceMessage => {
                this.currentSource = changedSourceMessage;
            }
        )
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

    dislikeMe(article)
    {
        article.votes -= 1;
    }

    deleteMe(article)
    {
        article.hide = true;
    }

    switchTab(tabEvent: any) {
        if (tabEvent.tab.textLabel.toLowerCase() === 'youtube')
        {
            this.currentSource = 'YouTube';
        }
    }

    receiveResults(event: any)
    {
        console.log('results received');
        console.dir(event);
        this.videosFromService = event;
    }

    goToSource(article)
    {
        window.open(article.url, '_blank');
    }

    pagesChanged(event: any)
    {
        this.videosPerPage = event.value;
    }

    clearCache()
    {
        this.videosFromService = null;
    }
}