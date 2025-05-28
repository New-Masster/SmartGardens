import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Home Screen</Text>
      <Button title="Go to Login" onPress={() => {}} />
    </View>
  );
};

export default HomeScreen;