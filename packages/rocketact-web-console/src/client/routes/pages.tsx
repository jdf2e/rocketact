import React from "react";

import * as API from "../api";

import { Table } from "antd";

interface IPage {
  name: string;
  title: string;
}

interface IPagesState {
  pages: IPage[];
}

class Pages extends React.PureComponent<{}, IPagesState> {
  constructor(props: any) {
    super(props);

    this.state = {
      pages: []
    };
  }

  componentDidMount() {
    API.getPages().then(data => this.setState({ pages: data }));
  }

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "Action",
        key: "action",
        render: (text: any, record: IPage) => (
          <span>
            <a href={`/${record.name}.html`} target="_blank">
              Open in new tab
            </a>
          </span>
        )
      }
    ];

    return (
      <React.Fragment>
        <h2>Your application currently contains following pages:</h2>
        <Table
          columns={columns}
          dataSource={this.state.pages}
          pagination={false}
        />
      </React.Fragment>
    );
  }
}

export default Pages;
