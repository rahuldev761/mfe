import { mount as marketingApp } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  // copy of browser history
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = marketingApp(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathName }) => {
        const { pathname } = history.location;
        if (pathname != nextPathName) {
          history.push(nextPathName);
        }
      },
    });
    history.listen(onParentNavigate);
  },[]);

  return <div ref={ref}></div>;
};
