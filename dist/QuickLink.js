import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React, { useEffect, useRef, useState } from "react";
// TODO: Prefetching: // https://github.com/GoogleChromeLabs/quicklink/blob/master/src/prefetch.mjs
var effectiveTypes = ["slow-2g", "2g", "3g", "4g"];

var QuickLink = function QuickLink(_ref) {
  var to = _ref.to,
      altText = _ref.altText,
      children = _ref.children,
      titleText = _ref.titleText,
      allowedOrigins = _ref.allowedOrigins,
      connType = _ref.connType,
      rest = _objectWithoutProperties(_ref, ["to", "altText", "children", "titleText", "allowedOrigins", "connType"]);

  var refLink = useRef();
  useEffect(function () {
    var current = refLink.current; // Origins?

    var allowedOptions = allowedOrigins || [window.location.hostname];
    var allowed = allowedOptions === current.hostname; // Connections

    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection; // effectiveType?

    var type = connection.effectiveType;
    var thresholdType = effectiveTypes.indexOf(connType);
    var types = effectiveTypes.filter(function (t, i) {
      return i >= thresholdType;
    });
    var typeSaver = types.indexOf(type) > -1; // saveData?

    var dataSaver = connection.saveData; // This user is apt?

    var apt = allowed || typeSaver || dataSaver;

    var handleIntersection = function handleIntersection(entries) {
      console.log(entries);
    }; // const quicklinkWork = () => {
    //   current.rel = "prefetch"
    // }


    var observer = new IntersectionObserver(handleIntersection);
    observer.observe(current);

    if ("requestIdleCallback" in window && apt) {// requestIdleCallback(quicklinkWork())
    }

    return function () {
      return observer.disconnect();
    };
  }, [allowedOrigins, connType]);
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
  allowedOrigins: null
}; // throttle? limit? timeout?

export default QuickLink;