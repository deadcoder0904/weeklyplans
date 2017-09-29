import React, { Component } from "react";
import { StatusBar, View, TouchableHighlight, Text } from "react-native";
import Expo, { AdMobInterstitial, AdMobRewarded } from "expo";
import { Spinner } from "native-base";
import { Grid, Row } from "react-native-easy-grid";
import { StackNavigator } from "react-navigation";
import moment from "moment";
import "moment-immutable";

import {
  createTable,
  givePlansOnGivenDate,
  addPlan,
  editPlan,
  deletePlan
} from "./src/components/DB";
import AddPlan from "./src/components/AddPlan";
import Individual from "./src/components/Individual";
import Nav from "./src/components/Nav";
import Lists from "./src/components/Lists";
import { INTERSTITIAL_ID, REWARDED_ID } from "./src/utils/index";

AdMobInterstitial.setAdUnitID(INTERSTITIAL_ID);
AdMobInterstitial.setTestDeviceID("EMULATOR");
AdMobRewarded.setAdUnitID(REWARDED_ID);

class App extends Component {
  static navigationOptions = { title: "Welcome", header: null };

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      loading: true,
      title: {},
      week: {},
      list: []
    };
  }

  async componentWillMount() {
    await Expo.Font
      .loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      })
      .then(_ => {
        this.setState({ fontLoaded: true });
      });
  }

  componentDidMount() {
    createTable();
    let now;
    if (this.props.navigation.state.params) {
      now = this.props.navigation.state.params.start;
    } else {
      now = moment().isoWeekday("Monday");
    }
    this.generateDate(now);
    this.setLists(now);
  }

  setLists = now => {
    const dates = [];
    const list = [];
    for (let i = 0; i < 7; i++) {
      const date = now.add(i, "days").format("DD/MM/YYYY");
      dates.push(date);
    }
    givePlansOnGivenDate(dates, temp => {
      const allPlans = temp.length ? temp._array : [];
      for (let i = 0; i < 7; i++) {
        const plans = allPlans.filter(plan => plan.date === dates[i]);
        list.push({ date: dates[i], plans });
      }
      this.setState({ list, loading: false });
    });
  };

  add = (date, text) => {
    addPlan(date, text);
  };

  edit = (id, name) => {
    editPlan(id, name);
  };

  delete = id => {
    const list = this.state.list;
    for (let i = 0; i < list.length; i++) {
      if (list[i].plans.length) {
        list[i].plans = list[i].plans.filter(plan => plan.id !== id);
      }
    }
    this.setState({ list });
    deletePlan(id);
  };

  generateTitle = (start, end) => ({ start, end });
  generateTitleDesc = ({ start, end }) =>
    `${start.format("DD")} - ${end.format("DD")} ${end.format("MMM")}`;

  generateDate = now => {
    this.setState({ loading: true });
    const week = {
      prev: this.generateTitle(
        now.subtract(7, "days"),
        now.subtract(1, "days")
      ),
      current: this.generateTitle(now, now.add(6, "days")),
      next: this.generateTitle(now.add(7, "days"), now.add(13, "days"))
    };
    const [prevTitle, currentTitle, nextTitle] = [
      this.generateTitleDesc(week.prev),
      this.generateTitleDesc(week.current),
      this.generateTitleDesc(week.next)
    ];
    const title = { prevTitle, currentTitle, nextTitle };
    this.setState({ week, title });
  };

  leftPress = () => {
    const now = this.state.week.prev.start;
    this.generateDate(now);
    this.setLists(now);
  };

  rightPress = () => {
    const now = this.state.week.next.start;
    this.generateDate(now);
    this.setLists(now);
  };

  toggleLoading = () => this.setState({ loading: !this.state.loading });

  render() {
    if (!this.state.fontLoaded) {
      return null;
    }
    if (this.state.loading) {
      return (
        <View style={styles.spin}>
          <StatusBar hidden />
          <Spinner color="steelblue" />
        </View>
      );
    }
    return (
      <Grid style={styles.grid}>
        <StatusBar hidden />
        <Row style={styles.nav}>
          <Nav
            left={this.state.title.prevTitle}
            leftPress={this.leftPress}
            center={this.state.title.currentTitle}
            right={this.state.title.nextTitle}
            rightPress={this.rightPress}
          />
        </Row>
        <Row style={styles.body}>
          <Lists
            list={this.state.list}
            start={this.state.week.current.start}
            navigation={this.props.navigation}
            toggleLoading={this.toggleLoading}
            deletePlan={this.delete}
            add={this.add}
            edit={this.edit}
          />
        </Row>
      </Grid>
    );
  }
}

const BasicApp = StackNavigator(
  {
    App: { screen: App },
    Individual: { screen: Individual },
    AddPlan: { screen: AddPlan }
  },
  {
    headerMode: "screen"
  }
);

const styles = {
  spin: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  nav: {
    marginTop: 25,
    height: 80
  },
  body: {
    margin: 10,
    marginLeft: 0,
    padding: 0,
    flex: 1
  }
};

export default BasicApp;
