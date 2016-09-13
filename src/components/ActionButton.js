import React, { PropTypes } from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import Base from './Base';
import { mixins, colors } from '../styles';

export default function ActionButton({onPress, children, style}) {
    return (
        <TouchableHighlight
            style={[styles.root, style]}
            onPress={onPress}
            underlayColor={colors.darkYellow}
        >
            {children}
        </TouchableHighlight>
    );
}

const height = 56;
const styles = StyleSheet.create({
    root: {
        ...mixins.center,
        borderRadius: 100,
        width: height,
        height: height,
        backgroundColor: colors.yellow,
        marginVertical: -height/2,
        ...mixins.createShadow(2)
    }
});

ActionButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired
};