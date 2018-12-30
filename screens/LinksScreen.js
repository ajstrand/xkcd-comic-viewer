import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'All Comics',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      titles: [{key:"2", title:"foo"}]
    }
  }

  componentDidMount() {
    for (let i = 1; i < 10; i++) {
      this.getSpecificComic(i);
    }
  }


  getSpecificComic(number) {
    let url = `https://xkcd.com/${number}/info.0.json`
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let titlesCopy = this.state.titles.slice();
        let o = { title: responseJson.title, key: number.toString() }
        titlesCopy.push(o);
        this.setState({ titles: titlesCopy });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createList() {
    let r;
    this.state.titles.length > 0 ? r = <FlatList
      data={this.state.titles}
      renderItem={({ item }) => <Text key={item.key}>{item.title}</Text> } /> : r = <Text>Placeholder</Text>
    console.log(r)
    return r;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
      {this.createList()}
        {/* <ComicScreen data={this.state.data}/> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
