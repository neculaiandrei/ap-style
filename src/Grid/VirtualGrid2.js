import React from 'react';
import { Grid } from 'react-virtualized';
import TreeNode from './TreeNode';
import TimelineRow from './TimelineRow';

const TREE_WIDTH = 350;
const TIMELINE_WIDTH = 930;

class VirtualGrid extends React.Component {
  constructor(props) {
    super(props);

    this.initialData = [...props.data];
    this.state = {
      data: props.data,
      selectedId: -1
    };
  }

  handleClick = id => {
    this.setState({
      selectedId: id
    });
  };

  findById = id => {
    return this.initialData.findIndex(item => {
      return item[0].id === id;
    });
  };

  getColumnWidth = ({ index }) => {
    if (index === 0) {
      return TREE_WIDTH;
    } else if (index === 1) {
      return TIMELINE_WIDTH;
    }
  };

  toggleNode = (e, rowIndex, expanded) => {
    e.stopPropagation();
    expanded ? this.collapseRow(rowIndex) : this.expandRow(rowIndex);
  };

  expandRow = rowIndex => {
    var { data } = this.state;
    var id = data[rowIndex][0].id;
    var backupRowIndex = this.findById(id);
    var startIndex = backupRowIndex + 1;
    var stopIndex = -1;
    var i = startIndex;
    var endNotFound = true;

    if (
      this.initialData[startIndex][0].depth ===
      this.initialData[backupRowIndex][0].depth
    ) {
      data[rowIndex][0].expanded = true;
      return;
    }

    while (endNotFound) {
      i++;

      if (i === this.initialData.length) {
        stopIndex = i;
        endNotFound = false;
      } else if (
        this.initialData[i][0].depth <=
        this.initialData[backupRowIndex][0].depth
      ) {
        stopIndex = i;
        endNotFound = false;
      }
    }
    data[rowIndex][0].expanded = true;
    data.splice(
      rowIndex + 1,
      0,
      ...this.initialData.slice(startIndex, stopIndex)
    );
    this.setState({
      data: data
    });
  };

  collapseRow = rowIndex => {
    var { data } = this.state;
    var item = this.state.data[rowIndex][0];
    var startIndex = rowIndex + 1;
    var stopIndex = -1;
    var i = startIndex;
    var endNotFound = true;

    if (data[startIndex][0].depth <= item.depth) {
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

  cellRenderer = ({ key, rowIndex, columnIndex, style, selectedId }) => {
    var { data } = this.state;
    var item = data[rowIndex][columnIndex];
    var isSelected = data[rowIndex][0].id === selectedId;

    if (columnIndex === 0) {
      return (
        <div key={key} style={style}>
          <TreeNode
            item={item}
            isHighlighted={isSelected}
            onClick={_ => this.handleClick(item.id)}
            onToggle={e => this.toggleNode(e, rowIndex, item.expanded)}
          />
        </div>
      );
    } else if (columnIndex === 1) {
      return (
        <div key={key} style={style}>
          <TimelineRow item={item} isHighlighted={isSelected} />
        </div>
      );
    }
  };

  render() {
    var { data, selectedId } = this.state;
    return (
      <div>
        <Grid
          className="ap-grid"
          cellRenderer={p => this.cellRenderer({ ...p, selectedId })}
          columnCount={2}
          columnWidth={this.getColumnWidth}
          height={700}
          rowCount={data.length}
          rowHeight={36}
          width={TREE_WIDTH + TIMELINE_WIDTH + 20}
        />
        <p>Now nodes: {data.length}</p>
      </div>
    );
  }
}

export default VirtualGrid;
