import { Component, OnInit} from '@angular/core';
import { ArticleService } from './article-service';
import { ArticleSharedService } from './article-shared-service';
import { Observable } from 'rxjs/Rx';

import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-sources',
    templateUrl: 'app/articles/article-sources.component.html'
})

export class ArticleSourcesComponent implements OnInit {
    private sources: Observable<any>;

    constructor(private articleService: ArticleService, private activeRoute: ActivatedRoute, private articleSharedService: ArticleSharedService)
    {
        this.sources = this.articleService.sources;
    }

    ngOnInit() {
        this.articleService.getSources();
        this.activeRoute.params.subscribe(params => {
            const sourceKey = params['sourceKey'];
            this.articleSharedService.emitChange(sourceKey);
            this.articleService.updateArticles(sourceKey);
        })
    }
}