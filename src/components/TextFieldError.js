import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Base from './Base';

import * as fonts from '../fonts';
import {mixins, colors} from '../styles';

export default function TextFieldError({children}) {
    return (
        <Text style={styles.root}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    root: {
        ...fonts.romanSmall,
        color: colors.red
    }
});
