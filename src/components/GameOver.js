import React, { PropTypes } from 'react';
import {
    Image,
    Linking,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Share, {ShareSheet} from 'react-native-share';

import Base from './Base';
import Button from './Button';
import DaysToElection from './DaysToElection';
import ElectoralVotes from './ElectoralVotes';

import * as fonts from '../fonts';
import { buttons, mixins, colors, variables } from '../styles';
import { HARAMBE_SHIRT_LINK } from '../constants';

class GameOver extends Base {
    constructor(props) {
        super(props);
        this.state = {
            sounds: {
                win: new Sound('win.wav', Sound.MAIN_BUNDLE),
                lose: new Sound('lose.wav', Sound.MAIN_BUNDLE)
            }
        };
    }
    componentWillUnmount() {
        console.log('GameOver componentWillUnmount')

    }
    componentDidMount() {
        if(this.props.didWin) {
            this.state.sounds.win.play();
        } else {
            this.state.sounds.lose.play();
        }
    }
    handleShare() {
        console.log('handleShare');
        let shareOptions = {
            title: 'DonaldSays',
            message: 'DonaldSays',
            url: 'https://play.google.com/store/apps/details?id=com.setdev.donaldsays',
            subject: 'Check out DonaldSays...'
        };
        Share.open(shareOptions);
    }
    handleShirtLink() {
        console.log('handleShirtLink');
        Linking.openURL(HARAMBE_SHIRT_LINK).catch(err => console.error('An error occurred', err));
    }
    handlePlayAgain() {
        console.log('handlePlayAgain');
        Actions.ArGameDisplay({ type: 'reset' });
    }
    render() {

        let imagePath;
        let gameOverText;

        if(this.props.didWin) {
            imagePath = require('../assets/images/world_peace.jpg');
            gameOverText = 'Congratulations, you\'ve defeated white supremacy!';
        } else {
            imagePath = require('../assets/images/end_of_world_4.jpg');
            gameOverText = 'You made America "GREAT" again!';
        }
        
        return (
            <View style={styles.root}>
                <Image
                    style={styles.backgroundImage}
                    source={imagePath}
                />

                <ElectoralVotes paused type='reset'/>
                <DaysToElection paused type='reset'/>

                <View style={styles.contentContainer}>
                    <Text style={styles.gameOverText}>{gameOverText}</Text>
                    <View style={styles.buttonContainer}>
                        <Button 
                            rounded
                            style={styles.button}
                            textStyle={styles.buttonText}
                            onPress={this.handlePlayAgain}
                            color={colors.red}
                        >
                            Play Again
                        </Button>
                        <Button 
                            rounded
                            style={styles.button}
                            textStyle={styles.buttonText}
                            onPress={this.handleShare}
                            color={colors.blue}
                        >
                            Share
                        </Button>
                    </View>
                    <Button 
                        rounded
                        style={styles.button}
                        textStyle={styles.buttonText}
                        onPress={this.handleShirtLink}
                        color={colors.lightBlue}
                    >
                        #JusticeForHarambe
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
    buttonContainer: {
        ...mixins.row
    },
    button: {
        ...buttons.play,
        flex: 1,
        marginHorizontal: variables.SCREEN_WIDTH * .05,
        marginVertical: variables.SCREEN_HEIGHT * .05,
        paddingVertical: variables.SCREEN_HEIGHT * .02,
        paddingHorizontal: variables.SCREEN_WIDTH * .1
    },
    buttonText: {
        ...fonts.romanSmall
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: variables.SCREEN_HEIGHT,
        width: variables.SCREEN_WIDTH
    },
    contentContainer: {
        ...mixins.column,
        marginTop: variables.SCREEN_HEIGHT * .25
    },
    gameOverText: {
        ...fonts.romanMedium,
        color: colors.white,
        textAlign: 'center',
        backgroundColor: colors.darkGrayTransparent,
        width: variables.SCREEN_WIDTH,
        padding: variables.SCREEN_WIDTH * .05
    }
});

function mapStateToProps({ game }) {
    return {
        ...game
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameOver);