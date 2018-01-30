import React from 'react';
import { findNodeHandle, StyleSheet, View, Text, ScrollView, Dimensions, TouchableHighlight, Animated, Easing } from 'react-native';

import PropTypes from 'prop-types';

export class AnimatedTab extends React.Component {
  _mainView = null;
  _headerPostions = new Map();
  _headerRefs = new Map();
  _scrollRef = null;
  _scrollViewPostion = null;

  _contentRefs = new Map();
  _contentPositions = new Map();

  moveAnimValue;
  foldAnimValue;

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.initialTabIndex,
      tabAnimation: [this.props.initialTabIndex, this.props.initialTabIndex]
    }

    this.moveAnimValue = new Animated.Value(0);
    this.foldAnimValue = new Animated.Value(0);
  }

  render() {
    var horizontal = this.props.direction == HORIZONTAL

    var flexDirection = {
      flexDirection: horizontal ? "row" : "column"
    }
    
    return (
      // Main Container 
      <View ref={(ref) => {this._mainView = ref}} style={[styles.mainStyle, this.props.mainStyle]}>
        <ScrollView
          ref={(ref) => {this._scrollRef = ref}}
          onLayout={(event) => this._onScrollViewLayout(event)}
          contentContainerStyle={[styles.tabViewStyle, flexDirection, this.props.tabViewStyle, {
            minWidth: WIDTH,
            backgroundColor: this.props.tabBackgroundColor
          }]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal={horizontal}>
            {this.props.tabs.map((tab, index) => this._renderHeader(tab, index))}
            {/* Tab Indicator */}
            {this._renderTabIndicator()}
        </ScrollView>

        {this._renderContent()}
      </View>
    );
  }

  _renderTabIndicator() {
    if (this.props.showTabIndicator) {
      console.log("_renderTabIndicator", this.isTabRenderFinished(), this._scrollRef != null, this.state.selectedIndex != null);
      if (this.isTabRenderFinished() == false) return;

      if (this._scrollRef != null && this.state.selectedIndex != null) {
        var preHeader = this._headerRefs.get(this.state.tabAnimation[0]);
        var postHeader = this._headerRefs.get(this.state.tabAnimation[1]);

        var preHeaderPosition = this._headerPostions.get(this.state.tabAnimation[0]);
        var postHeaderPosition = this._headerPostions.get(this.state.tabAnimation[1]);
        
        if (preHeader != null && postHeader != null) {

          var tabLeft = this.moveAnimValue.interpolate({
            inputRange: [0, 1],
            outputRange: [preHeaderPosition.x, postHeaderPosition.x]
          })

          var tabWidth = this.moveAnimValue.interpolate({
            inputRange: [0, 1],
            outputRange: [preHeaderPosition.width, postHeaderPosition.width]
          })

          return [
            <Animated.View key={"base-indicator"}
              style={{
                position: "absolute",
                bottom: 0,
                height: 1,
                width: "100%",
                backgroundColor: this.props.tabInidicatorBaseColor}}></Animated.View>,
            <Animated.View key={"active-indicator"}
              style={{
                position:"absolute",
                bottom: 0,
                left: tabLeft,
                height: 3,
                width: tabWidth,
                backgroundColor: this.props.tabInidicatorColor}}></Animated.View>
          ];
        }
      }
    }
  }

  _renderHeader(tab, index) {
    var isSelected = this.state.selectedIndex == index;
    var color = isSelected ? this.props.selectedColor : this.props.unselectedColor;

    return (
      <TouchableHighlight
        ref={(ref) => this._onHeaderRef(index, ref)}
        onLayout={(event) => this._onHeaderLayout(index, event)}
        onPress={() => this.onTabSelect(index)}
        activeOpacity={0.3}
        underlayColor={"#EEEEEE"}
        key={tab.title} style={[styles.tabStyle]}>
        <Text numberOfLines={1} style={[{fontSize: 15, fontWeight: "bold", color: color}]}>{tab.title}</Text>
      </TouchableHighlight>
    );
  }

  _renderContent() {
    var preIndex = this.state.tabAnimation[0];
    var prePosition = this._contentPositions.get(preIndex);

    var postIndex = this.state.tabAnimation[1];
    var postPosition = this._contentPositions.get(postIndex);

    var tabMoveToRight = preIndex < postIndex;

    var preContentLeft = this.moveAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: tabMoveToRight ? [-preIndex * WIDTH, -(preIndex + 1) * WIDTH] : [-preIndex * WIDTH, -(preIndex - 1) * WIDTH]
    })

    var postContentLeft = this.moveAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: tabMoveToRight ? [-(postIndex - 1) * WIDTH, -(postIndex) * WIDTH] : [-(postIndex + 1) * WIDTH, -(postIndex) * WIDTH]
    })

    if (preIndex == postIndex) {
      preContentLeft = -preIndex * WIDTH;
      postContentLeft = -preIndex * WIDTH;
    }

    var contentHeight = null;

    if (prePosition != null && postPosition != null) {
      contentHeight = this.foldAnimValue.interpolate({
        inputRange: [0, 1],
        outputRange: [prePosition.height, postPosition.height]
      }) 
    }

    return (
          <Animated.View style={[styles.contentViewStyle, this.props.contentViewStyle, {width: WIDTH, height: contentHeight}]}>
            {this.props.tabs.map((tab, index) => {
              var left;
              if (index == preIndex) {
                left = preContentLeft
              } else if (index == postIndex) {
                left = postContentLeft
              } else {
                left = WIDTH;
              }

              return (
                <Animated.View
                  key={`content-${tab.title}`}
                  style={{
                    top: 0,
                    left: left,
                    height: contentHeight,
                    overflow: "hidden",
                    backgroundColor: this.props.contentBackground,
                  }}>
                  <View
                    ref={(ref) => {this._onContentRef(index, ref)}}
                    onLayout={(event) => {this._onContentLayout(index, event)}}
                    style={[{
                      width: WIDTH,
                      overflow: "hidden",
                    }]}>
                      {tab.content}
                  </View>
                </Animated.View>)
            })}
          </Animated.View>
    )
  }

  _onHeaderRef(index, ref) {
    this._headerRefs.set(index, ref);
  }

  _onContentRef(index, ref) {
    this._contentRefs.set(index, ref);
  }

  _onHeaderLayout(index, event) {
    this._headerPostions.set(index, {
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
      x: event.nativeEvent.layout.x,
      y: event.nativeEvent.layout.y
    });

    this.onTabSelect(this.props.initialTabIndex);
  }

  _onScrollViewLayout(event) {
    this._scrollViewPostion = {
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
      x: event.nativeEvent.layout.x,
      y: event.nativeEvent.layout.y
    };

    this.onTabSelect(this.props.initialTabIndex);
  }

  _onContentLayout(index, event) {
    this._contentPositions.set(index, {
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
      x: event.nativeEvent.layout.x,
      y: event.nativeEvent.layout.y
    });
  }

  isTabRenderFinished() {
    var scrollViewRendered = this._scrollViewPostion != null;
    var headerRendered = this._headerPostions.size == this.props.tabs.length;

    return scrollViewRendered && headerRendered;
  }

  async onTabSelect(index) {
    if (this.isTabRenderFinished() == false) return;

    if (this._scrollRef != null && index != null) {
      if (index < 0 || index >= this.props.tabs.length) {
        this.onTabSelect(0);
        console.warn("trying to selected out bounded tab index");
        return;
      }

      var header = this._headerRefs.get(index);
      var headerPosition = this._headerPostions.get(index);
      
      if (header != null) {
        let offset = this.calcSelectedOffset(this.props.selectedAlign, this.props.selectedOffset, headerPosition, this._scrollViewPostion)
        headerPosition.x + headerPosition.width / 2 - this._scrollViewPostion.width / 2;

        await this.stopAnim(this.moveAnimValue);
        await this.stopAnim(this.foldAnimValue);

        this.moveAnimValue.setValue(0);
        this.foldAnimValue.setValue(0);

        await this.aysncSetState({
          tabAnimation: [this.state.selectedIndex, index],
          selectedIndex: index,
        })

        this._scrollRef.scrollTo({x: offset, y: headerPosition.y, animated: true})

        await this.startAnim(this.moveAnimValue, {
          toValue: 1,
          duration: this.props.tabAnimDuration,
          easing: this.props.tabAnimEasing,
        });

        let tab = this.props.tabs[index];
        setTimeout(() => {
          if (tab.onPress) tab.onPress();
        }, 10);

        await this.startAnim(this.foldAnimValue, {
          toValue: 1,
          duration: this.props.foldAnimDuration,
          easing: this.props.foldAnimEasing,
        });

        this.setState({
          tabAnimation: [index, index]
        })
      }
    }
  }
  
  calcSelectedOffset(align, offset, tabPosition, scrollViewPosition) {
    switch(align) {
      case LEFT:
        return tabPosition.x - offset;
      case CENTER:
        return tabPosition.x + tabPosition.width / 2 - scrollViewPosition.width / 2;
      case RIGHT:
        return tabPosition.x - scrollViewPosition.width  + tabPosition.width + offset;
    }
  }

  async aysncSetState(state) {
    return new Promise((resolve, reject) => {
      this.setState(state, () => {resolve()})
    })
  }

  async stopAnim(value) {
    return new Promise((resolve, reject) => {
      Animated.timing(value).stop(resolve());
    });
  }

  async startAnim(value, config) {
    return new Promise((resolve, reject) => {
      Animated.timing(value, config).start(() => {resolve()});
    })
  }
}

