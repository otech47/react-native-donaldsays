import Dimensions from 'Dimensions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const STATUS_BAR_HEIGHT = 20;
export const HEADER_HEIGHT = STATUS_BAR_HEIGHT;
export const BITCOIN_BUTTON_SIZE = 30;

export const AR_OBJECT_SIZE = height * .09;
export const CROSSHAIRS_SIZE = AR_OBJECT_SIZE;
export const CROSSHAIRS_POSITION_LEFT = (width - CROSSHAIRS_SIZE) / 2;
export const CROSSHAIRS_POSITION_RIGHT = (width + CROSSHAIRS_SIZE) / 2;
export const CROSSHAIRS_POSITION_TOP = (height - CROSSHAIRS_SIZE) / 2;
export const CROSSHAIRS_POSITION_BOTTOM = (height + CROSSHAIRS_SIZE) / 2;

export const BUTTON_HEIGHT = height * .075;
export const BUTTON_WIDTH = width * .25;

export const COUNTDOWN_HEIGHT = height * .5;
export const COUNTDOWN_WIDTH = width * .5;

export const SCREEN_HEIGHT = height;
export const SCREEN_WIDTH = width;