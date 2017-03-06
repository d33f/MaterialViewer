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
const searchResult_1 = require('./searchResult');
let YouTubeService = class YouTubeService {
    constructor(http) {
        this.http = http;
        this.YOUTUBE_API_KEY = 'AIzaSyAaMmIgWQJdQ649d97Xbf1N5yd2iYTO4mI';
        this.YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
    }
    search(query) {
        console.log('received search query for YB: ' + query);
        let params = [
            `q=${query}`,
            `key=${this.YOUTUBE_API_KEY}`,
            `part=snippet`,
            `type=video`,
            `maxResults=50`
        ].join('&');
        let queryUrl = `${this.YOUTUBE_API_URL}?${params}`;
        return this.http.get(queryUrl)
            .map((response) => {
            return response.json().items.map(item => {
                return new searchResult_1.SearchResult({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnailUrl: item.snippet.thumbnails.high.url
                });
            });
        });
    }
};
YouTubeService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], YouTubeService);
exports.YouTubeService = YouTubeService;
//# sourceMappingURL=youtube-service.js.map