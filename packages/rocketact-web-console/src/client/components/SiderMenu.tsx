import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";

const SiderMenu = withRouter(props => {
  const { location } = props;
  return (
    <Menu mode="inline" selectedKeys={[location.pathname]}>
      <Menu.Item key="/pages">
        <Link to="/pages">
          <Icon type="home" />
          <span className="nav-text">Pages</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/dependencies">
        <Link to="/dependencies">
          <Icon type="share-alt" />
          <span className="nav-text">Dependencies</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/api-proxy">
        <Link to="/api-proxy">
          <Icon type="swap" />
          <span className="nav-text">API Proxy</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
});

export default SiderMenu;
