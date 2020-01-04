import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React, { useEffect, useRef } from "react";
import FetchLink from "./FetchLink";
var effectiveTypes = ["slow-2g", "2g", "3g", "4g"];

var QuickLink = function QuickLink(_ref) {
  var to = _ref.to,
      altText = _ref.altText,
      children = _ref.children,
      titleText = _ref.titleText,
      allowedOrigins = _ref.allowedOrigins,
      connType = _ref.connType,
      rootMargin = _ref.rootMargin,
      threshold = _ref.threshold,
      rest = _objectWithoutProperties(_ref, ["to", "altText", "children", "titleText", "allowedOrigins", "connType", "rootMargin", "threshold"]);

  var refLink = useRef();
  useEffect(function () {
    var current = refLink.current;
    var allowedOptions = allowedOrigins || [window.location.hostname];
    var allowed = allowedOptions === current.hostname;
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var type = connection.effectiveType;
    var thresholdType = effectiveTypes.indexOf(connType);
    var types = effectiveTypes.filter(function (t, i) {
      return i >= thresholdType;
    });
    var typeSaver = types.indexOf(type) > -1;
    var dataSaver = connection.saveData;
    var apt = allowed || typeSaver || dataSaver;

    var handleIntersection = function handleIntersection(entries) {
      if ("requestIdleCallback" in window && apt && entries[0].isIntersecting) {
        FetchLink(current.href);
      }
    };

    var options = {
      root: null,
      rootMargin: rootMargin,
      threshold: threshold
    };
    var observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(current);
    return function () {
      return observer.disconnect();
    };
  }, [allowedOrigins, connType, rootMargin, threshold]);
  return React.createElement("a", Object.assign({
    href: to,
    alt: altText,
    ref: refLink,
    title: titleText
  }, rest), children);
};

QuickLink.dafaultProps = {
  title: "",
  connType: "2g",
  allowedOrigins: null,
  rootMargin: "0px",
  threshold: [1.0]
};
export default QuickLink;