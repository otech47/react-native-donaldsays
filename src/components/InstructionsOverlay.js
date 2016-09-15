import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-toast';

import Base from './Base';
import Button from './Button';
import FireLaserButton from './FireLaserButton';

import { buttons, mixins, colors, variables } from '../styles';
import * as fonts from '../fonts';

import { changeIsAnimating, instructionsOverlay, playFirstTime } from '../actions/environment';

class InstructionsOverlay extends Base {
    static propTypes = {
    }
    constructor(props) {
        super(props);
        this.autoBind('dismissOverlay', 'startGame');
    }
    dismissOverlay() {
        if(this.props.isAnimating) {
            return;
        }

        let flipOutPanel = () => {
            return new Promise( (resolve, reject) => {
                this.refs.panel.flipOutX(600).then(resolve);
            });
        };
        let delayedFade = () => {
            return new Promise( (resolve, reject) => {
                setTimeout(() => {
                    this.refs.overlay.fadeOut(300).then(resolve);
                }, 300);
            });
        };

        this.props.changeIsAnimating(true);
        
        Promise.all([
            flipOutPanel(),
            delayedFade()
        ]).then(endState => {
            this.props.changeIsAnimating(false);
            this.props.instructionsOverlay(false);
            this.props.playFirstTime();
        })
    }
    startGame() {
        if(this.props.isAnimating) {
            return;
        }

        let flipOutPanel = () => {
            return new Promise( (resolve, reject) => {
                this.refs.panel.flipOutX(600).then(resolve);
            });
        };
        let delayedFade = () => {
            return new Promise( (resolve, reject) => {
                setTimeout(() => {
                    this.refs.overlay.fadeOut(300).then(resolve);
                }, 300);
            });
        };

        this.props.changeIsAnimating(true);
        
        Promise.all([
            flipOutPanel(),
            delayedFade()
        ]).then(endState => {
            this.props.changeIsAnimating(false);
            this.props.instructionsOverlay(false);
            this.props.playFirstTime();
            Actions.ArGameDisplay();
        })
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.dismissOverlay}>
                <Animatable.View 
                    ref='overlay'
                    animation='fadeIn'
                    duration={300}
                    style={styles.root}
                >
                    <TouchableWithoutFeedback onPress={null}> 
                        <Animatable.View
                            ref='panel'
                            animation='flipInX'
                            style={styles.panel}
                            duration={600}
                            easeing='ease-in-out'
                            delay={200}
                        >
                            <View style={styles.container}>
                                <Text style={styles.text}>Move your phone up, down, and around to aim at any nearby danger!</Text>
                                <Image style={styles.image} source={require('../assets/images/howtoplay.jpg')} />
                                <Text style={styles.text}>Tap to shoot, hold down for rapid fire</Text>

                                <FireLaserButton style={styles.button}/>

                                <Text style={styles.alertText}>Turn up your volume!</Text>

                                <View style={styles.actionContainer}>
                                    <Text
                                        style={styles.actionButton}
                                        onPress={this.startGame}>Start</Text>
                                </View>
                                
                            </View>
                            

                        </Animatable.View>
                    </TouchableWithoutFeedback>
                </Animatable.View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...mixins.column,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.transparent,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flex: 1
    },
    actionButton: {
        ...fonts.heavyMedium,
        color: colors.blue
    },
    actionContainer: {
        ...mixins.row,
        alignSelf: 'center',
        flex: 1,
        alignItems: 'flex-end'
    },
    button: {
        marginVertical: variables.SCREEN_HEIGHT * .02
    },
    container: {
        flex: 1,
        ...mixins.column,
        alignItems: 'center'
    },
    image: {
        height: variables.SCREEN_HEIGHT * .22,
        width: variables.SCREEN_HEIGHT * .22,
        marginTop: variables.SCREEN_HEIGHT * .04,
        marginBottom: variables.SCREEN_HEIGHT * .02
    },
    panel: {
        ...mixins.column,
        ...mixins.createShadow(3),
        alignItems: 'center',
        flex: 1,
        borderRadius: 7,
        backgroundColor: colors.white,
        marginHorizontal: variables.SCREEN_WIDTH * .05,
        marginVertical: variables.SCREEN_HEIGHT * .1,
        padding: variables.SCREEN_HEIGHT * .045
    },
    text: {
        ...fonts.romanSmall,
        color: colors.darkGray,
        textAlign: 'center'
    },
    alertText: {
        ...fonts.romanSmall,
        color: colors.red,
        textAlign: 'center'
    }
    
});

function mapStateToProps({ environment }) {
    return {
        ...environment
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeIsAnimating: (show) => dispatch(changeIsAnimating(show)),
        playFirstTime: () => dispatch(playFirstTime()),
        instructionsOverlay: (show) => dispatch(instructionsOverlay(show))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstructionsOverlay);