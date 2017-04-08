// @flow
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-native';
import styled from 'styled-components/native';
import NavigationBar from 'react-native-navbar';
import colors from '../colors';
import Button from './Button';
import { User } from '../entity';

const MenuContainer = styled.View`
  flex: 1;
  background-color: ${colors.lightBackground};
  border-right-width: 1;
  border-right-color: ${colors.black};
`;

type Props = { user: ?User, onLogout: Function, onArmyList: Function };

function Menu({ user, onLogout, onArmyList }: Props) {
  return (
    <MenuContainer>
      <NavigationBar
        title={{ title: 'Menu', tintColor: colors.white }}
        tintColor={colors.secondary}
      />

      {user &&
        <View>
          <Link to="/armies">
            <TouchableOpacity
              onPress={onArmyList}
              style={{ padding: 15, borderBottomWidth: 1 }}
            >
              <Text style={{ color: colors.white }}>Mes listes</Text>
            </TouchableOpacity>
          </Link>

          <View style={{ paddingHorizontal: 10 }}>
            <Button color="danger" onPress={onLogout}>
              <Text style={{ color: colors.white, textAlign: 'center' }}>
                Déconnexion
              </Text>
            </Button>
          </View>
        </View>}
    </MenuContainer>
  );
}

const mapStateToProps = state => ({
  user: state.app.get('me'),
});
const mapDispatchToProps = {
  onLogout: () => dispatch => dispatch(push('/login')),
  onArmyList: () => dispatch => dispatch(push('/armies')),
};
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
