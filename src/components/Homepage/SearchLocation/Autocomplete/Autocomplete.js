import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Autocomplete.css';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';

class Autocomplete extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
    };
    static defaultProps = {
        suggestions: []
    };

    constructor(props) {
        super(props);

        this.state = {
            //The active selection's index
            activeSuggestion: 0,
            //The suggestions that match the user's input
            filteredSuggestions: [],
            //Whether or not the suggestion list is shown
            showSuggestions: false,
        };
    }

    onChange = e => {
        const { suggestions } = this.props;
        const userInput = e.target.value;

        //Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) === 0
        );
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
        });
        this.props.setInitialLocation(userInput);
    };

    handleClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
        });
        const userInput = e.target.innerText;
        this.props.setInitialLocation(userInput);
    };

    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        //User pressed the enter key
        if (e.keyCode === 13 && filteredSuggestions.length) {            
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
            });
            const userInput = filteredSuggestions[activeSuggestion]
            this.props.setInitialLocation(userInput);
        }
        //User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        //User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion + 1 === filteredSuggestions.length) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    render() {
        const {
            onChange,
            handleClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
            }
        } = this;

        let suggestionsListComponent;
        if (showSuggestions && this.props.userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let classNamee;
                            //Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                classNamee = "suggestionActive";
                            }
                            return (
                                <li className={classNamee} key={suggestion} onClick={handleClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="noSuggestions">
                        <em>No suggestions, you're on your own!</em>
                    </div>
                );
            }
        }

        return (
            <div>
                <input
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={this.props.userInput}
                    className="inputAutocomplete"
                />
                {suggestionsListComponent}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInput : state.exploration.initialLocation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setInitialLocation: (location) => dispatch(actions.setInitialLocation(location))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete);