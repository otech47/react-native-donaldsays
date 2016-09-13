import * as variables from './variables';
import * as colors from './colors';
import Dimensions from 'Dimensions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const play = {
    borderRadius: 5,
    backgroundColor: colors.red,
    color: colors.white,
    paddingVertical: height * .02, 
    paddingHorizontal: width * .05
};