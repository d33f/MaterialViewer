
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { SearchResult } from './searchResult';

@Injectable()
export class YouTubeService {
    private YOUTUBE_API_KEY: string = 'AIzaSyAaMmIgWQJdQ649d97Xbf1N5yd2iYTO4mI';
    private YOUTUBE_API_URL: string = 'https://www.googleapis.com/youtube/v3/search';

    constructor(private http: Http)
    {
    }

    search(query: string): Observable<SearchResult[]> {
        console.log('received search query for YB: ' + query);
        let params: string = [
            `q=${query}`,
            `key=${this.YOUTUBE_API_KEY}`,
            `part=snippet`,
            `type=video`,
            `maxResults=50`
        ].join('&');

        let queryUrl: string = `${this.YOUTUBE_API_URL}?${params}`;
        return this.http.get(queryUrl)
            .map((response: Response) =>
            {
                return (<any>response.json()).items.map(item =>
                {
                    return new SearchResult(
                        {
                            id: item.id.videoId,
                            title: item.snippet.title,
                            description: item.snippet.description,
                            thumbnailUrl: item.snippet.thumbnails.high.url
                        })
                })
            })

    }

}