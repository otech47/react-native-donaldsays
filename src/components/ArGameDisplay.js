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

import Dimensions from 'Dimensions';

import Base from './Base';
import Button from './Button';
import FireLaserButton from './FireLaserButton';

import { buttons, mixins, colors, variables } from '../styles';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class ArGameDisplay extends Base {
    constructor(props) {
        super(props);
        this.autoBind('handleFire', 'handleStop', 'handleStart');
        this.state = {
            x: 0,
            y: 0,
            z: 0,
            gyro: true,
            sounds: {
                laser: new Sound('laser.wav', Sound.MAIN_BUNDLE)
            }
        };
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

    }
    componentWillUnmount() {
        Gyroscope.stopGyroUpdates();
    }
    handleFire() {
        this.state.sounds.laser.play((success) => {
            console.log('laserplay')
            console.log(success);
        });
    }
    handleStop() {
        Gyroscope.stopGyroUpdates();
        this.setState({
            gyro: false
        });
    }
    handleStart() {
        Gyroscope.startGyroUpdates();
        this.setState({
            gyro: true
        });
    }
    render() {
        return (
            <View style={{}}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}>
                    
                    <View style={styles.arDisplay}>
                        <View 
                            style={styles.arTempDataContainer}
                        >
                            <Text style={styles.arText}>x: {this.state.x}</Text>
                            <Text style={styles.arText}>y: {this.state.y}</Text>
                            <Text style={styles.arText}>z: {this.state.z}</Text>
                        </View>

                        <Image
                            source={require('../assets/trumpface.png')}
                            style={styles.arTarget}
                        />

                        <FireLaserButton/>

                        <FontIcon 
                            name='crosshairs'
                            size={variables.CROSSHAIRS_SIZE}
                            style={styles.crosshairs}
                            color={colors.white}
                        />
                        

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
    arDisplay: {
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1
    },
    arTarget: {
        ...mixins.arObject,
        top: height / 2,
        left: (width / 2)
    },
    arTempDataContainer: {
        ...mixins.arObject,
        left: (width / 2) - variables.BITCOIN_BUTTON_SIZE,
        bottom: height / 4
    },
    arText: {
        color: colors.white,
        backgroundColor: colors.darkGrayTransparent,
        padding: 5
    },
    crosshairs: {
        ...mixins.arObject,
        backgroundColor: 'rgba(0,0,0,0)',
        top: (height - variables.CROSSHAIRS_SIZE) / 2,
        left: (width - variables.CROSSHAIRS_SIZE) / 2
    },
    preview: {
        position: 'absolute',
        height: height,
        width: width
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
)(ArGameDisplay);