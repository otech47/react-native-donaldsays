import * as fonts from '../fonts';
import * as colors from './colors';
import * as variables from './variables';

import Dimensions from 'Dimensions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const standard = {
    paddingVertical: height * .02, 
    paddingHorizontal: width * .07
};

export const standardText = {
    ...fonts.romanMedium,
    color: colors.white
}

export const play = {
    ...standard
};

export const fireLaser = {
};
