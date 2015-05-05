/*
    
asset object should look like:

{

    test: function(){ return true },  // conditional load

    url: '/path/to/script.js',  // or /path/to/style.css

    onload: function(){}

    onerror: function(){}

}


*/

export default (function() {
    
    var assets = {},


        load = function(asset) {

            let element;

            if(/\.js$/i.test(asset.url) ) {
                element = loadScript(asset.url);
            }

            if(/\.css$/i.test(asset.url)) {
                element = loadCss(asset.url);
            }

            if(asset.onload){
                element.addEventListener('load', asset.onload);
            }

            if(asset.onerror){
                element.addEventListener('error', asset.onerror);
            }

            element.addEventListener('load', () => assets[ asset.url ] );

            document.head.appendChild(element);
        },

        loadScript = function(src) {
            let script = document.createElement('script');
            script.setAttribute('src', src);
            return script;
        },

        loadCss = function(href) {
            let link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', href);
            return link;
        };

    return function(assetObj) {
        if( assets[ assetObj.url ] === undefined && assetObj.test === undefined || assetObj.test() ) {
            assetObj.forEach(load);
        }
    };


})();