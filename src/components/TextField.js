import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import Base from './Base';
import Icon from 'react-native-vector-icons/Ionicons';
import TextFieldUnderline from './TextFieldUnderline';
import TextFieldHint from './TextFieldHint';
import TextFieldError from './TextFieldError';

import * as fonts from '../fonts';

import {mixins, colors} from '../styles';

const {
    any,
    bool,
    func,
    object,
    oneOf,
    string
} = PropTypes;

export default class TextField extends Base {
    static propTypes = {
        autoCapitalize: oneOf(['none', 'sentences', 'words', 'characters']),
        autoCorrect: bool,
        autoFocus: bool,
        hintText: string,
        keyboardType: oneOf(['default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search']),
        onChangeText: func,
        onSubmitEditing: func,
        name: string.isRequired,
        placeholder: string,
        returnKeyType: oneOf(['default', 'go', 'google', 'join', 'next', 'route', 'search', 'send', 'yahoo', 'done', 'emergency-call']),
        secureTextEntry: bool,
        style: object,
        value: any
    }
    static defaultProps = {
        returnKeyType: 'next',
        autoCorrect: false,
        autoCapitalize: 'none',
        type: 'TextField'
    }
    static contextTypes = {
        update: func,
        values: object
    }
    constructor(props, context) {
        super(props, context);
        this.autoBind(
            'renderHint',
            'renderError'
        );
    }
    renderHint() {
        if(this.props.hintText !== undefined) {
            return <TextFieldHint show={true} text={this.props.hintText} />
        }
    }
    renderError() {
        const {touched, error} = this.props;
        return touched && error && <TextFieldError>{error}</TextFieldError>
    }
    render() {
        let iconElement;
        const {
            autoCapitalize,
            autoCorrect,
            autoFocus,
            icon,
            keyboardType,
            multiline,
            name,
            placeholder,
            secureTextEntry,
            style,
            type,
            ...other
        } = this.props;

        if(icon) {
            iconElement = <Icon name={icon} style={styles.icon}/>
        }

        return (
            <View style={[styles.root, style]}>
                {iconElement}
                <View style={{...mixins.column}}>
                    {this.renderHint()}
                    <TextInput
                        autoCapitalize={autoCapitalize}
                        autoCorrect={autoCorrect}
                        autoFocus={autoFocus}
                        keyboardType={keyboardType}
                        multiline={multiline}
                        name={name}
                        placeholder={placeholder}
                        placeholderTextColor={colors.gray}
                        secureTextEntry={secureTextEntry}
                        style={styles.input}
                        type={type}
                        {...other}
                    />
                    {this.renderError()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...mixins.row,
        alignItems: 'center',
        margin: 8
    },
    input: {
        ...fonts.romanSmall,
        width: 256,
        height: 24,
        fontSize: 16
    },
    icon: {
        fontSize: 24,
        color: colors.gray,
        marginRight: 16,
        marginTop: -16
    }
});