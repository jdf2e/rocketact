import React from "react";
import { observer } from "mobx-react";
import dependencyStore, { IDependencyStore } from "../stores/dependencies";

import globalLoadingStore from "../stores/globalLoading";

import * as API from "../api";

import {
  Input,
  Pagination,
  List,
  Avatar,
  Button,
  Tooltip,
  Icon,
  Divider,
  Popover,
  Popconfirm,
  message
} from "antd";
import TimeAgo from "react-timeago";
import gravatar from "gravatar";

import SearchService, { ISearchParams } from "../services/SearchService";
import Item from "antd/lib/list/Item";

import "./PackageInstaller.scss";

const npmLogo = () => (
  <svg version="1.1" x="0px" y="0px" viewBox="0 0 780 250" fill="#1890ff">
    <path
      className="st0"
      d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z
	 M0,200h100V50h50v150h50V0H0V200z"
    />
  </svg>
);

export interface IPackage {
  name: string;
  description: string;
  version: string;
  date: string;
  links: {
    npm: string;
    repository?: string;
    homepage?: string;
  };
  publisher: {
    username: string;
    email: string;
  };
}

interface IPackageInstallerProps {
  refreshOnClose: () => boolean;
  store: IDependencyStore;
}

interface IPackageInstallerState {
  currentPage: number;
  keyword: string;
  packages: IPackage[];
  totalCount: number;
  installed: string[];
}

@observer
class PackageInstaller extends React.Component<
  IPackageInstallerProps,
  IPackageInstallerState
> {
  searchService: SearchService;
  searchResultContainer?: HTMLDivElement | null;
  needResetPagination: boolean;

  constructor(props: IPackageInstallerProps) {
    super(props);

    this.state = {
      currentPage: 1,
      keyword: "",
      packages: [],
      totalCount: 0,
      installed: props.store.all.map(p => p.id)
    };

    this.searchService = new SearchService();
    this.needResetPagination = false;

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);

    this.install = this.install.bind(this);
  }

  componentDidMount() {
    this.searchService.getResults().subscribe(response => {
      this.setState({
        totalCount: response.total,
        packages: response.objects.map(o => o.package),
        currentPage: this.needResetPagination ? 1 : this.state.currentPage
      });

      this.needResetPagination = false;

      if (this.searchResultContainer) {
        this.searchResultContainer.scrollTo(0, 0);
      }
    });
  }

  install(name: string, isDev: boolean) {
    globalLoadingStore.show(`Installing ${name}...`);
    API.install(name, {
      isDev
    })
      .then(
        () => {
          this.setState({
            installed: [...this.state.installed, name]
          });
          this.props.refreshOnClose();
          message.success(`${name} was installed successfully!`);
        },
        () => {
          message.error(`Failed to install ${name}!`);
        }
      )
      .finally(() => {
        globalLoadingStore.hide();
      });
  }

  handleUserInput(e: React.ChangeEvent<HTMLInputElement>) {
    const keyword = e.target.value;

    this.setState({ keyword });
    this.needResetPagination = true;
    this.searchService.search({
      keyword,
      page: 1
    });
  }

  handlePageChange(page: number) {
    this.setState({ currentPage: page });
    this.searchService.search({
      keyword: this.state.keyword,
      page
    });
  }

  render() {
    const { installed } = this.state;

    return (
      <div>
        <Input
          value={this.state.keyword}
          placeholder="type to search"
          size="large"
          onChange={this.handleUserInput}
        />
        <div
          ref={node => {
            this.searchResultContainer = node;
          }}
          style={{ height: 400, overflow: "auto", margin: 10 }}
        >
          <List
            itemLayout="horizontal"
            dataSource={this.state.packages}
            renderItem={(item: IPackage) => (
              <List.Item
                key={item.name}
                actions={[
                  installed.includes(item.name) ? (
                    <Button icon="check" disabled>
                      Installed
                    </Button>
                  ) : (
                    // <Popover
                    //   placement="topRight"
                    //   title="Do you want install it as?"
                    //   content={
                    //     <React.Fragment>
                    // <Button
                    //   type="primary"
                    //   onClick={() => this.install(item.name, false)}
                    // >
                    //   Main dependency
                    // </Button>
                    //       <span style={{ marginLeft: 10, marginRight: 10 }}>
                    //         or
                    //       </span>
                    // <Button onClick={() => this.install(item.name, true)}>
                    //   Dev dependency
                    // </Button>
                    //     </React.Fragment>
                    //   }
                    //   trigger="click"
                    // >
                    <Popconfirm
                      placement="topRight"
                      title="Do you want install it as?"
                      okText="Main dependency"
                      cancelText="Dev dependency"
                      onConfirm={() => this.install(item.name, false)}
                      onCancel={() => this.install(item.name, true)}
                    >
                      <Button type="primary" icon="download">
                        Install
                      </Button>
                    </Popconfirm>
                    // </Popover>
                  )
                ]}
              >
                <List.Item.Meta
                  title={
                    <div>
                      <h4
                        className="ant-list-item-meta-title"
                        style={{ display: "inline" }}
                      >
                        {item.name}
                      </h4>
                      <Tooltip placement="top" title="View homepage">
                        <a
                          href={item.links.homepage}
                          target="_blank"
                          style={{ marginLeft: 15 }}
                        >
                          <Icon type="home" />
                        </a>
                      </Tooltip>
                      <Tooltip placement="top" title="View repository">
                        <a
                          href={item.links.repository}
                          target="_blank"
                          style={{ marginLeft: 10 }}
                        >
                          <Icon type="github" />
                        </a>
                      </Tooltip>
                      <Tooltip placement="top" title="View on npm">
                        <a
                          href={item.links.npm}
                          target="_blank"
                          style={{ marginLeft: 10 }}
                        >
                          <Icon
                            style={{
                              width: 30,
                              height: 10,
                              verticalAlign: "middle"
                            }}
                            component={npmLogo}
                          />
                        </a>
                      </Tooltip>
                      <p style={{ display: "inline", float: "right" }}>
                        <Avatar
                          size="small"
                          src={gravatar.url(item.publisher.email)}
                        />
                        {"  "}
                        <a
                          href={`https://www.npmjs.com/~${
                            item.publisher.username
                          }`}
                          target="_blank"
                        >
                          {item.publisher.username}
                        </a>
                        <span className="ant-list-item-meta-description">
                          {" "}
                          published {item.version}
                          {" · "}
                          <TimeAgo date={new Date(item.date)} />
                        </span>
                      </p>
                    </div>
                  }
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
        <Pagination
          style={{ textAlign: "center" }}
          current={this.state.currentPage}
          hideOnSinglePage
          pageSize={10}
          total={this.state.totalCount}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default (props: { refreshOnClose: () => boolean }) => (
  <PackageInstaller store={dependencyStore} {...props} />
);
