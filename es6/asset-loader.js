/*
    
asset object should look like:

{
    test: function(){ return true } // conditional load
    assets: ["file.js", "file.css"]
}


*/

export default function() {
    
    var assets = {},

        notify = function(e) {
            // stop from double loading

            // dispatch event
        },

        load = function(src) {
            if(/\.js$/i.test(src) ) {
                return loadScript(src);
            }

            if(/\.css$/i.test(src)) {
                return loadCss(src);
            }
        },

        loadScript = function(src) {
            var script = document.createElement('script');
            script.addEventListener("load", notify(src));
            document.body.appendChild(script);
            script.setAttribute('src', src);
        },

        loadCss = function(href) {
            var link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.addEventListener("load", notify(href));
            document.head.appendChild(link);
            link.setAttribute('href', href);
        },

        add = function(assetObj) {
            if( !assetObj.test || assetObj.test() ) {
                assetObj.forEach(load);
            }
        };

}