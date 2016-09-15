import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Base from './Base';

import { buttons, mixins, colors } from '../styles';
import * as fonts from '../fonts';

export default function Button(props) {
    const {
        children,
        color,
        onPress,
        onPressIn,
        onPressOut,
        rounded,
        style,
        textStyle
    } = props;

    return (
        <TouchableOpacity 
            activeOpacity={0.8}
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
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
        ...buttons.standard
    },
    text: {
        ...buttons.standardText
    }
});
