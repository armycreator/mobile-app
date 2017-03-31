import React from 'react';
import { AndroidBackButton, Router, Route } from 'react-router-native';
import { ConnectedRouter } from 'react-router-redux';
import Layout from './component/Layout';
import ArmyList from './component/ArmyList';
import Login from './component/login';

const routes = [
  {
    path: '/armies/',
    exact: true,
    main: () => <ArmyList />
  },
  {
    path: '/login',
    exact: true,
    main: () => <Login />
  },
];

export default function Routes({ history }) {
  return (<ConnectedRouter history={history}>
    <AndroidBackButton>
      <Layout>
        {routes.map((route, index) =>
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        )}
      </Layout>
    </AndroidBackButton>
  </ConnectedRouter>);
}