const styles = StyleSheet.create({
  mainStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabViewStyle: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contentViewStyle: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  tabStyle: {
    padding: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

const LEFT = "left";
const CENTER = "center";
const RIGHT = "right";

const WIDTH = Dimensions.get("screen").width;

AnimatedTab.defaultProps = {
  direction: HORIZONTAL,
  selectedColor: "#444444",
  unselectedColor: "#AAAAAA",
  tabBackgroundColor: "#FFFFFF",
  contentBackground: "#FFFFFF",

  showTabIndicator: true,
  tabInidicatorBaseColor: "#BBBBBB",
  tabInidicatorColor: "#444444",

  initialTabIndex: 0,
  selectedAlign: CENTER,
  selectedOffset: 0,
  tabAnimDuration: 400,
  tabAnimEasing: Easing.linear,
  foldAnimDuration: 400,
  foldAnimEasing: Easing.linear,
};

AnimatedTab.propTypes = {
  // mainStyle: View.propTypes.style,
  // tabViewStyle: View.propTypes.style,
  // contentViewStyle: View.propTypes.style,

  direction: PropTypes.oneOf([HORIZONTAL, VERTICAL]), // TODO

  selectedColor: PropTypes.string,
  unselectedColor: PropTypes.string,
  tabBackgroundColor: PropTypes.string,
  
  showTabIndicator: PropTypes.bool,
  tabInidicatorBaseColor: PropTypes.string,
  tabInidicatorColor: PropTypes.string,

  initialTabIndex: PropTypes.number,
  selectedAlign: PropTypes.oneOf([LEFT, CENTER, RIGHT]),
  selectedOffset: PropTypes.number,

  tabAnimDuration: PropTypes.number,
  tabAnimEasing: PropTypes.func,

  foldAnimDuration: PropTypes.number,
  foldAnimEasing: PropTypes.func,
};