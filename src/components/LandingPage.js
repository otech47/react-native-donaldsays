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

import Base from './Base';
import Button from './Button';
import InstructionsOverlay from './InstructionsOverlay';

import * as fonts from '../fonts';
import { buttons, mixins, colors, variables } from '../styles';

import { instructionsOverlay } from '../actions/environment';

class LandingPage extends Base {
    constructor(props) {
        super(props);
        this.autoBind('handleHowToPlay', 'handlePlay');
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        console.log('LandingPage componentWillUnmount')
    }
    handleHowToPlay() {

    }
    handlePlay() {
        console.log('handlePlay: ' + this.props.firstPlay)
        if(this.props.firstPlay) {
            this.props.instructionsOverlay(true)
        } else {
            Actions.ArGameDisplay();
        }
    }
    handleLoad() {
        console.log('loaded')
    }
    render() {
        return (
            <View style={styles.root}>

                {/* <Video
                    muted
                    repeat
                    resizeMode='cover'
                    onLoad={() => { console.log('video loaded') }}
                    source={{uri: 'landingvideo'}}
                    style={styles.backgroundVideo}
                /> */}

                <View style={styles.overlay}>
                    <Text style={styles.header}>DonaldSays</Text>
                    <Image
                        style={styles.image}
                        source={require('../assets/images/donaldsays_logo_transparent.png')}/>

                    <Button 
                        rounded
                        style={styles.button}
                        textStyle={styles.buttonText}
                        onPress={this.handlePlay}
                        color={colors.red}
                    >
                        Play
                    </Button>

                    <Text 
                        style={styles.howToPlay}
                        onPress={this.props.instructionsOverlay.bind(this, true)}
                    >
                        How to Play
                    </Text>
                </View>

                {this.props.showInstructionsOverlay && <InstructionsOverlay/>}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...mixins.defaultPage,
        ...mixins.column,
        ...mixins.center,
        backgroundColor: colors.darkGray
    },
    button: {
        ...buttons.play,
        marginVertical: variables.SCREEN_HEIGHT * .12,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: variables.SCREEN_HEIGHT,
        width: variables.SCREEN_WIDTH
    },
    header: {
        ...fonts.romanLarge,
        color: colors.white,
        marginTop: variables.SCREEN_HEIGHT * .08
    },
    howToPlay: {
        ...fonts.romanSmall,
        color: colors.white,
        padding: 15,
        marginVertical: variables.SCREEN_HEIGHT * .04
    },
    image: {
        marginTop: variables.SCREEN_HEIGHT * .04,
        height: variables.SCREEN_HEIGHT * .18,
        width: variables.SCREEN_HEIGHT * .18
    },
    overlay: {
        ...mixins.column,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        height: variables.SCREEN_HEIGHT,
        width: variables.SCREEN_WIDTH
    }
});

function mapStateToProps({ environment }) {
    return {
        ...environment
    };
}

function mapDispatchToProps(dispatch) {
    return {
        instructionsOverlay: (show) => dispatch(instructionsOverlay(show))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LandingPage);