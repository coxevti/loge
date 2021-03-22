import React from 'react';

import {
  Home,
  PieChart,
  ShoppingBag,
  Tag,
  Tool,
  Users,
  Settings,
  Package,
  List,
  User,
} from 'react-feather';
import { NavLink } from 'react-router-dom';
import { Container, Content } from './styles';

const Sidebar: React.FC = () => (
  <Container>
    <Content>
      <nav>
        <NavLink exact to="/dashboard">
          <Home />
          Dashboard
        </NavLink>
        <NavLink exact to="/users">
          <User />
          Usuario
        </NavLink>
        <NavLink exact to="/company">
          <Package />
          Empresa
        </NavLink>
        <NavLink exact to="/clients">
          <Users />
          Cliente
        </NavLink>
        <NavLink exact to="/products">
          <ShoppingBag />
          Produto
        </NavLink>
        <NavLink exact to="/categories">
          <List />
          Categoria
        </NavLink>
        <NavLink exact to="/services">
          <Tool />
          Serviço
        </NavLink>
        <NavLink exact to="/budgets">
          <PieChart />
          Orçamento
        </NavLink>
        <NavLink exact to="/tags">
          <Tag />
          Tag
        </NavLink>
        <NavLink exact to="/settings">
          <Settings />
          Configurações
        </NavLink>
      </nav>
    </Content>
  </Container>
);

export default Sidebar;
