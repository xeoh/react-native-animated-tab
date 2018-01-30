import React from 'react';
import { StyleSheet, Text, View, Button, Image, Easing, TouchableHighlight, TextInput, ScrollView } from 'react-native';

import { AnimatedTab } from './components/AnimatedTab';
import TestComponent from './components/TestComponent';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAlign: "center",
      selectedOffset: 40,
      tabAnimEasing: Easing.bezier(0.23, 1, 0.32, 1),
      tabAnimEasingName: "easeOutCubic",
      tabAnimDuration: 400,
      foldAnimEasing: Easing.bezier(0.23, 1, 0.32, 1),
      foldAnimEasingName: "easeOutCubic",
      foldAnimDuration: 400,
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <AnimatedTab
          mainStyle={{
            width: "100%",
            top: 0,
            left: 0,
          }}
          direction={"horizontal"}
          tabs={tabs.slice(0,3)}
          initialTabIndex={3}
          selectedAlign={this.state.selectedAlign}
          selectedOffset={this.state.selectedOffset}
          showTabIndicator={true}
          tabAnimDuration={this.state.tabAnimDuration == null ? 400 : this.state.tabAnimDuration}
          tabAnimEasing={this.state.tabAnimEasing}
          foldAnimDuration={this.state.foldAnimDuration == null ? 400 : this.state.foldAnimDuration}
          foldAnimEasing={this.state.foldAnimEasing}
          tabInidicatorBaseColor={"#444444"}
          tabInidicatorColor={"#FF8888"}
          selectedColor={"#FF8888"}
          unselectedColor={"#AAAAAA"}
          tabBackgroundColor={"#EEEEEE"}
        />
        
        {/* Control Panel */}
        <View style={{width: "100%", height: 1, backgroundColor: "#444444"}}></View>
        <View style={{width: "100%", height: 30}}></View>
        {/* Align Selection */}
        <View style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Text style={{flex: 1, marginLeft: 10, fontSize: 15, fontWeight: "bold"}}>SelectAlign:</Text>
          <View style={{flex: 0, marginRight: 10, flexDirection: "row"}}>
            <Button
              onPress={() => {this.setState({selectedAlign: "left"})}}
              title="Left"
              color={this.state.selectedAlign == "left" ? "#F74A1D" : "#AAAAAA"}
            />
            <Button
              onPress={() => {this.setState({selectedAlign: "center"})}}
              title="center"
              color={this.state.selectedAlign == "center" ? "#F74A1D" : "#AAAAAA"}
            />
            <Button
              onPress={() => {this.setState({selectedAlign: "right"})}}
              title="right"
              color={this.state.selectedAlign == "right" ? "#F74A1D" : "#AAAAAA"}
            />
          </View>
        </View>

        {/* Tab Easing Selection */}
        <View style={{width: "100%", height: 10}}></View>
        <View style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Text style={{flex: 1, marginLeft: 10, fontSize: 15, fontWeight: "bold"}}>TabEasing:</Text>
          <View style={{flex: 0, marginRight: 10, flexDirection: "row"}}>
            <TouchableHighlight style={{padding: 5, backgroundColor: this.state.tabAnimEasingName == "easeInOutCubic" ? "#F74A1D" : "#AAAAAA", alignItems: "center"}}
              onPress={() => {
                this.setState({
                  tabAnimEasing: Easing.bezier(0.645, 0.045, 0.355, 1),
                  tabAnimEasingName: "easeInOutCubic",
                })
              }}>
              <Image
                source={require('./images/easeInOutCubic.png')}
                style={{width: 60, height: 50}}
                resizeMode={"contain"}
              />
            </TouchableHighlight>
            <TouchableHighlight style={{padding: 5, backgroundColor: this.state.tabAnimEasingName == "easeOutCubic" ? "#F74A1D" : "#AAAAAA", alignItems: "center"}}
              onPress={() => {
                this.setState({
                  tabAnimEasing: Easing.bezier(0.23, 1, 0.32, 1),
                  tabAnimEasingName: "easeOutCubic",
                })
              }}>
              <Image
                source={require('./images/easeOutCubic.png')}
                style={{width: 60, height: 50}}
                resizeMode={"contain"}
              />
            </TouchableHighlight>
            <TouchableHighlight style={{padding: 5, backgroundColor: this.state.tabAnimEasingName == "easeOutBack" ? "#F74A1D" : "#AAAAAA", alignItems: "center"}}
              onPress={() => {
                this.setState({
                  tabAnimEasing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
                  tabAnimEasingName: "easeOutBack",
                })
              }}>
              <Image
                source={require('./images/easeOutBack.png')}
                style={{width: 60, height: 50}}
                resizeMode={"contain"}
              />
            </TouchableHighlight>
          </View>
        </View>

        {/* Tab Easing Duration */}
        <View style={{width: "100%", height: 10}}></View>
        <View style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Text style={{flex: 1, marginLeft: 10, fontSize: 15, fontWeight: "bold"}}>TabAnimDuration:</Text>
          <TextInput style={{width: 100, fontSize: 15, fontWeight: "bold"}}
            keyboardType={"numeric"}
            onChangeText={(text) => {
              var duration = Number.parseInt(text);
              this.setState({
                tabAnimDuration: Number.isNaN(duration) ? null : duration
              })
            }}
            value={this.state.tabAnimDuration == null ? "" : this.state.tabAnimDuration.toString()}/>
          <Text style={{fontSize: 12, marginRight: 15, fontWeight: "bold"}}>ms</Text>
        </View>
        
        {/* Fold Easing Selection */}
        <View style={{width: "100%", height: 10}}></View>
        <View style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Text style={{flex: 1, marginLeft: 10, fontSize: 15, fontWeight: "bold"}}>FoldEasing:</Text>
          <View style={{flex: 0, marginRight: 10, flexDirection: "row"}}>
            <TouchableHighlight style={{padding: 5, backgroundColor: this.state.foldAnimEasingName == "easeInOutCubic" ? "#F74A1D" : "#AAAAAA", alignItems: "center"}}
              onPress={() => {
                this.setState({
                  foldAnimEasing: Easing.bezier(0.645, 0.045, 0.355, 1),
                  foldAnimEasingName: "easeInOutCubic",
                })
              }}>
              <Image
                source={require('./images/easeInOutCubic.png')}
                style={{width: 60, height: 50}}
                resizeMode={"contain"}
              />
            </TouchableHighlight>
            <TouchableHighlight style={{padding: 5, backgroundColor: this.state.foldAnimEasingName == "easeOutCubic" ? "#F74A1D" : "#AAAAAA", alignItems: "center"}}
              onPress={() => {
                this.setState({
                  foldAnimEasing: Easing.bezier(0.23, 1, 0.32, 1),
                  foldAnimEasingName: "easeOutCubic",
                })
              }}>
              <Image
                source={require('./images/easeOutCubic.png')}
                style={{width: 60, height: 50}}
                resizeMode={"contain"}
              />
            </TouchableHighlight>
            <TouchableHighlight style={{padding: 5, backgroundColor: this.state.foldAnimEasingName == "easeOutBack" ? "#F74A1D" : "#AAAAAA", alignItems: "center"}}
              onPress={() => {
                this.setState({
                  foldAnimEasing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
                  foldAnimEasingName: "easeOutBack",
                })
              }}>
              <Image
                source={require('./images/easeOutBack.png')}
                style={{width: 60, height: 50}}
                resizeMode={"contain"}
              />
            </TouchableHighlight>
          </View>
        </View>

        {/* Fold Easing Duration */}
        <View style={{width: "100%", height: 10}}></View>
        <View style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Text style={{flex: 1, marginLeft: 10, fontSize: 15, fontWeight: "bold"}}>FoldAnimDuration:</Text>
          <TextInput style={{width: 100, fontSize: 15, fontWeight: "bold"}}
            keyboardType={"numeric"}
            onChangeText={(text) => {
              var duration = Number.parseInt(text);
              this.setState({
                foldAnimDuration: Number.isNaN(duration) ? null : duration
              })
            }}
            value={this.state.foldAnimDuration == null ? "" : this.state.foldAnimDuration.toString()}/>
          <Text style={{fontSize: 12, marginRight: 15, fontWeight: "bold"}}>ms</Text>
        </View>

      </ScrollView>
    );
  }
}

