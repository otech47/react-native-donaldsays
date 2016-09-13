import * as variables from './variables';
import * as colors from './colors';
import Dimensions from 'Dimensions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export function createShadow(level) {
    switch (level) {
        case 1:
            return {
                shadowColor: 'rgb(49, 53, 66)',
                shadowOpacity: 0.32,
                shadowRadius: 2,
                shadowOffset: {
                    height: 1
                }
            };
        case 2:
            return {
                shadowColor: 'rgb(49, 53, 66)',
                shadowOpacity: 0.4,
                shadowRadius: 4,
                shadowOffset: {
                    height: 2
                }
            };
        case 3:
            return {
                shadowColor: 'rgb(49, 53, 66)',
                shadowOpacity: 0.5,
                shadowRadius: 6,
                shadowOffset: {
                    height: 4
                }
            };
        case 4:
            return {
                shadowColor: 'rgb(49, 53, 66)',
                shadowOpacity: 0.6,
                shadowRadius: 8,
                shadowOffset: {
                    height: 6
                }
            };
        case 5:
            return {
                shadowColor: 'rgb(49, 53, 66)',
                shadowOpacity: 0.70,
                shadowRadius: 10,
                shadowOffset: {
                    height: 9
                }
            };
    }
}

export const arObject = {
    position: 'absolute'
};

export const center = {
    alignItems: 'center',
    justifyContent: 'center'
};

export const selfStretch = {
    alignSelf: 'stretch'
};

export const defaultPage = {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: variables.HEADER_HEIGHT,
    position: 'relative'
};

export const fullSizePage = {
    height: height - variables.HEADER_HEIGHT,
    width: width
};

export const centerAbsolute = {
    position: 'absolute',
    left: width/2,
    top: (height - variables.HEADER_HEIGHT)/2
};

export const fullWidth = {
    width: width
};

export const fullHeight = {
    height: height - variables.HEADER_HEIGHT,
};

export const flex1 = {
    flex: 1
};

export const flex2 = {
    flex: 2
};

export const flex3 = {
    flex: 3
};

export const flex4 = {
    flex: 4
};

export function flex(direction = 'column', wrap = 'nowrap') {
    return {
        flexDirection: direction,
        flexWrap: wrap
    };
};

export const row = flex('row', 'wrap');
export const column = flex('column', 'nowrap');
export const rowReverse = flex('row-reverse', 'wrap');
export const columnReverse = flex('column-reverse', 'wrap');
export const rowNowrap = flex('row', 'nowrap');