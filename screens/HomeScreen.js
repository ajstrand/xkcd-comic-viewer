import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView
} from 'react-native';
import ComicScreen from './ComicScreen'
import { MonoText } from '../components/StyledText';
import { TextInput } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor (props) {
    super(props);
    this.state = {
      data:null,
      inputNum:null
    }
  }

  componentDidMount() {
    let url = 'https://xkcd.com/info.0.json'
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({data:{comicImg:responseJson.img, 
        title:responseJson.title,
      altText:responseJson.alt}});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  getSpecificComic (number) {
    if(this.isNumber(number)) {
      let url = `https://xkcd.com/${number}/info.0.json`
      return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({data:null}, () => {
          this.setState({data:{comicImg:responseJson.img, 
            title:responseJson.title,
          altText:responseJson.alt}});
        })
        })
        
      .catch((error) => {
        console.error(error);
      });
  }
  }

 setNum(text) {
    if(this.isNumber(text)) {
     this.setState({inputNum:text})
  }
}

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  renderButton() {
    let result;
    const ComicButton = <Button title="get comic" onPress={() => {this.getSpecificComic(this.state.inputNum)}}></Button> ;
    const message = <Text>Please enter a number to get a specific comic.</Text>;
    this.state.inputNum !== null ? result = ComicButton
      : result = message
      return result; 
  }

  getView() {
    let view;
    if(this.state.data !== null){
      view =  <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.welcomeContainer}>
        <ComicScreen data={this.state.data}/>
      </View>
      <Text>Enter a number to get a specfic comic</Text>
      <TextInput 
             style={{height: 40, borderColor: 'gray', borderWidth: 1}}
      onChangeText={(text) => {this.setNum(text)}}
  value={this.state.text}/>
   {this.renderButton()}
    </ScrollView>
    }
    else {
      view = <Text>Loading</Text>;
    }
    return view;
  }



  render() {
      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          {this.getView()}
        </View>
        </KeyboardAvoidingView>
      );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  comicImage: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
    marginTop: 1,
    marginLeft: -10,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  }
});
