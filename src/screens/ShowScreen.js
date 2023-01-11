import React, {useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';



const ShowScreen = ({navigation}) => {
 
    const id = navigation.getParam('id');
    const { state } = useContext(Context);

    const getBlog = state.find(
        blog => blog.id === id
    );

    return (
        <View style={{flex:1, backgroundColor: 'white', padding: 15}}>
            <Text style={styles.title}>{getBlog.title}</Text>
            <Text style={styles.content}>{getBlog.content}</Text>
        </View>
    );
}

ShowScreen.navigationOptions = ({navigation}) => {

    const id = navigation.getParam('id');

    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Edit', {id})}>
                <Feather style={{marginRight: 10}} name="edit" size={24} color="black" />
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 50,
        borderColor: 'black',
        borderBottomWidth: 1
    },
    content: {
        fontSize: 16
    }
});


export default ShowScreen;