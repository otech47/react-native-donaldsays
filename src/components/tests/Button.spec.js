import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Button from '../Button';

describe('<Button/>', () => {
    it('should render children with supplied props', () => {
        let blue = '#22a7f0';
        let wrapper = shallow(
            <Button 
                color={blue}
                onPress={() => console.log('Button.onPress')}
            >
                Sign In
            </Button>
        );

        console.log(wrapper.children());
    })
})