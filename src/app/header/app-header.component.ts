import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../articles/article-service';

@Component({
    selector: 'app-header',
    templateUrl: 'app/header/app-header.component.html'
})

export class AppHeaderComponent implements OnInit {
    private currentFilter: string =  'Time';
    private sortDirection: number = 1;

    constructor(private articleService: ArticleService) { }

    changeDirection() {
        this.sortDirection = this.sortDirection * -1;
        this._updateSort();
    }

    getDirection() {
        return this.sortDirection;
    }

    changeSort(filter: string)
    {
        if (filter === this.currentFilter)
        {
            this.changeDirection();
        }
        else
        {
            this.currentFilter = filter;
            this._updateSort();
        }
    }

    liveSearch(event: any) {
        const value = event.target.value;
        this.articleService.filterBy(value);
    }

    _updateSort() {
        this.articleService.sortBy(this.currentFilter, this.sortDirection);
    }
    ngOnInit()
    {}
}