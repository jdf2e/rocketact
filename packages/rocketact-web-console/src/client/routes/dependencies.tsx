import React from "react";
import { observer } from "mobx-react";

import dependenciesStore, { IDependencyStore } from "../stores/dependencies";

import { IDependency } from "../../server/dependenciesAPI";

import * as API from "../api";

import { Table, Tag, Icon, Tooltip, Tabs, Button, Modal } from "antd";

import Loading from "../components/Loading";
import PackageInstaller from "../components/PackageInstaller";

const { TabPane } = Tabs;

interface IDependenciesRouteProps {
  store: IDependencyStore;
}

interface IDependenciesRouteState {
  displayInstallModal: boolean;
}

@observer
class Dependencies extends React.Component<
  IDependenciesRouteProps,
  IDependenciesRouteState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      displayInstallModal: false
    };
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

    const { main, dev, loading, all, version } = this.props.store;

    const allDependencies = [...new Set([...all].map(d => d.id))];
    return (
      <React.Fragment>
        <Tabs tabBarExtraContent={operations}>
          <TabPane key="1" tab="Main dependencies">
            {loading ? (
              <Loading />
            ) : (
              <Table columns={columns} dataSource={main} pagination={false} />
            )}
          </TabPane>
          <TabPane key="2" tab="Dev dependencies">
            {loading ? (
              <Loading />
            ) : (
              <Table columns={columns} dataSource={dev} pagination={false} />
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
            onClose={() => this.setState({ displayInstallModal: false })}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default () => <Dependencies store={dependenciesStore} />;
