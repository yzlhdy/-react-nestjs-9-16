import React from 'react';
import { Layout } from 'antd';
import { Redirect, Route, Switch } from 'react-router-dom'

import { Container, ContentMain } from './styles';
import Header from '../../components/Layout/Header'
import LeftNav from '../../components/Layout/LeftNav'

import Home from '../Home'
import Product from '../Product'
import Category from '../Category'
import User from '../User'


const { Content, Footer, Sider } = Layout;



const Admin: React.FC = () => {

  const token = localStorage.getItem('token')
  if (!token) {
    return (
      <Redirect to="/login"></Redirect>
    )
  } else {
    return (
      <Container>
        <Layout style={{ height: '100vh' }}>
          <Sider>
            <LeftNav />
          </Sider>
          <Layout>
            <Header></Header>
            <ContentMain>
              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                }}
              >
                <Switch>
                  <Redirect from='/' exact to="/home" />
                  <Route path="/home" component={Home}></Route>
                  <Route path="/product" component={Product} />
                  <Route path="/category" component={Category} />
                  <Route path="/user" component={User} />
                </Switch>
              </Content>
            </ContentMain>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </Container>
    );
  }

};

export default Admin;