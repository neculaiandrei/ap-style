import React from 'react';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      value: props[0]
    };
  }
  
  handleToggle = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

  render() {
    const { options, onSelect, value } = this.props; 
    const { isExpanded } = this.state;

    return (
      <div className='ap-dropdown'>
        <div 
          className='header'
          onClick={this.handleToggle}>
          {value.label} <b className='arrow'>&#9207;</b>
        </div>
        {
          isExpanded &&
          <div className='options-container'>
            {options.map((o, i) => (
              <div
                key={i}
                className='option'
                onClick={_ => {
                  this.handleToggle();
                  onSelect(o);
                }}>
                {o.label}
              </div>
            ))}
          </div>
        }
      </div>
    )
  }
}

export default Dropdown;