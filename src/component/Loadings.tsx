import { ColorValue, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

type LoadingsProp = {
  size: number;
  primaryColor: ColorValue;
  count: number;
};

type DotProp = {
  size: number;
  count: number;
  dotRadius: number;
  dotIndex: number;
  progress: Animated.SharedValue<number>;
  primaryColor: ColorValue;
};

const gapRatio = 0.75;

function Dot({
  size,
  count,
  dotIndex,
  progress,
  primaryColor,
  dotRadius,
}: DotProp) {
  let angle = (dotIndex * 360) / count;

  let layerStyle = {
    transform: [
      {
        rotate: `${angle}deg`,
      },
    ],
  };

  let inputRange = Array.from(
    new Array(count + 1),
    (item, index) => index / count,
  );

  let outputRange = Array.from(
    new Array(count),
    (item, index) => 1 - (0.5 * index) / (count - 1),
  );

  for (let j = 0; j < dotIndex; j++) {
    outputRange.unshift(outputRange.pop() as number);
  }

  outputRange.unshift(...outputRange.slice(-1));

  const dotStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, inputRange, outputRange, {
      extrapolateLeft: Extrapolate.CLAMP,
      extrapolateRight: Extrapolate.CLAMP,
    });
    return {
      opacity,
    };
  }, []);
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        ...layerStyle,
      }}>
      <Animated.View
        style={[
          {
            marginLeft: size / 2 - dotRadius,
            width: 2 * dotRadius,
            height: 2 * dotRadius,
            borderRadius: dotRadius,
            backgroundColor: primaryColor,
          },
          dotStyle,
        ]}
      />
    </View>
  );
}

export function Loadings({ size, primaryColor, count }: LoadingsProp) {
  const progress = useSharedValue(0);
  progress.value = withRepeat(
    withTiming(1, { duration: 800, easing: Easing.linear }),
    -1,
    false,
  );
  const calcedRadius = useMemo(
    () => (3.14 * gapRatio * size) / (3.14 * 2 * gapRatio + 2 * count),
    [count, size],
  );
  let dotRadius = calcedRadius;
  if (calcedRadius > size / 10) {
    dotRadius = size / 10;
  }

  return (
    <View
      style={{
        width: size,
        height: size,
      }}>
      {Array.from(new Array(count)).map((dot, dotIndex) => {
        return (
          <Dot
            key={dotIndex}
            dotRadius={dotRadius}
            count={count}
            dotIndex={dotIndex}
            size={size}
            progress={progress}
            primaryColor={primaryColor}
          />
        );
      })}
    </View>
  );
}
