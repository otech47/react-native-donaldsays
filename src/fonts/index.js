import Dimensions from 'Dimensions';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

// fonts

export const romanSmall = {
    fontFamily: 'Avenir-Roman',
    fontSize: height * .026,
    lineHeight: height * .037
}

export const romanMedium = {
    fontFamily: 'Avenir-Roman',
    fontSize: height * .035,
    lineHeight: height * .045
}

export const romanLarge = {
    fontFamily: 'Avenir-Roman',
    fontSize: height * .07,
    lineHeight: height * .13
}

export const heavySmall = {
    fontFamily: 'Avenir-Heavy',
    fontSize: height * .023,
    lineHeight: height * .034
}

export const heavyMedium = {
    fontFamily: 'Avenir-Heavy',
    fontSize: height * .031,
    lineHeight: height * .042
}

export const heavyLarge = {
    fontFamily: 'Avenir-Heavy',
    fontSize: height * .07,
    lineHeight: height * .13
}