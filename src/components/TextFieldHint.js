import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Base from './Base';
import * as fonts from '../fonts';

import {mixins, colors} from '../styles';

const {bool, string} = PropTypes;
const propTypes = {
    show: bool,
    text: string
};

export default function TextFieldHint({show, text}) {
    const visible = {
        opacity: show ? 1 : 0
    };

    return (
        <View style={[styles.root, visible]}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        marginVertical: 8
    },
    text: {
        color: colors.gray,
        ...fonts.romanSmall
    }
});

TextFieldHint.propTypes = propTypes;
