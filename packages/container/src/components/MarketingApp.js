import { mount as MarketingApp } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    MarketingApp(ref.current);
  }, []);

  return <div ref={ref}></div>;
};
