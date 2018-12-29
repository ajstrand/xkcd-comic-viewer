import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class ComicScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text>{this.props.data.title}</Text>
            <Image source={{uri:this.props.data.comicImg}} style={styles.comicImage}/>
            <Text>{this.props.data.altText}</Text>
          </View>
        </ScrollView>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  comicImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  }
});
