/**
 * Sample React Native App
 *
 * adapted from App.js generated by the following command:
 *
 * react-native init example
 *
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { LocalizationProvider } from './LocalizationContext.js';
import translations, {DEFAULT_LANGUAGE} from './translations';
import Crowdin from 'react-native-crowdin';

export default class App extends Component<{}> {
  state = {};

  updateLocalization() {
    Crowdin.initWithHashString('e11b2ae7041851c9f39ea77uo3a', DEFAULT_LANGUAGE, (message) => {});

    Crowdin.getResourcesByLocale('uk', (data) => {
        var response = JSON.parse(data);

        translations.setContent(
            Object.assign({}, translations.getContent(), {
                uk: response.strings
            })
        );

        this.resetState();
    })
  }

  resetState = () => {
    this.setState({});
  }

  render() {
    return (
      <LocalizationProvider>
        <View style={styles.container}>
          <Text style={styles.heading}>{translations.app_title}</Text>
          <Text style={styles.description}>{translations.app_description}</Text>
          <View style={styles.tile}>
            <Image source={require('./assets/book.png')} />
            <Text>{translations.book_name}</Text>
            <Text>{translations.book_description}</Text>
          </View>
          <Text style={styles.categories}>{translations.categories}</Text>
          <View style={styles.categoriesContainer}>
            <Text style={styles.category}>{translations.category_novel}</Text>
            <Text style={styles.category}>{translations.category_adventures}</Text>
            <Text style={styles.category}>{translations.category_science}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              type="solid"
              color="#263238"
              onPress={() => {
                this.updateLocalization();
              }}
              title={"Download Crowdin translations"}
            />
          </View>
        </View>
      </LocalizationProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#eceff1',
    padding: 20
  },
  categoriesContainer: {
    flexDirection:'row',
    flexWrap:'wrap'
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10
  },
  description: {
    fontSize: 20,
  },
  tile: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#6fcf97',
    borderRadius: 35,
    marginTop: 20,
    marginBottom: 30,
    shadowColor: "#2e3340",
    backgroundColor: "#6fcf97",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.81,
    shadowRadius: 13.16,
    elevation: 40,
  },
  categories: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  category: {
    borderRadius: 5,
    backgroundColor: '#fffccc',
    padding: 5,
    margin: 5
  },
  buttonContainer: {
    margin: 20,
  },
});
