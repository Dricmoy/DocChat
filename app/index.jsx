// HomeScreen.tsx
import React from 'react';
import { TouchableOpacity, View, Text, Button, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Welcome to ChatApp</Text>
            <Text style={styles.subtitle}>Your platform for easy medical consultations.</Text>
            <Button
                title="Chat with Doctor"
                onPress={() => navigation.navigate('chat')}
                color="#057AFF" // Adjust button color as needed
            ></Button>
            <Text style={styles.infoText}>Need help? Call 1-800-CHATAPP</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    infoText: {
        marginTop: 30,
        fontSize: 12,
        color: '#666666',
        textAlign: 'center',
    },
});

export default HomeScreen;
