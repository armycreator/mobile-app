// @flow
// TODEL

import React, { Component } from 'react';
import { connect } from 'react-redux';
import RNSideMenu from 'react-native-side-menu';
import Menu from './Menu';

type SideMenuProps = {
  isMenuOpen: boolean,
  children: any,
  toggleMenu: Function,
};

class SideMenu extends Component {
  props: SideMenuProps;

  render() {
    const { children, isMenuOpen, toggleMenu } = this.props;

    return (
      <RNSideMenu menu={<Menu />} isOpen={isMenuOpen} onChange={toggleMenu}>
        {children}
      </RNSideMenu>
    );
  }
}

const mapStateToProps = state => ({
  isMenuOpen: state.app.get('isMenuOpen'),
});
const mapDispatchToProps = {
  toggleMenu: (isOpen: boolean) => ({
    type: 'TOGGLE_MENU',
    isOpen,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
