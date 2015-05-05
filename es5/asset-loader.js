"use strict";

(function () {
    "use strict";

    var es6$asset$loader$$default = (function () {

        var assets = {},
            load = function load(asset) {

            var element = undefined;

            if (/\.js$/i.test(asset.url)) {
                element = loadScript(asset.url);
            }

            if (/\.css$/i.test(asset.url)) {
                element = loadCss(asset.url);
            }

            if (asset.onload) {
                element.addEventListener("load", asset.onload);
            }

            if (asset.onerror) {
                element.addEventListener("error", asset.onerror);
            }

            element.addEventListener("load", function () {
                return assets[asset.url];
            });

            document.head.appendChild(element);
        },
            loadScript = function loadScript(src) {
            var script = document.createElement("script");
            script.setAttribute("src", src);
            return script;
        },
            loadCss = function loadCss(href) {
            var link = document.createElement("link");
            link.setAttribute("rel", "stylesheet");
            link.setAttribute("href", href);
            return link;
        };

        return function (assetObj) {
            if (assets[assetObj.url] === undefined && assetObj.test === undefined || assetObj.test()) {
                assetObj.forEach(load);
            }
        };
    })();
}).call(undefined);