import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { ArticleBylineWithLinks } from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";

import metaPropTypes from "./article-meta-prop-types";
import styles from "../styles";

const Separator = () => <View style={styles.separator} />;

const ArticleMeta = ({
  byline,
  isTablet,
  hasElementsAbove,
  onAuthorPress,
  publicationName,
  publishedTime
}) => (
  <View
    style={[
      styles.metaContainer,
      !hasElementsAbove && styles.metaSpacer,
      isTablet && styles.metaContainerTablet
    ]}
  >
    {byline && (
      <View style={[styles.meta, isTablet && styles.metaTablet]}>
        <ArticleBylineWithLinks ast={byline} onAuthorPress={onAuthorPress} />
      </View>
    )}
    {isTablet ? <Separator /> : null}
    <View style={[styles.meta, isTablet && styles.metaTablet]}>
      <Text
        style={[
          styles.datePublication,
          isTablet && styles.datePublicationTablet
        ]}
      >
        <DatePublication date={publishedTime} publication={publicationName} />
      </Text>
    </View>
  </View>
);

ArticleMeta.propTypes = {
  ...metaPropTypes,
  onAuthorPress: PropTypes.func.isRequired
};

export default ArticleMeta;
