import React, { Component } from 'react';
import Autocomplete from './Autocomplete/Autocomplete';
import suggestions from './countries';

class SearchLocation extends Component {
    render() {
        return (
            <div>
                <Autocomplete
                    suggestions={suggestions}
                />
            </div>
        );
    }
}

export default SearchLocation;