function getRandomColor() {
  return `rgba(${100 + Math.floor(Math.random() * 155)}, ${100 + Math.floor(Math.random() * 255)}, ${100 + Math.floor(Math.random() * 255)}, 0.3)`
}

const tabs = [
  {
    title: "Tab1",
    content: <TestComponent text={"Tab1"}/>,
    // onPress: () => { alert("Tab1") }
  },
  {
    title: "Tab2(with larger space)",
    content: <TestComponent text={"Tab2(with larger space)"}/>,
  },
  {
    title: "T3",
    content: <TestComponent text={"T3"}/>,
  },
  {
    title: "T4",
    content: <TestComponent text={"T4"}/>,
  },
  {
    title: "Tab5-LARGER",
    content: <TestComponent text={"Tab5-LARGER"}/>,
  },
  {
    title: "Tab6_LARGER",
    content: <TestComponent text={"Tab6_LARGER"}/>,
  },
  {
    title: "Tab7",
    content: <TestComponent text={"Tab7"}/>,
  },
  {
    title: "Tab8",
    content: <TestComponent text={"Tab8"}/>,
  },
  {
    title: "Tab9",
    content: <TestComponent text={"Tab9"}/>,
  },
  {
    title: "Tab10",
    content: <TestComponent text={"Tab10"}/>,
  },
  {
    title: "Tab11",
    content: <TestComponent text={"Tab11"}/>,
  },
  {
    title: "Tab12",
    content: <TestComponent text={"Tab12"}/>,
  },
  {
    title: "Tab13",
    content: <TestComponent text={"Tab13"}/>,
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
