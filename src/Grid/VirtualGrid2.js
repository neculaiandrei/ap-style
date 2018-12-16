import React from 'react';
import { Grid } from 'react-virtualized';

var VirtualGridRef;
function setRef(ref) {
  VirtualGridRef = ref;
}

class VirtualGrid extends React.Component {
  constructor(props) {
    super(props);

    this.backupData = props.data;

    this.state = {
      data: props.data
    };
  }

  findById = id => {
    return this.backupData.findIndex(i => {
      return i[0].id === id;
    });
  };

  getColumnWidth = ({ index }) => {
    if (index === 0) {
      return 350;
    } else if (index === 1) {
      return 550;
    }
  };

  expandRow = rowIndex => {
    var { data } = this.state;
    var item = this.state.data[rowIndex][0];
  };

  collapseRow = rowIndex => {
    var { data } = this.state;
    var item = this.state.data[rowIndex][0];
    var startIndex = rowIndex + 1;
    var stopIndex = -1;
    var i = startIndex;
    var endNotFound = true;

    if (data[startIndex][0].depth === item.depth) {
      return;
    }

    while (endNotFound) {
      i++;

      if (i === data.length) {
        stopIndex = i;
        endNotFound = false;
        continue;
      }

      if (data[i][0].depth <= item.depth) {
        stopIndex = i;
        endNotFound = false;
      }
    }
    item.expanded = false;
    data.splice(startIndex, stopIndex - startIndex);
    this.setState({
      data: data
    });
  };

  levelRenderer = depth => {
    if (depth === 0) {
      return '';
    } else {
      var result = '';
      for (var i = 0; i < depth; i++) {
        result += '&nbsp;&nbsp;&nbsp;&nbsp;';
      }
      return result;
    }
  };

  cellRenderer = ({ key, rowIndex, columnIndex, style }) => {
    var item = this.state.data[rowIndex][columnIndex];
    if (columnIndex === 0) {
      return (
        <div key={key} style={style} onClick={_ => this.collapseRow(rowIndex)}>
          <div>
            <span
              dangerouslySetInnerHTML={{
                __html: this.levelRenderer(item.depth)
              }}
            />
            {`${item.depth}-${item.name}-${item.expanded}`}
          </div>
        </div>
      );
    } else if (columnIndex === 1) {
      return (
        <div key={key} style={style}>
          <div
            style={{
              display: 'inline-block',
              width: `${item}%`,
              border: '3px black solid'
            }}
          />
        </div>
      );
    }
  };

  render() {
    var { data } = this.state;
    return (
      <div>
        <Grid
          ref={setRef}
          className="ap-grid"
          cellRenderer={this.cellRenderer}
          columnCount={2}
          columnWidth={this.getColumnWidth}
          height={700}
          rowCount={data.length}
          rowHeight={30}
          width={1000}
        />
        <p>Now nodes: {data.length}</p>
      </div>
    );
  }
}

export default VirtualGrid;
