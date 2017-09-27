import React from "react";
import { View } from "react-native";
import { Button, Icon, Text } from "native-base";

const Nav = ({ left, leftPress, center, right, rightPress }) => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
      <Button style={styles.btn} onPress={leftPress}>
        <Icon name="arrow-back" />
        <Text>{left}</Text>
      </Button>

      <Button style={styles.btn} onPress={rightPress}>
        <Text>{right}</Text>
        <Icon name="arrow-forward" />
      </Button>
    </View>

    <View style={styles.textContainer}>
      <Text style={styles.center}>{center}</Text>
    </View>
  </View>
);

const styles = {
  container: {
    flex: 1
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  center: {
    marginTop: 15,
    fontSize: 20,
    fontFamily: "Roboto_medium",
    color: "black"
  },
  btn: {
    borderRadius: 20,
    backgroundColor: "#004284"
  }
};

export default Nav;
