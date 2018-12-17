import React from 'react';
import { Grid } from 'react-virtualized';

class VirtualGrid extends React.Component {
  constructor(props) {
    super(props);

    this.backupData = [...props.data];

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
    return this.backupData.findIndex(i => {
      return i[0].id === id;
    });
  };

  getColumnWidth = ({ index }) => {
    if (index === 0) {
      return 350;
    } else if (index === 1) {
      return 930;
    }
  };

  expandRow = (e, rowIndex) => {
    e.stopPropagation();
    var { data } = this.state;
    var id = data[rowIndex][0].id;
    var backupRowIndex = this.findById(id);
    var startIndex = backupRowIndex + 1;
    var stopIndex = -1;
    var i = startIndex;
    var endNotFound = true;

    if (
      this.backupData[startIndex][0].depth ===
      this.backupData[backupRowIndex][0].depth
    ) {
      data[rowIndex][0].expanded = true;
      return;
    }

    while (endNotFound) {
      i++;

      if (i === this.backupData.length) {
        stopIndex = i;
        endNotFound = false;
      } else if (
        this.backupData[i][0].depth <= this.backupData[backupRowIndex][0].depth
      ) {
        stopIndex = i;
        endNotFound = false;
      }
    }
    data[rowIndex][0].expanded = true;
    data.splice(
      rowIndex + 1,
      0,
      ...this.backupData.slice(startIndex, stopIndex)
    );
    this.setState({
      data: data
    });
  };

  collapseRow = (e, rowIndex) => {
    e.stopPropagation();
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

  cellRenderer = ({ key, rowIndex, columnIndex, style, selectedId }) => {
    var { data } = this.state;
    var item = data[rowIndex][columnIndex];

    if (columnIndex === 0) {
      return (
        <div
          className={`ap-grid-cell ${
            item.id === selectedId ? 'ap-grid-cell--selected' : ''
          }`}
          key={key}
          style={style}
          onClick={_ => this.handleClick(item.id)}
        >
          <div>
            <span
              dangerouslySetInnerHTML={{
                __html: this.levelRenderer(item.depth)
              }}
            />
            <span
              onClick={e => {
                // eslint-disable-next-line no-lone-blocks
                {
                  if (item.expanded) {
                    this.collapseRow(e, rowIndex);
                  } else {
                    this.expandRow(e, rowIndex);
                  }
                }
              }}
            >
              {item.expanded === undefined ? (
                ''
              ) : item.expanded ? (
                <b>&#9207;</b>
              ) : (
                <b>&#9205;</b>
              )}
            </span>
            {`${item.depth}-${item.name}`}
          </div>
        </div>
      );
    } else if (columnIndex === 1) {
      return (
        <div
          className={`ap-grid-cell ${
            data[rowIndex][0].id === selectedId ? 'ap-grid-cell--selected' : ''
          }`}
          key={key}
          style={style}
        >
          <div
            style={{
              left: '10px',
              display: 'inline-block',
              position: 'relative',
              width: `${item.width}%`,
              left: `${item.left}%`,
              border: '3px black solid'
            }}
          />
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
          width={1300}
        />
        <p>Now nodes: {data.length}</p>
      </div>
    );
  }
}

export default VirtualGrid;
