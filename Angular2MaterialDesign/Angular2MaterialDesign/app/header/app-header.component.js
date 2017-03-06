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
const article_service_1 = require('../articles/article-service');
let AppHeaderComponent = class AppHeaderComponent {
    constructor(articleService) {
        this.articleService = articleService;
        this.currentFilter = 'Time';
        this.sortDirection = 1;
    }
    changeDirection() {
        this.sortDirection = this.sortDirection * -1;
        this._updateSort();
    }
    getDirection() {
        return this.sortDirection;
    }
    changeSort(filter) {
        if (filter === this.currentFilter) {
            this.changeDirection();
        }
        else {
            this.currentFilter = filter;
            this._updateSort();
        }
    }
    liveSearch(event) {
        const value = event.target.value;
        this.articleService.filterBy(value);
    }
    _updateSort() {
        this.articleService.sortBy(this.currentFilter, this.sortDirection);
    }
    ngOnInit() { }
};
AppHeaderComponent = __decorate([
    core_1.Component({
        selector: 'app-header',
        templateUrl: 'app/header/app-header.component.html'
    }), 
    __metadata('design:paramtypes', [article_service_1.ArticleService])
], AppHeaderComponent);
exports.AppHeaderComponent = AppHeaderComponent;
//# sourceMappingURL=app-header.component.js.map