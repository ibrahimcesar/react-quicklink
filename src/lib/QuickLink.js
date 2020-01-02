import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";

// TODO: Prefetching: // https://github.com/GoogleChromeLabs/quicklink/blob/master/src/prefetch.mjs

let effectiveTypes = ["slow-2g", "2g", "3g", "4g"]

const QuickLink = ({ to, altText, children, titleText, allowedOrigins, connType, ...rest}) => {
  
  const refLink = useRef();
  useEffect(() => {
    const { current } = refLink;

    // Origins?
    const allowedOptions = allowedOrigins || [window.location.hostname];
    const allowed = allowedOptions === current.hostname;

    // Connections
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    // effectiveType?
    const type = connection.effectiveType;
    let thresholdType = effectiveTypes.indexOf(connType);
    let types = effectiveTypes.filter( (t, i) => i >= thresholdType );
    const typeSaver = types.indexOf(type) > -1;

    // saveData?
    const dataSaver = connection.saveData;

    // This user is apt?
    const apt = allowed || typeSaver || dataSaver;

    const handleIntersection = (entries) => {
      console.log(entries)
    };
    // const quicklinkWork = () => {
    //   current.rel = "prefetch"
    // }
    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(current);

    if ("requestIdleCallback" in window && apt) {
      // requestIdleCallback(quicklinkWork())
    }
    return () => observer.disconnect();
  }, [allowedOrigins, connType]);

  return (
    <a href={to} alt={altText} ref={refLink} title={titleText} {...rest}>{children}</a>
  )
}

QuickLink.propTypes = {
  to: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  connType: PropTypes.string,
  allowedOrigins: PropTypes.array
}

QuickLink.dafaultProps = {
  title: "",
  connType: "2g",
  allowedOrigins: null,
}

// throttle? limit? timeout?

export default QuickLink;
