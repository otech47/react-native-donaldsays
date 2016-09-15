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

import { Gyroscope } from 'NativeModules';

import Base from './Base';
import Button from './Button';
import DaysToElection from './DaysToElection';
import ElectoralVotes from './ElectoralVotes';
import FireLaserButton from './FireLaserButton';

import * as fonts from '../fonts';
import { buttons, mixins, colors, variables } from '../styles';

import { addElectoralVote, resetGame, subtractDayToElection } from '../actions/game';

class ArGameDisplay extends Base {
    constructor(props) {
        super(props);
        this.autoBind('handleStop', 'handleGameStart', 'countDown');
        this.state = {
            x: 0,
            y: 0,
            z: 0,
            gyro: true,
            timeToStart: 3
        };
    }
    componentWillMount() {
        this.props.resetGame();
    }
    componentDidMount() {
        // getPosition();
        console.log('componentDidMount')
        Gyroscope.setGyroUpdateInterval(0.1); // in seconds
        console.log(Gyroscope)
        DeviceEventEmitter.addListener('GyroData', (data) => {
            // console.log(data.rotationRate);
            this.setState({
                x: data.rotationRate.x.toFixed(5),
                y: data.rotationRate.y.toFixed(5),
                z: data.rotationRate.z.toFixed(5)
            });
        });
        Gyroscope.startGyroUpdates();
        this.countDown();
    }
    componentWillUnmount() {
        console.log('ArGameDisplay componentWillUnmount')
        Gyroscope.stopGyroUpdates();
    }
    handleStop() {
        Gyroscope.stopGyroUpdates();
        this.setState({
            gyro: false
        });
    }
    handleGameStart() {
        // this.props.addElectoralVote();
        // this.props.subtractDayToElection();
    }
    countDown() {
        console.log('countDown: ' + this.state.timeToStart)
        if(this.state.timeToStart > 0) {
            setTimeout(() => {
                this.setState({
                    timeToStart: this.state.timeToStart - 1
                });
                this.countDown();
            }, 1000);
        } else {
            this.handleGameStart();
        }
    }
    render() {
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
                        <View 
                            style={styles.arTempDataContainer}
                        >
                            <Text style={styles.arText}>x: {this.state.x}</Text>
                            <Text style={styles.arText}>y: {this.state.y}</Text>
                            <Text style={styles.arText}>z: {this.state.z}</Text>
                        </View>

                        <Image
                            source={require('../assets/images/trumpface.png')}
                            style={styles.arTarget}
                        />

                        <FireLaserButton showLaser style={styles.fireLaserButton}/>

                        <FontIcon 
                            name='crosshairs'
                            size={variables.CROSSHAIRS_SIZE}
                            style={styles.crosshairs}
                            color={colors.white}
                        />

                        {this.state.timeToStart > 0 &&
                            <View style={styles.countdownContainer} onPress={null}>
                                <View style={styles.countdown}>
                                    <Text style={styles.arText}>Wake up! Don't let him reach 270 votes before election day!</Text>
                                    <Text style={styles.arCounter}>{this.state.timeToStart}</Text>
                                </View>
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
        color: colors.white,
        flex: 1,
        padding: 5,
        textAlign: 'center'
    },
    arDisplay: {
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1
    },
    arTarget: {
        ...mixins.arObject,
        top: variables.SCREEN_HEIGHT / 2,
        left: (variables.SCREEN_WIDTH / 2)
    },
    arTempDataContainer: {
        ...mixins.arObject,
        left: (variables.SCREEN_WIDTH / 2) - variables.BITCOIN_BUTTON_SIZE,
        bottom: variables.SCREEN_HEIGHT / 4
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
        padding: 15,
        backgroundColor: colors.darkGrayTransparent,
        height: variables.SCREEN_HEIGHT,
        width: variables.SCREEN_WIDTH,
        top: 0,
        left: 0
    },
    coutdown: {
        flex: 1,
        ...mixins.column
    },
    crosshairs: {
        ...mixins.arObject,
        backgroundColor: 'rgba(0,0,0,0)',
        top: (variables.SCREEN_HEIGHT - variables.CROSSHAIRS_SIZE) / 2,
        left: (variables.SCREEN_WIDTH - variables.CROSSHAIRS_SIZE) / 2
    },
    fireButton: {
        height: variables.BUTTON_HEIGHT,
        width: variables.BUTTON_WIDTH,
        position: 'absolute',
        top: variables.SCREEN_HEIGHT - variables.BUTTON_HEIGHT * 2,
        left: (variables.SCREEN_WIDTH - variables.BUTTON_WIDTH) / 2
    },
    fireLaserButton: {
        height: variables.SCREEN_HEIGHT / 2,
        width: variables.SCREEN_WIDTH,
        position: 'absolute',
        top: variables.SCREEN_HEIGHT / 2,
        left: 0
    },
    preview: {
        position: 'absolute',
        height: variables.SCREEN_HEIGHT,
        width: variables.SCREEN_WIDTH
    }
    
});



function mapStateToProps({ game }) {
    return {
        ...game
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addElectoralVote: () => dispatch(addElectoralVote()),
        subtractDayToElection: () => dispatch(subtractDayToElection()),
        resetGame: () => dispatch(resetGame())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArGameDisplay);