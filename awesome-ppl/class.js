class User {
    constructor({ id, name, avatar_url, html_url, created_at }) {
        this.id = id;
        this.name = name;
        this.avatar_url = avatar_url;
        this.html_url = html_url;
        this.created_at = created_at;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            avatar_url: this.avatar_url,
            html_url: this.html_url,
            created_at: this.created_at,
        };
    }

    static fromJSON(data) {
        return new User(data);
    }
}

export { User };
