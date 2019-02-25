import React from "react";
import { observer } from "mobx-react";

import dependenciesStore, { IDependencyStore } from "../stores/dependencies";
import globalLoadingStore from "../stores/globalLoading";

import { IDependency } from "../../server/dependenciesAPI";

import GlobalLoadingModal from "../components/GlobalLoadingModal";

import * as API from "../api";

import {
  Table,
  Tag,
  Icon,
  Tooltip,
  Tabs,
  Button,
  Modal,
  Popconfirm,
  message
} from "antd";

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
  refreshOnClosePackageInstaller: boolean;

  constructor(props: any) {
    super(props);

    this.state = {
      displayInstallModal: false
    };

    this.refreshOnClosePackageInstaller = false;
  }

  remove(name: string) {
    globalLoadingStore.show(`Removing ${name}...`);
    API.uninstall(name)
      .then(
        () => {
          message.success(`${name} was remove successfully!`);
          dependenciesStore.remove(name);
        },
        () => {
          message.error(`Failed to remove ${name}!`);
        }
      )
      .finally(() => {
        globalLoadingStore.hide();
      });
  }

  upgrade(name: string, version: string, isDev: boolean) {
    globalLoadingStore.show(`Upgrading ${name}...`);
    API.install(name, {
      isDev,
      version: `^${version}`
    })
      .then(
        () => {
          dependenciesStore.refresh();
          message.success(`${name} was upgraded successfully!`);
        },
        () => {
          message.error(`Failed to upgrade ${name}!`);
        }
      )
      .finally(() => {
        globalLoadingStore.hide();
      });
  }

  renderVersionLabel(
    name: string,
    installedVersion: string | undefined,
    targetVersion: string | undefined,
    isNext: boolean,
    isDev: boolean
  ) {
    if (targetVersion && installedVersion) {
      return targetVersion === installedVersion ? (
        isNext ? null : (
          <Tag color="green">{targetVersion}</Tag>
        )
      ) : (
        <Popconfirm
          placement="topRight"
          title="Upgrade to this version?"
          trigger="hover"
          onConfirm={() => {
            this.upgrade(name, targetVersion, isDev);
          }}
        >
          <Tag color={isNext ? "cyan" : "orange"}>{targetVersion}</Tag>
        </Popconfirm>
      );
    } else {
      return null;
    }
  }

  createColumnForType(label: "wanted" | "latest" | "next") {
    return {
      title: label[0].toUpperCase() + label.slice(1),
      key: label,
      render: (text: any, record: IDependency) =>
        this.renderVersionLabel(
          record.id,
          record.installed,
          record[label],
          false,
          record.isDev
        )
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
      this.createColumnForType("wanted"),
      this.createColumnForType("latest"),
      this.createColumnForType("next"),
      {
        title: "Description",
        dataIndex: "description"
      },
      {
        title: "Opeartion",
        key: "opeartion",
        align: "center" as "center",
        render: (text: any, record: IDependency) => (
          <div style={{ minWidth: 140 }}>
            {record.homepage ? (
              <Tooltip placement="top" title="View homepage">
                <a
                  href={record.homepage}
                  target="_blank"
                  style={{ marginRight: 10 }}
                >
                  <Icon type="home" />
                </a>
              </Tooltip>
            ) : null}
            <Popconfirm
              placement="topRight"
              title="Are you sure?"
              onConfirm={() => {
                this.remove(record.id);
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
      }
    ];

    const operations = (
      <React.Fragment>
        <Button
          type="primary"
          ghost
          icon="sync"
          onClick={() => dependenciesStore.refresh()}
          style={{ marginRight: 10 }}
        >
          Refresh
        </Button>
        <Button
          type="primary"
          ghost
          icon="download"
          onClick={() => {
            this.setState({ displayInstallModal: true });
            this.refreshOnClosePackageInstaller = false;
          }}
        >
          Install new dependency
        </Button>
      </React.Fragment>
    );

    const { main, dev, loading, version } = this.props.store;

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
          width={1000}
          footer={null}
          onCancel={() => {
            this.setState({ displayInstallModal: false });
            if (this.refreshOnClosePackageInstaller) {
              dependenciesStore.refresh();
            }
          }}
          destroyOnClose
        >
          <PackageInstaller
            refreshOnClose={() => (this.refreshOnClosePackageInstaller = true)}
          />
        </Modal>
        <GlobalLoadingModal />
      </React.Fragment>
    );
  }
}

export default () => <Dependencies store={dependenciesStore} />;
