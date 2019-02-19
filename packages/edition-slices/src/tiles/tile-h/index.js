import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { getCrop, TileImage, TileLink, TileSummary } from "../shared";
import styles from "./styles";

const TileH = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileSummary
        byline={tile.article.byline}
        headlineStyle={styles.headline}
        style={styles.summaryContainer}
        summary={tile.article.summary125}
        tile={tile}
      />
      <View style={styles.imageContainer}>
        <TileImage
          aspectRatio={2 / 3}
          uri={getCrop(tile.article.leadAsset, "crop23")}
        />
      </View>
    </View>
  </TileLink>
);

TileH.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default TileH;
