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
const platform_browser_1 = require('@angular/platform-browser');
const http_1 = require('@angular/http');
const material_1 = require('@angular/material');
require('hammerjs');
const ng2_pagination_1 = require('ng2-pagination');
const app_component_1 = require('../app.component');
const app_header_component_1 = require('../header/app-header.component');
const article_sources_component_1 = require('../articles/article-sources.component');
const article_service_1 = require('../articles/article-service');
const article_shared_service_1 = require('../articles/article-shared-service');
const app_header_youtube_component_1 = require('../header/app-header-youtube.component');
const youtube_service_1 = require('../youtube/youtube-service');
const ng2_youtube_player_mini_1 = require('ng2-youtube-player-mini');
const app_routing_1 = require('./app.routing');
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, material_1.MaterialModule, http_1.HttpModule, app_routing_1.routing, ng2_youtube_player_mini_1.YoutubePlayerMiniModule, ng2_pagination_1.Ng2PaginationModule],
        declarations: [app_component_1.AppComponent, app_header_component_1.AppHeaderComponent, app_header_youtube_component_1.AppHeaderYouTubeComponent, article_sources_component_1.ArticleSourcesComponent],
        bootstrap: [app_component_1.AppComponent],
        providers: [article_service_1.ArticleService, article_shared_service_1.ArticleSharedService, youtube_service_1.YouTubeService]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map