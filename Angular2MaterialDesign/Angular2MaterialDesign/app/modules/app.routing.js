"use strict";
const router_1 = require('@angular/router');
const article_sources_component_1 = require('../articles/article-sources.component');
const appRoutes = [
    {
        path: '',
        redirectTo: 'news/reddit-r-all',
        pathMatch: 'full'
    },
    {
        path: 'news/:sourceKey',
        component: article_sources_component_1.ArticleSourcesComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map