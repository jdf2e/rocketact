import React from "react";

import { IDependency } from "../../server/dependenciesAPI";

import * as API from "../api";

import { Table, Tag, Icon, Tooltip, Tabs, Button, Modal } from "antd";

import Loading from "../components/Loading";
import PackageInstaller from "../components/PackageInstaller";

const { TabPane } = Tabs;

interface IDependenciesRouteState {
  mainDependencies: IDependency[];
  loadingMain: boolean;
  devDependencies: IDependency[];
  loadingDev: boolean;
  displayInstallModal: boolean;
}

class Dependencies extends React.PureComponent<{}, IDependenciesRouteState> {
  firstTimeViewDevDependecies: boolean;

  constructor(props: any) {
    super(props);

    this.firstTimeViewDevDependecies = true;

    this.state = {
      mainDependencies: [],
      loadingMain: true,
      devDependencies: [],
      loadingDev: true,
      displayInstallModal: false
    };
  }

  componentDidMount() {
    API.getDependencies("main").then(r =>
      this.setState({ mainDependencies: r, loadingMain: false })
    );
  }

  handleTabChange(activeKey: string) {
    if (activeKey === "2" && this.firstTimeViewDevDependecies) {
      this.firstTimeViewDevDependecies = false;

      API.getDependencies("dev").then(r =>
        this.setState({ devDependencies: r, loadingDev: false })
      );
    }
  }

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "id"
      },
      {
        title: "Range",
        key: "range",
        render: (text: any, record: IDependency) => (
          <span>
            <Tag color={"green"}>{record.range}</Tag>
          </span>
        )
      },
      {
        title: "Installed",
        key: "installed",
        render: (text: any, record: IDependency) =>
          record.installed ? (
            <span>
              <Tag color={"green"}>{record.installed}</Tag>
            </span>
          ) : null
      },
      {
        title: "Wanted",
        key: "wanted",
        render: (text: any, record: IDependency) =>
          record.wanted ? (
            <span>
              <Tag
                color={record.wanted === record.installed ? "green" : "orange"}
              >
                {record.wanted}
              </Tag>
            </span>
          ) : null
      },
      {
        title: "Latest",
        key: "latest",
        render: (text: any, record: IDependency) =>
          record.latest ? (
            <span>
              <Tag
                color={record.latest === record.installed ? "green" : "orange"}
              >
                {record.latest}
              </Tag>
            </span>
          ) : null
      },
      {
        title: "Next",
        key: "next",
        render: (text: any, record: IDependency) =>
          record.next && record.next !== record.installed ? (
            <span>
              <Tag color="cyan">{record.next}</Tag>
            </span>
          ) : null
      },
      {
        title: "Description",
        dataIndex: "description"
      },
      {
        title: "Opeartion",
        key: "opeartion",
        align: "center" as "center",
        render: (text: any, record: IDependency) =>
          record.homepage ? (
            <Tooltip placement="top" title="View homepage">
              <a href={record.homepage} target="_blank">
                <Icon type="home" />
              </a>
            </Tooltip>
          ) : null
      }
    ];

    const operations = (
      <Button
        type="primary"
        ghost
        icon="download"
        onClick={() => this.setState({ displayInstallModal: true })}
      >
        Install new dependency
      </Button>
    );

    const {
      mainDependencies,
      devDependencies,
      loadingMain,
      loadingDev
    } = this.state;

    const allDependencies = [
      ...new Set([...mainDependencies, ...devDependencies].map(d => d.id))
    ];

    return (
      <React.Fragment>
        <Tabs
          tabBarExtraContent={operations}
          onChange={(activeKey: string) => this.handleTabChange(activeKey)}
        >
          <TabPane key="1" tab="Main dependencies">
            {loadingMain ? (
              <Loading />
            ) : (
              <Table
                columns={columns}
                dataSource={this.state.mainDependencies}
                pagination={false}
              />
            )}
          </TabPane>
          <TabPane key="2" tab="Dev dependencies">
            {loadingDev ? (
              <Loading />
            ) : (
              <Table
                columns={columns}
                dataSource={this.state.devDependencies}
                pagination={false}
              />
            )}
          </TabPane>
        </Tabs>
        <Modal
          title="Install new dependency"
          visible={this.state.displayInstallModal}
          maskClosable={false}
          width={1000}
          footer={null}
          onCancel={() => this.setState({ displayInstallModal: false })}
          destroyOnClose
        >
          <PackageInstaller
            alreadyInstalled={allDependencies}
            onClose={() => this.setState({ displayInstallModal: false })}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default Dependencies;
