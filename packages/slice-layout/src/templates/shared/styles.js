import { colours, spacing } from "@times-components/ts-styleguide";

const styles = {
  itemColSeparator: {
    borderColor: colours.functional.keyline,
    borderRightWidth: 1,
    borderStyle: "solid",
    marginLeft: spacing(2),
    marginRight: spacing(2)
  },
  itemRowSeparator: {
    borderBottomWidth: 1,
    borderColor: colours.functional.keyline,
    borderStyle: "solid"
  }
};

export default styles;
