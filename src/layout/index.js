import React from "react";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./index.css";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Home from "../page/Home";
import Lozad from "../components/Lozad";

const { Header, Sider, Content } = Layout;

const menus = [
  {
    to: "/",
    icon: <UserOutlined />,
    name: "Home",
  },
  {
    to: "/about",
    icon: <VideoCameraOutlined />,
    name: "about",
  },
  {
    to: "/about2",
    icon: <UploadOutlined />,
    name: "about2",
  },
  {
    to: "/about3",
    icon: <UserOutlined />,
    name: "about3",
  },
];

export default class LayoutSiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <>
        <Router>
          <Layout className="layout">
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
              <div className="logo">Logo</div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
                {menus.map((item, index) => {
                  return (
                    <Menu.Item key={index} icon={item.icon}>
                      <Link to={item.to}>{item.name}</Link>
                    </Menu.Item>
                  );
                })}
              </Menu>
            </Sider>

            <Layout className="siteLayout">
              <Header className="site-layout-background" style={{ padding: 0 }}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: "trigger",
                  onClick: this.toggle,
                })}
              </Header>

              <Switch>
                <>
                  <Content className="siteLayoutContent">
                    <Route exact path="/">
                      <Home />
                    </Route>
                    <Route path="/about">
                      <About />
                    </Route>
                    <Route path="/about2">
                      <About />
                    </Route>
                    <Route path="/lozad">
                      <Lozad />
                    </Route>
                  </Content>
                </>
              </Switch>
            </Layout>
          </Layout>
        </Router>
      </>
    );
  }
}

function About(params) {
  return <div>about</div>;
}
