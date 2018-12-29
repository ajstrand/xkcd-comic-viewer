import React from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
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



  render() {
    if(this.state.data !== null){
      return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
              <ComicScreen data={this.state.data}/>
            </View>
            <TextInput 
                   style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => {this.setNum(text)}}
        value={this.state.text}/>
            <Button title="get comic" onPress={() => {this.getSpecificComic(this.state.inputNum)}}></Button>
          </ScrollView>
        </View>
      );
    }
    else {
      return (<View><Text>Loading</Text></View>)
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
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
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
