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

import { gameOver, subtractDayToElection } from '../actions/game';

import { TIME_TO_NEXT_DAY } from '../constants';

class DaysToElection extends Base {
    constructor(props) {
        super(props);
    }
    componentWillUnmount() {
        console.log('DaysToElection componentWillUnmount')
        timer.clearInterval(this, 'daysToElectionCounter');

    }
    shouldComponentUpdate(nextProps) {
        return this.props.daysToElection !== nextProps.daysToElection
    }
    componentDidUpdate(prevProps) {
        if(this.props.daysToElection <= 0) {
            this.props.gameOver(true);
            timer.clearInterval(this, 'daysToElectionCounter');
            Actions.GameOver({ type: 'reset' });
        } else if(!this.props.paused) {
            timer.clearInterval(this, 'daysToElectionCounter');
            timer.setInterval(this, 'daysToElectionCounter', () => {
                this.props.subtractDayToElection();
            }, TIME_TO_NEXT_DAY)
        }
    }
    render() {
        return (
            <View style={styles.root}>
                <Text
                    style={styles.days}
                >
                    {this.props.daysToElection}
                </Text>
                <Text style={styles.text}>Days to Election</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...mixins.column,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: variables.SCREEN_WIDTH * .55,
        width: variables.SCREEN_WIDTH * .45,
        paddingHorizontal: variables.SCREEN_WIDTH * .05,
        paddingVertical: variables.SCREEN_HEIGHT * .05,
        backgroundColor: colors.darkGrayTransparent,
    },
    days: {
        ...fonts.romanMedium,
        color: colors.white
    },
    text: {
        ...fonts.romanSmall,
        color: colors.white
    }
    
});

function mapStateToProps({ game }) {
    return {
        ...game
    };
}

function mapDispatchToProps(dispatch) {
    return {
        subtractDayToElection: () => dispatch(subtractDayToElection()),
        gameOver: (didWin) => dispatch(gameOver(didWin))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DaysToElection);