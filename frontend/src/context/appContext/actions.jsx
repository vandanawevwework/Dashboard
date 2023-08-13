import * as actionTypes from './types';

const contextActions = (dispatch) => {
  return {
    navMenu: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_NAV_MENU });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_NAV_MENU });
      },
      collapse: () => {
        dispatch({ type: actionTypes.COLLAPSE_NAV_MENU });
      },
      setMobileSize: (isMobile) => {
        dispatch({ type: actionTypes.SET_MOBILE_SIZE, payload: { isMobile } });
      },
    },
  };
};

export default contextActions;
