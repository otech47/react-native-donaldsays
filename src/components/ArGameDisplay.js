import React, { PropTypes } from 'react';
import {
    DeviceEventEmitter,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import FontIcon from 'react-native-vector-icons/FontAwesome';

import Camera from 'react-native-camera';
import Sound from 'react-native-sound';
import timer from 'react-native-timer';

import { Gyroscope } from 'NativeModules';

import Base from './Base';
import Button from './Button';
import DaysToElection from './DaysToElection';
import ElectoralVotes from './ElectoralVotes';
import FireLaserButton from './FireLaserButton';
import FloatingArObject from './FloatingArObject';

import * as fonts from '../fonts';
import { buttons, mixins, colors, variables } from '../styles';

import { addArObject, clearArObjects, updateGyroData } from '../actions/augmented';
import { addElectoralVote, resetGame, subtractDayToElection } from '../actions/game';

import {
    GYRO_MOVE_THRESHOLD_X,
    GYRO_MOVE_THRESHOLD_Y,
    MOVE_FACTOR_X,
    MOVE_FACTOR_Y,
    TIME_TO_NEXT_AR
} from '../constants';

class ArGameDisplay extends Base {
    constructor(props) {
        super(props);
        this.autoBind('handleGameStart', 'countDown', 'startArObjectTimer');
        this.state = {
            timeToStart: 3
        };
    }
    componentWillMount() {
        
    }
    componentDidMount() {
        this.props.clearArObjects();
        this.props.resetGame();
        Gyroscope.stopGyroUpdates();
        Gyroscope.setGyroUpdateInterval(0.05); // in seconds
        DeviceEventEmitter.addListener('GyroData', this.props.updateGyroData);
        this.countDown();
    }
    componentWillUnmount() {
        Gyroscope.stopGyroUpdates();
        this.props.clearArObjects();
        timer.clearInterval(this, 'arObjectGenerator');
        timer.clearInterval(this, 'countdown');
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.timeToStart != this.state.timeToStart && this.state.timeToStart <= 0) {
            timer.clearInterval(this, 'countdown');
            this.handleGameStart();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {

        return (
            this.props.arExplode !== nextProps.arExplode || 
            this.state.timeToStart != nextState.timeToStart ||
            this.props.arObjects.length != nextProps.arObjects.length
        );
    }
    countDown() {
        timer.setInterval(this, 'countdown', () => {
            this.setState({
                timeToStart: this.state.timeToStart - 1
            });
        }, 1000);
    }
    handleGameStart() {
        Gyroscope.startGyroUpdates();
        this.props.addElectoralVote();
        this.props.subtractDayToElection();
        this.startArObjectTimer();
    }
    startArObjectTimer() {

        let timeToNextAr = Math.min(this.props.arObjects.length * 100 + TIME_TO_NEXT_AR / 2, TIME_TO_NEXT_AR);

        timer.clearInterval(this, 'arObjectGenerator');
        timer.setInterval(this, 'arObjectGenerator', () => {
            let startingPosX = Math.random() * variables.SCREEN_WIDTH * (Math.random() > 0.5 ? -1 : 1) + (variables.SCREEN_WIDTH * .5);
            let startingPosY = Math.random() * variables.SCREEN_HEIGHT * .75 * (Math.random() > 0.5 ? -1 : 1) + (variables.SCREEN_HEIGHT * .8);

            this.props.addArObject({
                imageUrl: '../assets/images/trump.png',
                hit: false,
                startingPosX: startingPosX,
                startingPosY: startingPosY
            });
            this.startArObjectTimer();

        }, timeToNextAr);
    }
    render() {
        console.log('ArGamedisplay render: ');
        return (
            <View style={styles.root}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                >
                    <View style={styles.arDisplay}>
                        {this.props.arExplode && 
                            <Image
                                source={require('../assets/images/trumpexplode2.png')}
                                resizeMode='contain'
                                style={styles.trumpExplode}
                            />
                        }

                        {
                            this.props.arObjects.map((arObj, i) => {
                                return (
                                    <FloatingArObject
                                        key={'arObject-' + i}
                                        index={i}
                                        imageUrl={arObj.imageUrl}
                                        hit={arObj.hit}
                                        startingPosX={arObj.startingPosX}
                                        startingPosY={arObj.startingPosY}
                                    />
                                )
                            })
                        }

                        <FireLaserButton
                            showLaser 
                            style={styles.fireLaserButton}
                        />

                        <FontIcon 
                            name='crosshairs'
                            size={variables.CROSSHAIRS_SIZE}
                            style={styles.crosshairs}
                            color={colors.white}
                        />

                        {this.state.timeToStart > 0 &&
                            <View style={styles.countdownContainer} onPress={null}>
                                <Text style={[styles.arText, styles.instructions]}>Wake up! Don't let him reach 270 votes before election day!</Text>
                                <Text style={[styles.arText, styles.arCounter]}>{this.state.timeToStart}</Text>
                            </View>
                        }

                        <ElectoralVotes type='reset'/>
                        <DaysToElection type='reset'/>

                    </View>
                </Camera>
                
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...mixins.defaultPage,
        ...mixins.column
    },
    arCounter: {
        ...fonts.heavyLarge,
        position: 'absolute',
        top: variables.SCREEN_HEIGHT / 2,
        width: variables.SCREEN_WIDTH
    },
    arDisplay: {
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1
    },
    arText: {
        ...fonts.romanMedium,
        color: colors.white,
        flex: 1,
        padding: 5,
        textAlign: 'center'
    },
    countdownContainer: {
        ...mixins.column,
        ...mixins.arObject,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkGrayTransparent,
        height: variables.SCREEN_HEIGHT,
        width: variables.SCREEN_WIDTH,
        top: 0,
        left: 0
    },
    crosshairs: {
        ...mixins.arObject,
        ...mixins.column,
        justifyContent: 'center',
        top: variables.CROSSHAIRS_POSITION_TOP,
        left: variables.CROSSHAIRS_POSITION_LEFT,
        width: variables.CROSSHAIRS_SIZE,
        height: variables.CROSSHAIRS_SIZE
    },
    fireLaserButton: {
        height: variables.SCREEN_HEIGHT / 2,
        width: variables.SCREEN_WIDTH,
        position: 'absolute',
        top: variables.SCREEN_HEIGHT / 2,
        left: 0
    },
    instructions: {
        position: 'absolute',
        left: 0,
        bottom: variables.SCREEN_HEIGHT / 2,
        width: variables.SCREEN_WIDTH,
        paddingBottom: 8
    },
    preview: {
        position: 'absolute',
        height: variables.SCREEN_HEIGHT,
        width: variables.SCREEN_WIDTH
    },
    trumpExplode: {
        ...mixins.arObject,
        ...mixins.column,
        justifyContent: 'center',
        top: variables.CROSSHAIRS_POSITION_TOP,
        left: variables.CROSSHAIRS_POSITION_LEFT,
        width: variables.CROSSHAIRS_SIZE,
        height: variables.CROSSHAIRS_SIZE
    }
    
});



function mapStateToProps({ augmented, game }) {
    return {
        ...augmented,
        ...game
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addArObject: (arObj) => dispatch(addArObject(arObj)),
        addElectoralVote: () => dispatch(addElectoralVote()),
        clearArObjects: () => dispatch(clearArObjects()),
        subtractDayToElection: () => dispatch(subtractDayToElection()),
        resetGame: () => dispatch(resetGame()),
        updateGyroData: (data) => dispatch(updateGyroData(data))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArGameDisplay);