import React from 'react';
import { AndroidBackButton, Router, Route, Switch } from 'react-router-native';
import { ConnectedRouter } from 'react-router-redux';
import Layout from './component/Layout';
import ArmyList from './component/ArmyList';
import Army from './component/Army';
import Login from './component/login';

const routes = [
  {
    path: '/armies/:id',
    exact: true,
    main: ({ location }) => <Army army={location.state.army} />
  },
  {
    path: '/armies/',
    exact: true,
    main: () => <ArmyList />
  },
  {
    main: () => <Login />
  },
];

export default function Routes({ history }) {
  return (<ConnectedRouter history={history}>
    <AndroidBackButton>
      <Layout>
        <Switch>
          {routes.map((route, index) =>
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          )}
        </Switch>
      </Layout>
    </AndroidBackButton>
  </ConnectedRouter>);
}
