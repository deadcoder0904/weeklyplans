import React, { Component } from "react";
import { Keyboard, Text, ToastAndroid } from "react-native";
import { Item, Input, Button, Form, Container } from "native-base";
import { AdMobInterstitial, AdMobRewarded, AdMobBanner } from "expo";

import { bannerID } from "../utils/index";

class AddPlan extends Component {
  static navigationOptions = { title: "Welcome", header: null };

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      edit: false
    };
  }

  componentWillMount = () => {
    const { name: text } = this.props.navigation.state.params;
    if (text) {
      this.setState({ text, edit: true });
    }
  };

  textChange = t => {
    const text = t.toUpperCase();
    this.setState({ text });
  };

  saveText = () => {
    const text = this.state.text.trim();
    if (text === "") {
      ToastAndroid.showWithGravity(
        "Enter some text !!!",
        1000,
        ToastAndroid.CENTER
      );
      return;
    }
    const { date, add, edit, id } = this.props.navigation.state.params;
    if (this.state.edit) {
      edit(id, text);
    } else {
      add(date, text);
    }
    this.props.navigation.state.params.toggleLoading();
    this.goBack();
  };

  goBack = () => {
    Keyboard.dismiss();
    this.textChange("");
    AdMobInterstitial.requestAd(AdMobInterstitial.showAd);
    AdMobRewarded.requestAd(AdMobRewarded.showAd);
    const navigate = this.state.edit
      ? this.props.navigation.state.params.navigate
      : this.props.navigation.navigate;
    const start = this.props.navigation.state.params.start;
    navigate("App", { start });
  };

  render() {
    return (
      <Container>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={bannerID}
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError}
        />
        <Form style={styles.container}>
          <Item regular style={styles.input}>
            <Input
              placeholder="Add Plan"
              autoFocus={true}
              autoCapitalize="characters"
              value={this.state.text}
              onChangeText={this.textChange}
              onSubmitEditing={this.saveText}
            />
          </Item>
          <Button block primary onPress={this.saveText} style={styles.save}>
            <Text style={styles.saveText}>Save</Text>
          </Button>
          <Button block danger onPress={this.goBack} style={styles.cancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Button>
        </Form>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={bannerID}
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError}
        />
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    margin: 20,
    marginTop: 100
  },
  input: {
    margin: 5,
    backgroundColor: "white"
  },
  save: {
    margin: 5,
    backgroundColor: "#004284"
  },
  cancel: {
    margin: 5,
    backgroundColor: "white"
  },
  saveText: {
    fontFamily: "Roboto_medium",
    color: "white"
  },
  cancelText: {
    fontFamily: "Roboto_medium",
    color: "steelblue"
  }
};

export default AddPlan;
