// @ts-nocheck
import React from "react";

import { Table, Switch } from "antd";
import { DragDropContext, DragSource, DropTarget } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import { IProxyRule } from "../routes/apiProxy";

import { Icon, Popconfirm, Tag } from "antd";

let dragingIndex = -1;

class BodyRow extends React.Component {
  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      moveRow,
      ...restProps
    } = this.props;
    const style = { ...restProps.style, cursor: "move" };

    let className = restProps.className;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += " drop-over-downward";
      }
      if (restProps.index < dragingIndex) {
        className += " drop-over-upward";
      }
    }

    return connectDragSource(
      connectDropTarget(
        <tr {...restProps} className={className} style={style} />
      )
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index
    };
  }
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

const DragableBodyRow = DropTarget("row", rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(
  DragSource("row", rowSource, connect => ({
    connectDragSource: connect.dragSource()
  }))(BodyRow)
);

interface IProxyRulesTableProps {
  rules: Array<IProxyRule>;
  delete: (ruleId: string) => void;
  modify: (ruleId: string) => void;
  toggleState: (ruleId: string) => void;
  move: (fromIndex: number, toIndex: number) => void;
}

class ProxyRulesTable extends React.Component<IProxyRulesTableProps, {}> {
  moveRow = (dragIndex: number, hoverIndex: number) => {
    this.props.move(dragIndex, hoverIndex);
  };

  render() {
    const columns = [
      {
        title: "Match",
        dataIndex: "match",
        key: "match"
      },
      {
        title: "Action",
        key: "action",
        render: (text: any, record: IProxyRule) => {
          const color =
            { FORWARD: "green", JSON: "orange" }[record.action] || "";
          return <Tag color={color}>{record.action}</Tag>;
        }
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description"
      },
      {
        title: "Opeartion",
        key: "opeartion",
        align: "center" as "center",
        render: (text: any, record: IProxyRule) => (
          <div style={{ minWidth: 140 }}>
            <a
              href="javascript:void(0)"
              onClick={() => this.props.modify(record.ruleId)}
              style={{ marginRight: 10 }}
            >
              <Icon type="setting" />
            </a>
            <Popconfirm
              placement="topRight"
              title="Are you sure?"
              onConfirm={() => {
                this.props.delete(record.ruleId);
              }}
              okText="Yes"
              cancelText="No"
            >
              <a href="javascript:void(0)" style={{ color: "#F5222D" }}>
                <Icon type="delete" />
              </a>
            </Popconfirm>
          </div>
        )
      },
      {
        title: "Enabled",
        key: "enabled",
        render: (ext: any, record: IProxyRule) => (
          <Switch
            onClick={() => this.props.toggleState(record.ruleId)}
            checked={record.enabled}
          />
        )
      }
    ];

    return (
      <Table
        columns={columns}
        dataSource={this.props.rules}
        components={{
          body: {
            row: DragableBodyRow
          }
        }}
        onRow={(record, index) => ({
          index,
          moveRow: this.moveRow
        })}
        pagination={false}
      />
    );
  }
}

export default DragDropContext(HTML5Backend)(ProxyRulesTable);
