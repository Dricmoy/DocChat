import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Stack } from "expo-router";

export default function TabLayout() {
  const CustomHeader = ({ title }) => {
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
          headerTitle: (props) => <CustomHeader {...props} title="DocuChat" />,
        }}
      />
      <Stack.Screen
        name="chat"
        options={{
          headerTitle: (props) => <CustomHeader {...props} title="ChatScreen" />,
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
