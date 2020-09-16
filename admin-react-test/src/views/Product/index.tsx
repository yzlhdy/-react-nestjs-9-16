import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Homes from './Homes'
import Detail from './Detail'
import AddUpdate from './AddUpdate'
import { Container } from './styles';

const Product: React.FC = () => {
  return (
    <Container>
      <Switch>
        <Route path='/product' exact component={Homes} />
        <Route path='/product/update' component={AddUpdate} />
        <Route path='/product/detail' component={Detail} />
      </Switch>
    </Container>
  );
}

export default Product;
