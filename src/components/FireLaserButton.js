import React, { PropTypes } from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import timer from 'react-native-timer';

import Base from './Base';
import Button from './Button';

import { buttons, mixins, colors, variables } from '../styles';

import { explodeArObject, removeArObject } from '../actions/augmented';
import { changeIsAnimating } from '../actions/environment';

import { playSound, playRandomHitSound, stopSound } from '../scripts/sounds';

const ACTION_TIMER = 200;

class FireLaserButton extends Base {
    constructor(props) {
        super(props);
        this.autoBind('fireLaser', 'handleRapidFireStart', 'handleRapidFireCancel', 'startLaserAnimation');
        this.state = {
            showLaser: true,
            rapidFire: true
        };
    }
    componentWillUnmount() {
        console.log('FireLaserButton: componentWillUnmount')
        timer.clearTimeout(this, 'laserWait');
        timer.clearTimeout(this, 'explode');
        this.props.changeIsAnimating(false);
        this.props.explodeArObject(false);
    }
    startLaserAnimation() {
        this.props.changeIsAnimating(true);
        
        this.refs.laser.transition({
            top: variables.SCREEN_HEIGHT / 2,
            height: variables.SCREEN_HEIGHT / 2,
            width: 6
        }, {
            top: 0,
            height: 0,
            width: 1
        }, 150, 'ease-out');
        timer.setTimeout(this, 'laserWait', () => {
            this.props.changeIsAnimating(false);
            this.props.arObjects.map((arObj, index) => {
                if(
                    (arObj.startingPosX + this.props.xOffset) >= (variables.CROSSHAIRS_POSITION_LEFT - variables.CROSSHAIRS_SIZE / 2)
                    &&
                    (arObj.startingPosX + this.props.xOffset) <= (variables.CROSSHAIRS_POSITION_RIGHT - variables.CROSSHAIRS_SIZE / 2)
                    &&
                    (arObj.startingPosY + this.props.yOffset) >= (variables.CROSSHAIRS_POSITION_TOP - variables.CROSSHAIRS_SIZE / 2)
                    &&
                    (arObj.startingPosY + this.props.yOffset) <= (variables.CROSSHAIRS_POSITION_BOTTOM - variables.CROSSHAIRS_SIZE / 2)
                ) {
                    playRandomHitSound();
                    this.props.removeArObject(index);
                    this.props.explodeArObject(true);
                    timer.clearTimeout(this, 'explode')
                    timer.setTimeout(this, 'explode', () => {
                        this.props.explodeArObject(false);
                    }, 100);
                }
            })
        }, 150);
        
    }
    fireLaser() {
        if(this.props.isAnimating) {
            return;
        }

        if(this.state.rapidFire) {
            this.props.showLaser && this.startLaserAnimation();
            stopSound('laser');
            playSound('laser');
            timer.clearInterval(this, 'fireLaser');
            timer.setInterval(this, 'fireLaser', () => {
                this.state.rapidFire && this.fireLaser();
            }, ACTION_TIMER);
        } else {
            this.props.showLaser && this.startLaserAnimation();
            stopSound('laser');
            playSound('laser');
        }
    }
    handleRapidFireStart() {
        if(!this.state.rapidFire) {
            this.setState({ rapidFire: true });
        }
        this.fireLaser();
    }
    handleRapidFireCancel() {
        timer.clearInterval(this, 'fireLaser');
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



function mapStateToProps({ augmented, environment }) {
    return {
        ...augmented,
        ...environment
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeIsAnimating: (isAnimating) => dispatch(changeIsAnimating(isAnimating)),
        explodeArObject: (arObjIndex) => dispatch(explodeArObject(arObjIndex)),
        removeArObject: (arObjIndex) => dispatch(removeArObject(arObjIndex))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FireLaserButton);