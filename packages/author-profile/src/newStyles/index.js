import { spacing } from "@times-components/styleguide";
import sharedStyles from "../styles/shared";

const styles = {
  ...sharedStyles,
  jobTitle: {
    ...sharedStyles.jobTitle,
    WebkitFontSmoothing: "antialiased"
  },
  twitter: {
    ...sharedStyles.twitter,
    alignItems: "flex-end",
    paddingBottom: spacing(2),
    paddingTop: spacing(3)
  },
  twitterIcon: {
    alignSelf: "center"
  },
  twitterLink: {
    ...sharedStyles.twitterLink
  }
};

export default styles;
