import {StyleSheet, View} from 'react-native'
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red'
    }
});

class Parent extends PureComponent {
    static styles = styles;

    render() {
        return (
            <View>
                {this.renderThing()}
            </View>
        )
    }
}

export default Parent;
