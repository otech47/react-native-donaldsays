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

import Base from './Base';
import Button from './Button';

import { buttons, mixins, colors, variables } from '../styles';
import { changeIsAnimating } from '../actions/environment';

const ACTION_TIMER = 300;

class FireLaserButton extends Base {
    constructor(props) {
        super(props);
        this.autoBind('fireLaser', 'handleRapidFireStart', 'handleRapidFireCancel', 'startLaserAnimation');
        this.state = {
            showLaser: true,
            rapidFire: true,
            sounds: {
                laser: new Sound('laser.wav', Sound.MAIN_BUNDLE)
            }
        };
    }
    componentWillUnmount() {
        clearTimeout();
    }
    startLaserAnimation() {
        this.props.changeIsAnimating(true);
        setTimeout(() => {
            this.props.changeIsAnimating(false);
        }, 150);
        this.refs.laser.transition({
            top: variables.SCREEN_HEIGHT / 2,
            height: variables.SCREEN_HEIGHT / 2,
            width: 6
        }, {
            top: 0,
            height: 0,
            width: 1
        }, 150, 'ease-out');
        
    }
    fireLaser() {
        if(this.props.isAnimating) {
            return;
        }

        if(this.state.rapidFire) {
            this.props.showLaser && this.startLaserAnimation();
            this.state.sounds.laser.stop();
            this.state.sounds.laser.play();
            setTimeout(() => {
                this.state.rapidFire && this.fireLaser();
            }, 200);
        } else {
            this.props.showLaser && this.startLaserAnimation();
            this.state.sounds.laser.stop();
            this.state.sounds.laser.play();
        }
    }
    handleRapidFireStart() {
        if(!this.state.rapidFire) {
            this.setState({ rapidFire: true });
        }
        this.fireLaser();
    }
    handleRapidFireCancel() {
        clearTimeout();
        this.setState({ rapidFire: false });
    }
    render() {
        return (
            <View style={[styles.root, this.props.style]}>
                {this.props.showLaser && 
                    <Animatable.View 
                        ref='laser'
                        style={styles.laser}
                    />
                }

                <Button
                    rounded
                    style={styles.button}
                    onPressIn={this.handleRapidFireStart}
                    onPressOut={this.handleRapidFireCancel}
                    color={colors.red}>FIRE</Button>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...mixins.column,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    laser: {
        ...mixins.arObject,
        top: variables.SCREEN_HEIGHT / 2,
        left: (variables.SCREEN_WIDTH / 2) - 3,
        width: 6,
        height: variables.SCREEN_HEIGHT / 2,
        backgroundColor: colors.red
    },
    button: {
        height: variables.BUTTON_HEIGHT,
        width: variables.BUTTON_WIDTH,
        marginVertical: variables.BUTTON_HEIGHT * .2
    }
    
});



function mapStateToProps({ environment }) {
    return {
        ...environment
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeIsAnimating: (isAnimating) => dispatch(changeIsAnimating(isAnimating)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FireLaserButton);