import React, {
    PropTypes,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Base from './Base';
import * as fonts from '../fonts';

import {mixins, colors} from '../styles';

const propTypes = {
    isFocused: PropTypes.bool.isRequired
};

export default class TextFieldUnderline extends Base {
    constructor(props) {
        super(props);
    }
    render() {
        const color = {
            borderBottomColor: this.props.isFocused ? colors.blue : colors.gray
        };

        return (
            <View style={[styles.underline, color]} />
        );
    }
}

const styles = StyleSheet.create({
    underline: {
        marginVertical: 8,
        flex:1,
        borderBottomWidth: 2
    }
});

TextFieldUnderline.propTypes = propTypes;
