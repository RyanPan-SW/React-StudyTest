import { Card, Divider, Space } from "antd";
import React from "react";
import "./index.css";
import Example from "../../components/Example";
import Skeleton from "../../components/Skeleton";

const cardList = [
  { title: "长列表", cursor: "default", component: <Example /> },
  { title: "骨架屏", cursor: "pointer", component: <Skeleton /> },
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
              <Card title={item.title} className="card" style={{ cursor: `${item.cursor}` }}>
                {item.component}
              </Card>
            );
          })}
        </Space>
      </div>
    </div>
  );
}

export default Home;
