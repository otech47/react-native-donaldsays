import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Venue from '../Venue';

describe('<Venue />', () => {
    it('should render with the correct props', () => {
        let props = {
            venue: 'Sethau5',
            latitude: 26.118474,
            longitude: -80.1197779,
            budget: 50,
            commission: 45
        };

        let wrapper = shallow(
            <Venue {...props} />
        );

        console.log(wrapper)

        expect(wrapper.props().venue).to.equal('Sethau5');
    })
})