import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from '../app.component';
import { ArticleSourcesComponent } from '../articles/article-sources.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'news/reddit-r-all',
        pathMatch: 'full'
    },
    {
        path: 'news/:sourceKey',
        component: ArticleSourcesComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);