import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { Ng2PaginationModule } from 'ng2-pagination'; 

import { AppComponent } from '../app.component';
import { AppHeaderComponent } from '../header/app-header.component';
import { ArticleSourcesComponent } from '../articles/article-sources.component';

import { ArticleService } from '../articles/article-service';
import { ArticleSharedService } from '../articles/article-shared-service';

import { AppHeaderYouTubeComponent } from '../header/app-header-youtube.component';
import { YouTubeService } from '../youtube/youtube-service';
import { YoutubePlayerMiniModule } from 'ng2-youtube-player-mini';

import { routing } from './app.routing';

@NgModule({
    imports: [BrowserModule, MaterialModule, HttpModule, routing, YoutubePlayerMiniModule, Ng2PaginationModule],
    declarations: [AppComponent, AppHeaderComponent, AppHeaderYouTubeComponent, ArticleSourcesComponent],
    bootstrap: [AppComponent],
    providers: [ArticleService, ArticleSharedService, YouTubeService]
})

export class AppModule {}