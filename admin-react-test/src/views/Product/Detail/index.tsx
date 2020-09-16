import React from 'react';
import {
  Card,
  List,
  Button
} from 'antd'
import { useHistory } from 'react-router-dom'

import { ArrowLeftOutlined } from '@ant-design/icons'
const Detail: React.FC = () => {
  const history = useHistory()
  const title = (
    <Button icon={<ArrowLeftOutlined />} onClick={() => history.go(-1)} > 商品详情</Button >
  )
  return (
    <Card title={title}>

    </Card>
  );
}

export default Detail;
