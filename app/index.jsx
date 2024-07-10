// HomeScreen.tsx
import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Welcome to Unnamed</Text>
            <Text style={styles.subtitle}>Your platform for easy medical consultations.</Text>
            <Button
                title="Get started"
                onPress={() => navigation.navigate('patient')}
                color="#96b87f" 
            />
            <Text style={styles.infotext}>  
                Hospital sign-in            
                <Link 
                    to="/signIn" 
                    style={styles.link}>
                    here
                </Link>
            </Text>

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
    infotext: {
        fontSize: 11,
        textAlign: 'center',
        marginTop: 20,
    },
    link: {
        marginTop: 30,
        marginLeft: 2,
        fontSize: 12,
        color: '#057AFF',
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
});

export default HomeScreen;
