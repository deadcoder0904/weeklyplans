import React, { Component } from "react";
import { Keyboard, View } from "react-native";
import { Text, Button } from "native-base";

import Checkbox from "./Checkbox";

class Individual extends Component {
  static navigationOptions = { title: "Welcome", header: null };

  padStr = (str, pad, padLeft) => {
    if (typeof str === "undefined") {
      return pad;
    }
    if (padLeft) {
      return (pad + str).slice(-pad.length);
    }
    return (str + pad).substring(0, pad.length);
  };

  savePlan = () => {
    Keyboard.dismiss();

    const {
      date,
      navigation: { navigate },
      start,
      toggleLoading,
      add
    } = this.props;
    navigate("AddPlan", { date, toggleLoading, start, add });
  };

  renderCheckboxes = plans =>
    plans.map(plan => (
      <Checkbox
        name={plan.name}
        navigate={this.props.navigation.navigate}
        toggleLoading={this.props.toggleLoading}
        start={this.props.start}
        edit={this.props.edit}
        completed={plan.completed}
        deletePlan={this.props.deletePlan}
        id={plan.id}
        key={plan.id}
      />
    ));

  render() {
    const { date, plans, start, toggleLoading, i, add } = this.props;
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return (
      <View style={styles.container}>
        <Text style={styles.date}>
          {this.padStr(date, "            ", false)} -{" "}
          {this.padStr(days[i], "       ", false)}
        </Text>
        {this.renderCheckboxes(plans)}
        <Button style={styles.btn} block bordered onPress={this.savePlan}>
          <Text style={styles.text}>Add Plan</Text>
        </Button>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  btn: {
    backgroundColor: "#004284",
    borderColor: "#aaa",
    borderRadius: 20,
    margin: 20
  },
  text: {
    color: "white"
  },
  date: {
    color: "steelblue",
    fontSize: 18
  }
};

export default Individual;
