import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';

export default function App() {
    // State 1: To handle the text typed into the input field
    const [enteredGoalText, setEnteredGoalText] = useState('');

    // State 2: To handle the array of goals in the list
    const [courseGoals, setCourseGoals] = useState([]);

    // Function 1: Logic to add a new goal to the list
    const addGoalHandler = () => {
        if (enteredGoalText.trim().length === 0) {
            Alert.alert("Empty Goal", "Please type something before adding.");
            return;
        }

        setCourseGoals((currentGoals) => [
            ...currentGoals,
            { text: enteredGoalText, id: Math.random().toString() },
        ]);

        setEnteredGoalText(''); // Reset input field
    };

    // Function 2: Logic to delete a goal with a confirmation popup
    const deleteGoalHandler = (goalId) => {
        Alert.alert(
            "Delete Goal",
            "Are you sure you want to remove this task?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        setCourseGoals((currentGoals) => {
                            return currentGoals.filter((goal) => goal.id !== goalId);
                        });
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <Text style={styles.title}>My Daily Tasks</Text>

            {/* Input Section */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter your goal..."
                    onChangeText={(text) => setEnteredGoalText(text)}
                    value={enteredGoalText}
                />
                <View style={styles.buttonContainer}>
                    <Button title="ADD" onPress={addGoalHandler} color="#5e0acc" />
                </View>
            </View>

            {/* List Section using FlatList */}
            <FlatList
                data={courseGoals}
                renderItem={(itemData) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => deleteGoalHandler(itemData.item.id)}
                    >
                        <View style={styles.goalItem}>
                            <Text style={styles.goalText}>{itemData.item.text}</Text>
                            <Text style={styles.deleteIcon}>🗑️</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                alwaysBounceVertical={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 25,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        width: '70%',
        padding: 12,
        borderRadius: 10,
    },
    buttonContainer: {
        width: '25%',
    },
    goalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#5e0acc',
        borderRadius: 12,
        // Shadow for Android
        elevation: 4,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    goalText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    deleteIcon: {
        fontSize: 18,
    }
});