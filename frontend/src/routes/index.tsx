import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from 'pages/SignIn';
import Dashboard from 'pages/Dashboard';
import User from 'pages/User';
import Category from 'pages/Category';
import Tag from 'pages/Tag';
import Company from 'pages/Company';
import Product from 'pages/Product';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/users" component={User} isPrivate />
    <Route path="/categories" component={Category} isPrivate />
    <Route path="/tags" component={Tag} isPrivate />
    <Route path="/company" component={Company} isPrivate />
    <Route path="/products" component={Product} isPrivate />
  </Switch>
);

export default Routes;
