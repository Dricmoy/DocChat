import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Stack } from "expo-router";

export default function TabLayout() {
  const NavBar = ({ title }) => {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/logo.png')} // replace with your logo path
          style={styles.logo}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: (props) => <NavBar {...props} title="Landing" />,
        }}
      />
      <Stack.Screen
        name="chat"
        options={{
          headerTitle: (props) => <NavBar {...props} title="ChatScreen" />,
        }}
      />
      <Stack.Screen
        name="patient"
        options={{
          headerTitle: (props) => <NavBar {...props} title="Patient" />,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
