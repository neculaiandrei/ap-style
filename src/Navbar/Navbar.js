import React from 'react';
import ComposedItem from './ComposedItem';
import DropdownItem from './DropdownItem';
import PreviewItem from './PreviewItem';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    const { addressingFilters, groups, sites } = props;

    this.state = {
      selectedAddressingFilter: addressingFilters[0],
      selectedGroup: groups[0],
      selectedSite: sites[0]
    };
  }

  handleAddressingSelection = value => {
    this.setState({
      selectedAddressingFilter: value
    });
  };

  handleGroupSelection = value => {
    this.setState({
      selectedGroup: value
    });
  };

  handleSiteSelection = value => {
    this.setState({
      selectedSite: value
    });
  };

  render() {
    const {
      selectedAddressingFilter,
      selectedGroup,
      selectedSite
    } = this.state;
    const { addressingFilters, groups, sites, viewModes } = this.props;

    return (
      <div className="ap-navbar">
        <DropdownItem
          options={addressingFilters}
          value={selectedAddressingFilter}
          onSelect={this.handleAddressingSelection}
        />
        {selectedAddressingFilter.value === 1 && (
          <DropdownItem
            options={sites}
            value={selectedSite}
            onSelect={this.handleSiteSelection}
          />
        )}
        {selectedAddressingFilter.value === 2 && (
          <DropdownItem
            options={groups}
            value={selectedGroup}
            onSelect={this.handleGroupSelection}
          />
        )}
        <ComposedItem items={viewModes} />
        <PreviewItem />
      </div>
    );
  }
}

export default Navbar;
