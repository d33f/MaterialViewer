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
const article_service_1 = require('./article-service');
const article_shared_service_1 = require('./article-shared-service');
const router_1 = require('@angular/router');
let ArticleSourcesComponent = class ArticleSourcesComponent {
    constructor(articleService, activeRoute, articleSharedService) {
        this.articleService = articleService;
        this.activeRoute = activeRoute;
        this.articleSharedService = articleSharedService;
        this.sources = this.articleService.sources;
    }
    ngOnInit() {
        this.articleService.getSources();
        this.activeRoute.params.subscribe(params => {
            const sourceKey = params['sourceKey'];
            this.articleSharedService.emitChange(sourceKey);
            this.articleService.updateArticles(sourceKey);
        });
    }
};
ArticleSourcesComponent = __decorate([
    core_1.Component({
        selector: 'app-sources',
        templateUrl: 'app/articles/article-sources.component.html'
    }), 
    __metadata('design:paramtypes', [article_service_1.ArticleService, router_1.ActivatedRoute, article_shared_service_1.ArticleSharedService])
], ArticleSourcesComponent);
exports.ArticleSourcesComponent = ArticleSourcesComponent;
//# sourceMappingURL=article-sources.component.js.map