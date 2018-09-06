import {Text, View} from 'react-native'
import React from 'react';
import PropTypes from 'prop-types';

import Parent from './Parent'

class Child extends Parent {
    renderThing() {
        return (
            <View style={Parent.styles.container}>
                <Text>Working?</Text>
            </View>
        )
    }
}

export default Child;
