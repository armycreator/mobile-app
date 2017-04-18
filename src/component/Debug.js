// @fl
import React, { PureComponent } from 'react';
import { Animated, ScrollView, Switch, Text, View } from 'react-native';

class Debug extends PureComponent {
  props: SquadProps;

  constructor(props: SquadProps) {
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(0),
      toValue: 100,
    };
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: this.state.toValue,
    }).start();
  }

  render() {
    const { id } = this.props;
    return (
      <Animated.View
        style={{
          opacity: this.state.fadeAnim,
          backgroundColor: 'red',
          width: this.state.fadeAnim,
        }}
      >
        <Text style={{ color: 'white' }}>io {id}</Text>
      </Animated.View>
    );
  }
}

export default Debug;
