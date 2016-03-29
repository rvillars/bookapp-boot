export default function (app) {
    app.factory('Author', authorFactory);
    function authorFactory ($resource) {
        'ngInject';
        return $resource('api/authors/:authorId', {authorId: '@id'}, {
            'update': {method: 'PUT'},
            'query': {
                transformResponse: function (data, headers) {
                    try {
                        var embedded = JSON.parse(data)._embedded;
                        return embedded[Object.keys(embedded)[0]];
                    } catch(e) {
                        return null;
                    }
                },
                isArray: true
            }
        });
    }
}
