import React, { PropTypes } from 'react';
import {
    View, 
    Image, 
    StyleSheet 
} from 'react-native';
import { colors } from '../styles';

import { TEST_IMAGE, S3_ROOT } from '../constants';

export default function Avatar({image}) {
    return (
        <Image style={styles.image} source={{ uri: S3_ROOT + image }} />
    );
}

Avatar.propTypes = {
    image: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    image: {
        width: 48,
        height: 48,
        margin: 8,
        marginRight: 16,
        borderColor: colors.yellow,
        borderWidth: 2,
        borderRadius: 25
    }
});