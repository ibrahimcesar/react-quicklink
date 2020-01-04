export default function (url) {
  var hasPrefetch = function hasPrefetch() {
    var link = window.document.createElement('link');
    return link.relList && link.relList.supports && link.relList.supports('prefetch');
  };

  function viaDOM(url) {
    return new Promise(function (res, rej, link) {
      link = window.document.createElement("link");
      link.rel = "prefetch";
      link.href = url;
      link.onload = res;
      link.onerror = rej;
      document.head.appendChild(link);
    });
  }

  ;

  function viaXHR(url) {
    return new Promise(function (res, rej, req) {
      req = new XMLHttpRequest();
      req.open("GET", url, req.withCredentials = true);

      req.onload = function () {
        req.status === 200 ? res() : rej();
      };

      req.send();
    });
  } //Fetches a given URL using the Fetch API. Falls back to XMLHttpRequest if the API is not supported.


  function viaFetch(url) {
    if (window.fetch) {
      fetch(url, {
        credentials: "include"
      });
    } else {
      viaXHR(url);
    }
  }

  function start(url) {
    hasPrefetch() ? viaDOM(url).catch(function (e) {
      return console.log;
    }) : viaFetch(url).catch(function (e) {
      return console.log;
    });
  }

  start(url);
}