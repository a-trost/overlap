import React from "react";
import AppProvider from "./src/store/provider";
// import wrapPageElementWithTransition from 'helpers/wrapPageElement';

// React Context in Browser
export const wrapRootElement = ({ element }) => {
  return <AppProvider>{element}</AppProvider>;
};

export const shouldUpdateScroll = ({
  prevRouterProps: { location },
  getSavedScrollPosition
}) => {
  const currentPosition = getSavedScrollPosition(location);
  window.scrollTo(...(currentPosition || [0, 0]));
  return currentPosition;
};

// Page Transitions
// export const wrapPageElement = wrapPageElementWithTransition;
