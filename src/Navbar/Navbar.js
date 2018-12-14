import React from 'react';
import ComposedItem from './ComposedItem';
import DropdownItem from './DropdownItem';
import PreviewItem from './PreviewItem';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    const { addressingFilters, groups, sites, viewModes } = props;

    this.state = {
      addressingFilter: addressingFilters[0],
      group: groups[0],
      site: sites[0],
      viewMode: viewModes[0]
    };
  }

  handleAddressingFilterSelection = value => {
    this.setState({
      addressingFilter: value
    });
  };

  handleGroupSelection = value => {
    this.setState({
      group: value
    });
  };

  handleSiteSelection = value => {
    this.setState({
      site: value
    });
  };

  handleViewModeSelection = value => {
    this.setState({
      viewMode: value
    });
  };

  render() {
    const { addressingFilter, group, site, viewMode } = this.state;
    const { addressingFilters, groups, sites, viewModes } = this.props;

    return (
      <div className="ap-navbar">
        <DropdownItem
          options={addressingFilters}
          value={addressingFilter}
          onSelect={this.handleAddressingFilterSelection}
        />
        {addressingFilter.value === 1 && (
          <DropdownItem
            options={sites}
            value={site}
            onSelect={this.handleSiteSelection}
          />
        )}
        {addressingFilter.value === 2 && (
          <DropdownItem
            options={groups}
            value={group}
            onSelect={this.handleGroupSelection}
          />
        )}
        <ComposedItem
          items={viewModes}
          value={viewMode}
          onSelect={this.handleViewModeSelection}
        />
        <PreviewItem />
      </div>
    );
  }
}

export default Navbar;
