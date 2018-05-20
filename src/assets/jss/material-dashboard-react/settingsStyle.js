// ##############################
// // // App styles
// #############################

import { drawerWidth, transition, container } from "../material-dashboard-react";

const settingsStyles = theme => ({
  root            : {
    width: '100%',
  },
  heading         : {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color   : theme.palette.text.secondary,
  },
  icon            : {
    verticalAlign: 'bottom',
    height       : 20,
    width        : 20,
  },
  details         : {
    alignItems: 'center',
  },
  column          : {
    flexBasis: '33.33%',
  },
  helper          : {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding   : `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link            : {
    color         : theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover'     : {
      textDecoration: 'underline',
    },
  },
});

export default settingsStyles;
