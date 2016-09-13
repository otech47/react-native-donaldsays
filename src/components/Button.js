import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Base from './Base';

import {mixins, colors} from '../styles';
import * as fonts from '../fonts';

export default function Button(props) {
    const {
        children,
        color,
        onPress,
        rounded,
        style,
        textStyle
    } = props;

    return (
        <TouchableOpacity 
            activeOpacity={0.8}
            onPress={onPress}
            style={[
                styles.root,
                {
                    backgroundColor: color,
                    borderRadius: rounded ? 4 : 0
                },
                style
            ]}
        >
            <Text style={[styles.text, textStyle]}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    root: {
        ...mixins.row,
        ...mixins.center,
        paddingHorizontal: 8,
        paddingVertical: 5
    },
    text: {
        color: colors.white
    }
});
