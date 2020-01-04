import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import FetchLink from "./FetchLink";

let effectiveTypes = ["slow-2g", "2g", "3g", "4g"]

const QuickLink = ({ to, altText, children, titleText, connType, rootMargin, threshold, content, cls, ...rest}) => {
  
  const refLink = useRef();
  useEffect(() => {
    const { current } = refLink;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const type = connection.effectiveType;
    let thresholdType = effectiveTypes.indexOf(connType);
    let types = effectiveTypes.filter( (t, i) => i >= thresholdType );
    const typeSaver = types.indexOf(type) > -1;
    const dataSaver = connection.saveData;
    const apt = typeSaver || dataSaver;

    const handleIntersection = (entries) => {
      if ("requestIdleCallback" in window && apt && entries[0].isIntersecting) {
        FetchLink(current.href);
      }
    };
    let options = {
      root: null,
      rootMargin: rootMargin,
      threshold: threshold
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(current);
    return () => observer.disconnect();
  }, [allowedOrigins, connType, rootMargin, threshold]);

  return (
    <a className={cls} href={to} alt={altText} ref={refLink} title={titleText} {...rest}>{children ? children : content}</a>
  )
}

QuickLink.propTypes = {
  to: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
  connType: PropTypes.string,
  rootMargin: PropTypes.string,
  threshold: PropTypes.array,
  content: PropTypes.string,
  cls: PropTypes.string
}

QuickLink.dafaultProps = {
  title: "",
  connType: "2g",
  rootMargin: "0px",
  threshold: [1.0],
  content: "",
  cls: null
}

export default QuickLink;
