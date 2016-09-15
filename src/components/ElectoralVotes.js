import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Base from './Base';

import * as fonts from '../fonts';
import { mixins, colors, variables } from '../styles';

import { addElectoralVote, gameOver } from '../actions/game';

class ElectoralVotes extends Base {
    constructor(props) {
        super(props);
    }
    componentWillUnmount() {
        console.log('ElectoralVotes componentWillUnmount')

    }
    shouldComponentUpdate(nextProps) {
        return this.props.electoralVotes !== nextProps.electoralVotes
    }
    componentDidUpdate(prevProps) {
        if(this.props.electoralVotes >= 270) {
            this.props.gameOver(false);
            Actions.GameOver({ type: 'reset' });
        } else if(!this.props.paused) {
            setTimeout(() => {
                this.props.addElectoralVote();
            }, 100);
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
        padding: variables.SCREEN_WIDTH * .05,
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



function mapStateToProps({ game }) {
    return {
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