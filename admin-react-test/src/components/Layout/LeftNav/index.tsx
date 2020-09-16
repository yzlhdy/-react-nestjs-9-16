import React from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  NotificationOutlined

} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

import { Container, Logo } from './styles';
import menuList, { RouterList } from '../../../router/menuList'
const { SubMenu } = Menu

const LeftNav: React.FC = () => {


  let opentKey: string = ""

  let location = useLocation()
  let selectKey = location.pathname
  if (selectKey.indexOf('/product') === 0) {
    selectKey = '/product'
  }
  const getMenuNodes = (menuList: RouterList[]) => {

    return menuList.reduce((pre: any, item: any) => {
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key} icon={<AppstoreOutlined />}>
            <Link to={item.key}>
              {item.title}
            </Link>
          </Menu.Item>
        )
      } else {
        const cItem = item.children.find((cItem: any) => selectKey.indexOf(cItem.key) === 0)
        if (cItem) {
          opentKey = item.key

        }
        pre.push(
          <SubMenu key={item.key} title={item.title} icon={<NotificationOutlined />} >
            {
              getMenuNodes(item.children)
            }
          </SubMenu >
        )
      }
      return pre
    }, [])
  }
  return (
    <Container>
      <Logo>
        logn
      </Logo>
      <Menu theme="light" mode="inline" selectedKeys={[selectKey]} defaultOpenKeys={[opentKey]}>
        {
          getMenuNodes(menuList)
        }
      </Menu>
    </Container >
  );
};

export default LeftNav;
