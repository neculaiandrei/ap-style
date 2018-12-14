import React from 'react';

const writeSpaces = depth => {
  switch (depth) {
    case 3:
      return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    case 2:
      return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    case 1:
      return '&nbsp;&nbsp;&nbsp;&nbsp;';
    case 0:
      return '';
    default:
      break;
  }
};

class DumbNode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: true
    };
  }

  handleToggle = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    const { expanded } = this.state;
    const { node, depth } = this.props;

    return (
      <div>
        <span>
          &#62;
          <span
            onClick={this.handleToggle}
            dangerouslySetInnerHTML={{
              __html: `${writeSpaces(depth)}${depth}-${node.name}`
            }}
          />
        </span>
        {expanded &&
          node.children.length !== 0 &&
          node.children.map((child, i) => (
            <DumbNode
              key={`${depth + 1}_${i}`}
              node={child}
              depth={depth + 1}
            />
          ))}
      </div>
    );
  }
}

const DumbGrid = ({ data }) => (
  <div>
    {data.map((node, i) => (
      <DumbNode key={`0_${i}`} node={node} depth={0} />
    ))}
  </div>
);

export default DumbGrid;
