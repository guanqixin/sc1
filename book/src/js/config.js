require.config({
    baseUrl: '/js/',
    paths: {
        'handlebars': 'lib/handlebars-v4.0.11',
        'jquery': 'lib/jquery.min',
        'index': 'page/index',
        'flexible': 'lib/flexible',
        'swiper': 'lib/swiper',
        'login': 'page/login',
        'text': 'lib/require.text',
        'temp': '../template',
        'bscroll': 'lib/bscroll.min',
        'lazyload': 'lib/jquery.lazyload',
        'search': 'page/search',
        'pageinfo': 'page/pageinfo',
        'menu': 'page/menu',
        'word': 'page/word',
        'base64': 'lib/jquery.base64'
    },
    shim: {
        'lazyload': {
            exports: 'lazyload',
            deps: ['jquery']
        },
        'base64': {
            exports: 'base64',
            deps: ['jquery']
        }
    }
});
require(['flexible']);