import { Dimensions } from 'react-native';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => (viewportWidth / guidelineBaseWidth) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

const deviceWidth = viewportWidth;
const deviceHeight = viewportHeight;

const colors = {
    primary: '#4caf50',
    primaryLight: '#e7f3e7',
    primaryDark: '#388e3c',
    primaryXL: '#f6fbf6',

    white: '#fff',
    black: '#000',
    nero: '#222222',
    grey0: '#fafafa',
    grey1: '#f2f2f2',
    grey2: '#e5e5e5',
    grey3: '#ccc',
    grey4: '#a6a6a6',
    grey5: '#808080',

    blue: '#2196f3',
    red: '#FF0000',
    amber: '#ffc107',
    orange: '#FF5400',
    peel: '#FF9A01',
    blackTransparent: 'rgba(0,0,0,0.5)',
    whiteTransparent: 'rgba(255,255,255,0.5)',
    transparent: '#ffffff00',
};

const theme = {
    colors,
    moderateScale,
    deviceWidth,
    deviceHeight,
};

export default theme;
