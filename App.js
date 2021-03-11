import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Picker, FlatList } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';
import iconNames from './assets/icon-names.json';
import styles from './assets/styles';

export default function RenderIcons() {
  const [selected, setSelected] = useState('Web Application Icons');
  const [listSource, setListSource] = useState([]);
  const categories = Object.keys(iconNames);

  function updateListSource(selected) {
    setListSource(iconNames[selected]);
    setSelected(selected);
  }

  function iconsItem(value) {
    //  console.log(value.item.value)
    return (
      <View style={styles.item}>
        <Icon name={value.item.value} style={styles.itemIcon} />
        <Text style={styles.itemText}>
          {value.item.key} {value.item.value}
        </Text>
      </View>
    );
  }

  useEffect(() => {
    updateListSource(selected);
  }, [listSource, selected]);

  // console.log({ selected });

  return (
    <View style={styles.container}>
      <View style={styles.picker}>
        <Picker selectedValue={selected} onValueChange={updateListSource}>
          {categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
      </View>
      <FlatList
        style={styles.icons}
        data={listSource.map((value, key) => ({ key: key.toString(), value }))}
        // data={listSource}
        renderItem={(item) => iconsItem(item)}
      />
    </View>
  );
}
