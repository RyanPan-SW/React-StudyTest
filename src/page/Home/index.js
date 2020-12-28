import { Card, Divider, Space } from "antd";
import React from "react";
import "./index.css";
import Example from "../../components/Example";
import Skeleton from "../../components/Skeleton";
import { Link } from "react-router-dom";
import Lozad from "../../components/Lozad";

const cardList = [
  { title: "长列表", cursor: "default", to: false, component: <Example /> },
  { title: "骨架屏", cursor: "pointer", to: false, component: <Skeleton /> },
  { title: "图片懒加载(手写)", cursor: "pointer", to: "/lozad", component: <Lozad /> },
];

function Home(props) {
  return (
    <div>
      <h2>示例：</h2>
      <Divider />

      <div className="contentCard">
        <Space size="middle" wrap={true}>
          {cardList.map((item, index) => {
            return (
              <Card
                title={item.title}
                key={index}
                className="card"
                style={{ cursor: `${item.cursor}`, overflow: "auto" }}
              >
                {item.to ? <Link to={item.to}>{item.component}</Link> : <div>{item.component}</div>}
              </Card>
            );
          })}
        </Space>
      </div>
    </div>
  );
}

export default Home;
