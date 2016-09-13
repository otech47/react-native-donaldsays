import React, { PropTypes } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';

import Dimensions from 'Dimensions';

import Base from './Base';
import Button from './Button';

import * as fonts from '../fonts';
import { buttons, mixins, colors, variables } from '../styles';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class LandingPage extends Base {
    constructor(props) {
        super(props);
        this.autoBind('handleHowToPlay', 'handlePlay');
        this.state = {
            howToPlayOpen: false
        };
    }
    componentDidMount() {


    }
    componentWillUnmount() {

    }
    handleHowToPlay() {

    }
    handlePlay() {

    }
    handleLoad() {
        console.log('loaded')
    }
    render() {
        return (
            <View style={styles.root}>

                <Video
                    muted
                    repeat
                    resizeMode='cover'
                    onLoad={() => { console.log('video loaded') })}
                    source={{uri: 'landingvideo'}}
                    style={styles.backgroundVideo}
                />

                <View style={styles.overlay}>
                    <Text style={styles.header}>DonaldSays</Text>
                    <Image style={styles.image} source={require('../images/donaldsays_logo_transparent.png')} />

                    <Button 
                        rounded
                        style={styles.button}
                        textStyle={styles.buttonText}
                        onPress={() => Actions.ArGameDisplay()}
                        color={colors.blue}
                    >
                        Play
                    </Button>
                </View>

                
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...mixins.defaultPage,
        ...mixins.column,
        ...mixins.center
    },
    button: {
        ...buttons.play,
        fontSize: height * .05,
        marginVertical: height * .12,
    },
    buttonText: {
        fontSize: height * .04
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: height,
        width: width
    },
    header: {
        ...fonts.header,
        color: colors.white,
        marginTop: height * .08
    },
    image: {
        marginTop: height * .04,
        height: height * .18,
        width: height * .18
    },
    overlay: {
        ...mixins.column,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        height: height,
        width: width,
        backgroundColor: colors.darkGrayTransparent
    }
});

function mapStateToProps({auth, discover, environment, wallet}) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LandingPage);