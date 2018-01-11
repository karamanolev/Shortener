export const API = new class {
    async createLink(fullUrl) {
        return fetch('/v1/links', {
            method: 'POST',
            body: JSON.stringify({
                url: fullUrl,
            }),
        });
    }

    async getLink(hash) {
        return fetch('/v1/links/' + encodeURIComponent(hash));
    }

    async updateLink(hash, fullUrl) {
        return fetch('/v1/links/' + encodeURIComponent(hash), {
            method: 'PATCH',
            body: JSON.stringify({
                url: fullUrl,
            }),
        });
    }

    async deleteLink(hash) {
        return fetch('/v1/links/' + encodeURIComponent(hash), {
            method: 'DELETE',
        });
    }
};
