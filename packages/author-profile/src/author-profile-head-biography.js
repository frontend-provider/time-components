import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { renderTrees, treePropType } from "@times-components/markup";
import styles from "./styles";

const AuthorProfileHeadBiography = ({ biography }) => (
  <Text testID="author-bio" style={styles.biography}>
    {renderTrees(biography)}
  </Text>
);

AuthorProfileHeadBiography.propTypes = {
  biography: PropTypes.arrayOf(treePropType).isRequired
};

export default AuthorProfileHeadBiography;
