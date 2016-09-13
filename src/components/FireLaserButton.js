import React, { PropTypes } from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import Sound from 'react-native-sound';

import Dimensions from 'Dimensions';

import Base from './Base';
import Button from './Button';

import { mixins, colors, variables } from '../styles';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class FireLaserButton extends Base {
    constructor(props) {
        super(props);
        this.autoBind('handleFire');
        this.state = {
            sounds: {
                laser: new Sound('laser.wav', Sound.MAIN_BUNDLE)
            }
        };
    }
    startLaserAnimation() {
        console.log('startLaserAnimation');
        this.refs.laser.transition({ 
            top: height,
            height: height / 2,
            width: 6
        }, {
            top: height / 2,
            height: 0,
            width: 1
        }, 150, 'ease-out');
    }
    handleFire() {
        this.startLaserAnimation();
        this.state.sounds.laser.stop();
        this.state.sounds.laser.play((success) => {
            console.log(success);
        });
    }
    render() {
        return (
            <View>
                <Animatable.View 
                    ref='laser'
                    style={styles.laser}
                />

                <Button
                    rounded
                    onPress={this.handleFire}
                    color={colors.red}
                    style={styles.button}>FIRE</Button>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    root: {
    },
    button: {
        ...mixins.arObject,
        top: height - variables.BUTTON_HEIGHT,
        left: (width - variables.BUTTON_WIDTH) / 2 ,
        width: variables.BUTTON_WIDTH,
        paddingHorizontal: 18,
        paddingVertical: 15, 
        margin: 0
    },
    laser: {
        ...mixins.arObject,
        top: height,
        left: (width / 2) - 3,
        width: 6,
        height: height / 2,
        backgroundColor: colors.red
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
)(FireLaserButton);