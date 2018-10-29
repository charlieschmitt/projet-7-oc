import React, { Component, Fragment } from 'react';

import Select from 'react-select';
import { colourOptions } from '../data';
import { Note } from '../styled-components';

// Import css du composant Filter
import './Filter.css';

const Checkbox = props => <input type="checkbox" {...props} />;

type State = {
  isClearable: boolean,
  isDisabled: boolean,
  isLoading: boolean,
  isRtl: boolean,
  isSearchable: boolean,
};

export default class Filter extends Component<*, State> {
  state = {
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: true,
  };

  toggleClearable = () =>
    this.setState(state => ({ isClearable: !state.isClearable }));
  toggleDisabled = () =>
    this.setState(state => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState(state => ({ isLoading: !state.isLoading }));
  toggleRtl = () => this.setState(state => ({ isRtl: !state.isRtl }));
  toggleSearchable = () =>
    this.setState(state => ({ isSearchable: !state.isSearchable }));
  render() {
    const {
      isClearable,
      isSearchable,
      isDisabled,
      isLoading,
      isRtl,
    } = this.state;
    return (
      <Fragment>
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={colourOptions[0]}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color"
          options={colourOptions}
        />
        <Note Tag="label">
          <Checkbox
            checked={isClearable}
            onChange={this.toggleClearable}
            id="cypress-single__clearable-checkbox"
          />
          Clearable
        </Note>
        <Note Tag="label" style={{ marginLeft: '1em' }}>
          <Checkbox
            checked={isSearchable}
            onChange={this.toggleSearchable}
            id="cypress-single__searchable-checkbox"
          />
          Searchable
        </Note>
        <Note Tag="label" style={{ marginLeft: '1em' }}>
          <Checkbox
            checked={isDisabled}
            onChange={this.toggleDisabled}
            id="cypress-single__disabled-checkbox"
          />
          Disabled
        </Note>
        <Note Tag="label" style={{ marginLeft: '1em' }}>
          <Checkbox
            checked={isLoading}
            onChange={this.toggleLoading}
            id="cypress-single__loading-checkbox"
          />
          Loading
        </Note>
        <Note Tag="label" style={{ marginLeft: '1em' }}>
          <Checkbox
            type="checkbox"
            checked={isRtl}
            onChange={this.toggleRtl}
            id="cypress-single__rtl-checkbox"
          />
          RTL
        </Note>
      </Fragment>
    );
  }
}

{/*
    export default class Filter extends Component {
    
    render() {
        return(
            <div className="filter-restaurants">
            <p>Quel type d'établissement recherchez-vous ?</p>
            <select class="select-selected">
            <option value="1">1 étoile</option>
            <option value="2">2 étoiles</option>
            <option value="3">3 étoiles</option>
            <option value="4">4 étoiles</option>
            <option value="5">5 étoiles</option>
            </select>
            </div>
            )
        }
    }
*/}