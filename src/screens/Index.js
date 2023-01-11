import React, { useContext , useEffect } from 'react';
import { Text, View, StyleSheet , FlatList, TouchableOpacity,} from 'react-native';
import {Context} from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({navigation}) => {

    const {state, deleteBlogPost, getBlogPost} = useContext(Context);

    useEffect (() => {
        getBlogPost();
        // Adding listener so that getBlogPost will be called when this screen is showing on the screen
        const listener = navigation.addListener('didFocus', () => {
            getBlogPost();
        });       
        // So we need to close the listener to stop memory leak if we decide to unmount the index screen at all.
        // Its a safety measure.
        return () => {
            listener.remove();
        };
    }, []);

    return (
        <View style={{flex: 1, backgroundColor: 'white', padding: 10}}>    
            {state.length === 0 ?
            <View style={styles.alternateView}>
                <Text style={styles.alternateText}>Hi there Welcome to Blog Post.</Text>
                <Text style={styles.alternateText}>Click on "+" button to add Blog Post.</Text>
            </View>
            :    
            <FlatList
                data={state}
                numColumns= {2}
                keyExtractor= {(state) => state.id}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity style={{flex: 1}} onPress={() => navigation.navigate('Show', {id : item.id}) }>
                            <View style={styles.viewStyle}> 
                                <Text style={styles.textStyle}>{item.title} - {item.id}</Text>
                                <View style={styles.iconView}>
                                    <TouchableOpacity style={styles.editTouchable} onPress={() => navigation.navigate('Edit', {id: item.id})}>
                                        <Feather style={styles.editIcon} name="edit" size={15} />
                                    </TouchableOpacity>
                                    <View style={{height: 5}}></View>
                                    <TouchableOpacity style={styles.delTouchable} onPress={() => deleteBlogPost(item.id)}>
                                        <Feather style={styles.delIcon} name="trash" size={15}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />}
        </View>
    );
};


IndexScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Feather name="plus" size={30} />
          </TouchableOpacity>
        ),
      };
};

const styles = StyleSheet.create({
    viewStyle: {
        padding: 10,
        backgroundColor: '#F1F6F5',
        borderRadius: 5,
        // shadowColor: 'black',
        // elevation: 3,
        flex: 1,
        flexDirection: 'column',
        margin: 5,
        minHeight: 75,
        maxHeight: 200,
    },
    textStyle: {
        fontSize: 20,
    },
    iconView: {
        flexDirection: 'column',
        position: 'absolute',
        alignSelf: 'flex-end',
        marginTop: 5,
        marginBottom: 5, 
        right: 5,
    },
    alternateText: {
        alignSelf:'center',
        fontSize: 16
    },
    editIcon: {
        color: 'white',
    },
    delIcon: {
        color: 'white'
    },
    editTouchable: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        borderRadius: 5
    },
    delTouchable: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        borderRadius: 5
    }


});

export default IndexScreen;