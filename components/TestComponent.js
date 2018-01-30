import React from 'react';
import { Text, View } from 'react-native';

export default class TestComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(`Render TestComponent: ${this.props.text}`);
    return (
      <View style={{width: "100%", height: 30 + Math.random() * 200, backgroundColor: getRandomColor(), alignItems: "center", justifyContent: "center"}}>
        <Text>{this.props.text}</Text>
      </View>
    )
  }
}

function getRandomColor() {
  return `rgba(${100 + Math.floor(Math.random() * 155)}, ${100 + Math.floor(Math.random() * 255)}, ${100 + Math.floor(Math.random() * 255)}, 0.3)`
}