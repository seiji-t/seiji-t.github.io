function initalizeMap(){
//      var map, rasterLayer;
//      var canvasSupport;
      require([
        "esri/map", "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/domUtils", "esri/request",
        "dojo/parser", "dojo/number", "dojo/json", "dojo/dom",
        "dijit/registry", "plugins/RasterLayer","esri/layers/WebTiledLayer",
        "esri/config",
        "dojo/domReady!"
      ], 
        function(
        Map, ArcGISTiledMapServiceLayer,
        domUtils, esriRequest,
        parser, number, JSON, dom,
        registry, RasterLayer, WebTiledLayer, esriConfig
      ){
        parser.parse();
        // does the browser support canvas?
        canvasSupport = supports_canvas();
        map = new Map("mapCanvas", {
          center: [-99.076, 39.132],
          zoom: 3,
          basemap: "dark-gray"
        });
//      year = document.getElementById("slide").value;
//      year = document.getElementById("sliderAmount").value;
//      year = document.getElementById("slider").value
//        map.on("load");
        map.on("load", mapLoaded);
//        map.on("load", mapLoaded(0));
        function mapLoaded() {
//	  year = 1
          // Add raster layer
          if ( canvasSupport ) {
            rasterLayer = new RasterLayer(null, {
              opacity: 0.55
            });
            map.addLayer(rasterLayer);

            map.on("extent-change", redraw);
            map.on("resize", function(){});
            map.on("zoom-start", redraw);
            map.on("pan-start", redraw);
            var layersRequest = esriRequest({
//              url: './gfs.json',
              url: './temp'+year+'.json',
              content: {},
              handleAs: "json"
            });
            layersRequest.then(
              function(response) {
                windy = new Windy({ canvas: rasterLayer._element, data: response });
                redraw();
            }, function(error) {
                console.log("Error: ", error.message);
            });

          } else {
            dom.byId("mapCanvas").innerHTML = "This browser doesn't support canvas. Visit <a target='_blank' href='http://www.caniuse.com/#search=canvas'>caniuse.com</a> for supported browsers";
          }
        }
        // does the browser support canvas?
        function supports_canvas() {
          return !!document.createElement("canvas").getContext;
        }

        function redraw(){

          rasterLayer._element.width = map.width;
          rasterLayer._element.height = map.height;

          windy.stop();

          var extent = map.geographicExtent;
          setTimeout(function(){
            windy.start(
              [[0,0],[map.width, map.height]],
              map.width,
              map.height,
              [[extent.xmin, extent.ymin],[extent.xmax, extent.ymax]]
            );
          },500);
        }
      });
}

function updateMap(){
//      var map, rasterLayer;
//      var canvasSupport;
      require([
        "esri/map", "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/domUtils", "esri/request",
        "dojo/parser", "dojo/number", "dojo/json", "dojo/dom",
        "dijit/registry", "plugins/RasterLayer","esri/layers/WebTiledLayer",
        "esri/config",
        "dojo/domReady!"
      ], 
        function(
        Map, ArcGISTiledMapServiceLayer,
        domUtils, esriRequest,
        parser, number, JSON, dom,
        registry, RasterLayer, WebTiledLayer, esriConfig
      ){
        parser.parse();
        // does the browser support canvas?
        canvasSupport = supports_canvas();
        map = new Map("mapCanvas", {
          center: [-99.076, 39.132],
          zoom: 3,
          basemap: "dark-gray"
        });

	year = slide.value
        span.innerHTML = slide.value;

        map.on("load", mapLoaded);
//        map.on("load", mapLoaded(0));
        function mapLoaded() {
//        year = document.getElementById("slide").value;
//      year = 0
          // Add raster layer
          if ( canvasSupport ) {
            rasterLayer = new RasterLayer(null, {
              opacity: 0.55
            });
            map.addLayer(rasterLayer);

            map.on("extent-change", redraw);
            map.on("resize", function(){});
            map.on("zoom-start", redraw);
            map.on("pan-start", redraw);
            var layersRequest = esriRequest({
//              url: './gfs.json',
              url: './temp'+year+'.json',
              content: {},
              handleAs: "json"
            });
            layersRequest.then(
              function(response) {
                windy = new Windy({ canvas: rasterLayer._element, data: response });
                redraw();
            }, function(error) {
                console.log("Error: ", error.message);
            });

          } else {
            dom.byId("mapCanvas").innerHTML = "This browser doesn't support canvas. Visit <a target='_blank' href='http://www.caniuse.com/#search=canvas'>caniuse.com</a> for supported browsers";
          }
        }

        // does the browser support canvas?
        function supports_canvas() {
          return !!document.createElement("canvas").getContext;
        }

        function redraw(){

          rasterLayer._element.width = map.width;
          rasterLayer._element.height = map.height;

          windy.stop();

          var extent = map.geographicExtent;
          setTimeout(function(){
            windy.start(
              [[0,0],[map.width, map.height]],
              map.width,
              map.height,
              [[extent.xmin, extent.ymin],[extent.xmax, extent.ymax]]
            );
          },500);
        }
      });
}
