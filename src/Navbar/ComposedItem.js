import React from 'react';

class ComposedItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: props[0]
    };
  }

  handleSelect = item => {
    this.setState({
      selectedItem: item
    });
  };

  render() {
    const { items } = this.props;
    const { selectedItem } = this.state;

    return (
      <div className="item item-composed">
        {items.map((item, i) => (
          <div
            key={i}
            className={`sub-item ${
              item === selectedItem ? 'sub-item--selected' : ''
            }`}
            onClick={_ => this.handleSelect(item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    );
  }
}

export default ComposedItem;
