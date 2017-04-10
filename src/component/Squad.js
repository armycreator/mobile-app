import React from 'react';
import { Text } from 'react-native';
import { Squad as SquadEntity } from '../entity';

type ArmyProps = {
  squad: SquadEntity,
};

function Squad({ squad }) {
  return (
    <Text style={{ color: 'white' }}>
      {squad.name}
    </Text>
  );
}

export default Squad;
