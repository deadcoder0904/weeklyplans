import React, { Component } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ListItem, CheckBox } from "native-base";
import { toggleCompleted } from "./DB";

class Checkbox extends Component {
  componentWillMount = () => {
    this.setState({ completed: this.props.completed });
  };

  delete = () => this.props.deletePlan(this.props.id);

  edit = () => {
    const { name, navigate, id, edit, toggleLoading, start } = this.props;
    navigate("AddPlan", { name, navigate, id, edit, toggleLoading, start });
  };

  toggleCheckbox = () => {
    toggleCompleted(this.props.id, this.state.completed ? 0 : 1);
    this.setState({ completed: !this.state.completed });
  };

  render() {
    const { completed } = this.state;
    const checked = completed ? true : false;
    return (
      <ListItem>
        <CheckBox
          color="#123456"
          checked={checked}
          onPress={this.toggleCheckbox}
        />
        <TouchableOpacity onPress={this.toggleCheckbox}>
          <Text style={[styles.text, completed && styles.checked]}>
            {this.props.name}
          </Text>
        </TouchableOpacity>

        <View style={styles.corner}>
          <TouchableOpacity onPress={this.edit}>
            <Ionicons name="md-create" size={32} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.delete}>
            <Ionicons name="md-close" size={32} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </ListItem>
    );
  }
}

const styles = {
  corner: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  icon: {
    paddingLeft: 5,
    paddingRight: 5
  },
  text: {
    paddingLeft: 2,
    marginLeft: 40,
    fontFamily: "Roboto_medium",
    width: 150
  },
  checked: {
    textDecorationLine: "line-through",
    color: "#999"
  }
};

export default Checkbox;
