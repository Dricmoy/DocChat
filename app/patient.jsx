import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PatientScreen = () => {
    const [patientName, setPatientName] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [lastVisit, setLastVisit] = useState('');
    const navigation = useNavigation();

    const handleStartChat = () => {
        // Add validation or save the information as needed
        navigation.navigate('chat')
    };

    return (
        <View style={styles.container}>
            <Text style={styles.disclaimer}>
                Disclaimer: Make sure the information here is accurate to save yourself time afterwards.
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Patient Name here"
                value={patientName}
                onChangeText={setPatientName}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Patient Age here"
                value={patientAge}
                onChangeText={setPatientAge}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Is this your second visit?"
                value={lastVisit}
                onChangeText={setLastVisit}
            />
            <Button
                title="Start Chat"
                onPress={handleStartChat}
                color="#96b87f"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    disclaimer: {
        marginBottom: 20,
        color: '#666666',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
});

export default PatientScreen;
