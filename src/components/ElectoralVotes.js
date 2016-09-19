import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import timer from 'react-native-timer';

import Base from './Base';

import * as fonts from '../fonts';
import { mixins, colors, variables } from '../styles';

import { addElectoralVote, gameOver } from '../actions/game';

import { TIME_TO_NEXT_VOTE, AR_COUNT_TIME_FACTOR } from '../constants';

class ElectoralVotes extends Base {
    constructor(props) {
        super(props);
    }
    componentWillUnmount() {
        console.log('ElectoralVotes componentWillUnmount')
        timer.clearInterval(this, 'electoralVotesCounter');
    }
    shouldComponentUpdate(nextProps) {
        return this.props.electoralVotes !== nextProps.electoralVotes
    }
    componentDidUpdate(prevProps) {
        if(this.props.electoralVotes >= 270) {
            this.props.gameOver(false);
            timer.clearInterval(this, 'electoralVotesCounter');
            Actions.GameOver({ type: 'reset' });
        } else if(!this.props.paused) {
            let adjustedTimeToNextVote = TIME_TO_NEXT_VOTE / (1 + (this.props.arObjects.length / AR_COUNT_TIME_FACTOR));
            timer.clearInterval(this, 'electoralVotesCounter');
            timer.setInterval(this, 'electoralVotesCounter', () => {
                this.props.addElectoralVote();
            }, adjustedTimeToNextVote);
        }
    }
    render() {
        return (
            <View style={styles.root}>
                <Text
                    style={[
                        styles.votes,
                        {color: (this.props.electoralVotes > 200 ?
                            colors.red : colors.white)
                        }
                    ]}
                >
                    {this.props.electoralVotes + ' / 270'}
                </Text>
                <Text style={styles.text}>Electoral Votes</Text>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...mixins.column,
        position: 'absolute',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: variables.SCREEN_WIDTH * .45,
        paddingHorizontal: variables.SCREEN_WIDTH * .05,
        paddingVertical: variables.SCREEN_HEIGHT * .05,
        backgroundColor: colors.darkGrayTransparent,
    },
    votes: {
        ...fonts.romanMedium
    },
    text: {
        ...fonts.romanSmall,
        color: colors.white
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
        addElectoralVote: () => dispatch(addElectoralVote()),
        gameOver: (didWin) => dispatch(gameOver(didWin))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ElectoralVotes);