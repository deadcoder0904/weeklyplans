import React from "react";
import { Content, List, ListItem } from "native-base";
import { AdMobBanner } from "expo";

import Individual from "./Individual";
import { bannerID } from "../utils/index";

const renderLists = ({
  list,
  start,
  navigation,
  toggleLoading,
  add,
  edit,
  deletePlan
}) =>
  list.map((individual, i) => (
    <ListItem key={i}>
      <Individual
        date={individual.date}
        start={start}
        plans={individual.plans}
        navigation={navigation}
        toggleLoading={toggleLoading}
        deletePlan={deletePlan}
        add={add}
        edit={edit}
        i={i}
      />
    </ListItem>
  ));

const Lists = props => (
  <Content style={styles.content}>
    <List style={styles.list}>{renderLists(props)}</List>
    <AdMobBanner
      bannerSize="fullBanner"
      adUnitID={bannerID}
      testDeviceID="EMULATOR"
      didFailToReceiveAdWithError={this.bannerError}
    />
  </Content>
);

const styles = {
  content: {},
  list: {}
};

export default Lists;
