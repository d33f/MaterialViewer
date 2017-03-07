"use strict";
class Article {
    constructor(title, description, imageUrl, hide, votes) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.hide = hide;
        this.votes = votes;
        this.votes = votes || 0;
        this.publishedAt = new Date();
        this.hide = false;
    }
    // Article.fromJSON()
    static fromJSON(json) {
        let article = Object.create(Article.prototype);
        return Object.assign(article, json, {
            votes: json.votes ? json.votes : 0,
            imageUrl: json.urlToImage,
            publishedAt: json.publishedAt ? new Date(json.publishedAt) : new Date(),
            hide: false
        });
    }
}
exports.Article = Article;
//# sourceMappingURL=article.js.map