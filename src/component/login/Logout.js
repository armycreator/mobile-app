import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../action/login';

type Props = {
  logout: Function,
};

class Logout extends PureComponent {
  props: Props;

  componentDidMount() {
    this.props.logout();
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
