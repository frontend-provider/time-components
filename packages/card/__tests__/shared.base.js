import React from "react";
import { Text } from "react-native";
import { iterator } from "@times-components/test-utils";
import Card from "../src/card";

const props = {
  image: {
    uri: "https://img.io/img"
  },
  imageRatio: 2 / 3,
  imageSize: 360,
  showImage: true
};

export default (renderMethod, platformTests) => {
  // magic to stop the React Native Animated library from dying, as each test kicks off another animation that uses timing
  jest.useFakeTimers();

  const tests = [
    {
      name: "card default state",
      test: () => {
        const output = renderMethod(
          <Card {...props}>
            <Text>A card</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "pass an empty state to the image component",
      test: () => {
        const output = renderMethod(
          <Card {...props} image={null}>
            <Text>A card with an empty image</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "card without an image when showImage is false",
      test: () => {
        const output = renderMethod(
          <Card {...props} showImage={false}>
            <Text>No image</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "pass an empty state to the image component when uri is null",
      test: () => {
        const output = renderMethod(
          <Card {...props} image={{ uri: null }}>
            <Text>No URI</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "card with reversed layout",
      test: () => {
        const output = renderMethod(
          <Card {...props} isReversed>
            <Text>A card in reverse</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "card with reversed layout and no image",
      test: () => {
        const output = renderMethod(
          <Card {...props} isReversed showImage={false}>
            <Text>A card in reverse with no image</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "card with a loading state",
      test: () => {
        const output = renderMethod(
          <Card {...props} isLoading>
            <Text>Loading state</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "card with a loading state and no image",
      test: () => {
        const output = renderMethod(
          <Card {...props} isLoading showImage={false}>
            <Text>Loading with no image</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "card with reversed loading state",
      test: () => {
        const output = renderMethod(
          <Card {...props} isLoading isReversed>
            <Text>Loading in reverse</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "card with reversed loading state with no image",
      test: () => {
        const output = renderMethod(
          <Card {...props} isLoading isReversed showImage={false}>
            <Text>Loading in reverse with no image</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    ...platformTests
  ];

  iterator(tests);
};
