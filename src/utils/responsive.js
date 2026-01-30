import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base size (iPhone X design)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// Detect tablet
const isTablet = width >= 768;

export const wp = (size) => {
  const scale = width / guidelineBaseWidth;
  const newSize = size * scale;
  return Math.round(
    PixelRatio.roundToNearestPixel(isTablet ? Math.min(newSize, size * 1.4) : newSize)
  );
};

export const hp = (size) => {
  const scale = height / guidelineBaseHeight;
  const newSize = size * scale;
  return Math.round(
    PixelRatio.roundToNearestPixel(isTablet ? Math.min(newSize, size * 1.4) : newSize)
  );
};

export const fs = (size) => {
  const scale = width / guidelineBaseWidth;
  const newSize = size * scale;
  return Math.round(
    PixelRatio.roundToNearestPixel(isTablet ? Math.min(newSize, size * 1.3) : newSize)
  );
};
