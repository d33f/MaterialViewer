interface ArticleJSON {
    title: string;
    url: string;
    votes: number;
    publishedAt: string;
    description: string;
    author: string;
    urlToImage: string;
}

export class Article {

    publishedAt: Date;

    // Article.fromJSON()
    static fromJSON(json: ArticleJSON): Article {
        let article = Object.create(Article.prototype);
        return Object.assign(article, json, {
            votes: json.votes ? json.votes : 0,
            imageUrl: json.urlToImage,
            publishedAt: json.publishedAt ? new Date(json.publishedAt) : new Date(),
            hide: false
        });
    }

    constructor(
        public title: string,
        public description: string,
        public imageUrl: string,
        public hide: boolean,
        public votes?: number,

    ) {
        this.votes = votes || 0;
        this.publishedAt = new Date();
        this.hide = false;
    }
}
