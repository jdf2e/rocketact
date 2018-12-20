import React from "react";
import ReactDOM from "react-dom";

import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";

import { Layout, Menu, Breadcrumb, Icon } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

import * as API from "./api";

import SiderMenu from "./components/SiderMenu";

import Pages from "./routes/pages";
import Dependencies from "./routes/dependencies";

interface IProject {
  name: string;
  description?: string;
}

interface IAppState {
  project?: IProject;
}

class App extends React.PureComponent<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    API.getProject().then(data => this.setState({ project: data }));
  }

  render() {
    const { project } = this.state;

    return (
      <Router>
        <Layout>
          <Header
            className="header"
            style={{
              overflow: "auto",
              top: 0,
              position: "fixed",
              left: 0,
              right: 0
            }}
          >
            <h1 style={{ color: "#FFF", display: "inline", marginRight: 20 }}>
              {project ? project.name : ""}
            </h1>
            <p style={{ color: "#FFF", display: "inline" }}>
              {project ? project.description : ""}
            </p>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: "64px" }}
            />
          </Header>
          <Layout>
            <Sider
              style={{
                overflow: "auto",
                top: "64px",
                position: "fixed",
                left: 0,
                bottom: 0
              }}
              theme="light"
            >
              <SiderMenu />
            </Sider>
            <Layout
              style={{
                position: "fixed",
                left: 200,
                top: 64,
                right: 0,
                bottom: 0
              }}
            >
              <Content
                style={{
                  background: "#fff",
                  margin: "24px 16px 0",
                  overflowY: "auto",
                  padding: 20
                }}
              >
                <Redirect from="/" to="/pages" />
                <Route path="/pages" component={Pages} />
                <Route path="/dependencies" component={Dependencies} />
              </Content>
              <Footer style={{ textAlign: "center" }}>
                Powered by Rocketact with ❤️
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
