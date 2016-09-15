import React, { PropTypes } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Switch
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as fonts from '../fonts';
import { mixins, colors, variables } from '../styles';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default function ListItem({children, onPress}) {
    return (
        <TouchableHighlight 
            onPress={onPress}
            underlayColor={colors.lightGray}
        >
            <View style={[styles.root, styles.white]}>
                <Text style={styles.text}>{children}</Text>
            </View>
        </TouchableHighlight>
    );
}


ListItem.Header = function({children}) {
    return (
        <View style={styles.root}>
            <Text style={styles.header}>{children.toUpperCase()}</Text>
        </View>
    );
}

ListItem.Selection = function({children, onPress, icon, color}){
    return (
        <TouchableHighlight 
            onPress={onPress}
            underlayColor={colors.lightGray}
        >
            <View style={[styles.root, styles.white, styles.justify]}>
                <Text style={styles.text}>{children}</Text>
                <Icon color={color} name={icon} />
            </View>
        </TouchableHighlight>
    );
}

ListItem.Link = function({children, onPress}) {
    return (
        <TouchableHighlight 
            onPress={onPress}
            underlayColor={colors.lightGray}
        >
            <View style={[styles.root, styles.white, styles.justify]}>
                <Text style={styles.text}>{children}</Text>
                <Icon color={colors.gray} name='chevron-right' />
            </View>
        </TouchableHighlight>
    );
}

ListItem.Switch = function({children, onPress, value}) {
    return (
        <TouchableHighlight
            onPress={onPress}
            underlayColor={colors.lightGray}
        >
            <View style={[styles.root, styles.white, styles.justify]}>
                <Text style={styles.text}>{children}</Text>
                <Switch onValueChange={onPress} value={value} />
            </View>
        </TouchableHighlight>
    );
}

ListItem.Switch.propTypes = {
    value: PropTypes.bool
};

const styles = StyleSheet.create({
    root: {
        height: 48,
        paddingHorizontal: 16,
        ...mixins.row,
        alignItems: 'center',
        borderColor: colors.lightGray,
        borderBottomWidth: 1,
    },
    white: {
        backgroundColor: 'white'
    },
    header: {
        ...fonts.romanSmall,
        color: colors.gray
    },
    text: {
        ...fonts.romanSmall,
        color: colors.darkGray,
        justifyContent: 'space-between'
    },
    justify: {
        justifyContent: 'space-between'
    }
});