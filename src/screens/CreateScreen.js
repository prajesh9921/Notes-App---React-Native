import React, {useState, useContext} from 'react';
import { View, StyleSheet, Text ,TextInput, TouchableOpacity} from 'react-native';
import BlogPostForm from '../component/BlogPostForm';
import { Context } from '../context/BlogContext';

const CreateScreen = ({navigation}) => {

    // const [title, setTitle] = useState("title");
    // const [content , setContent] = useState("content");
    const { addBlogPost } = useContext(Context);
    return (
        <View>  
            <BlogPostForm
                onSubmit= {(title, content) => {
                    addBlogPost(title, content, () => navigation.navigate('Index'))
                }}
                btnTitle = "Add Post" 
            />
            {/* <Text style={styles.text}>Enter title</Text>
            <TextInput 
                style={styles.textInput}
                value={title}
                onChangeText = {(text) => setTitle(text)}
            />
            <Text style={styles.text}>Enter Content</Text>
            <TextInput 
                style={styles.textInput}
                value={content}
                onChangeText = {text => setContent(text)}
            />

            <TouchableOpacity onPress={() => addBlogPost(title, content, () => navigation.navigate('Index'))}>
                <View style={styles.btn}>
                    <Text style={styles.btnTitle}>Add Post</Text>
                </View>
            </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 18,
        padding: 5,
        margin: 10, 
        opacity: 0.8
    },
    text: {
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10,
        fontWeight: 'bold'
    },
    btn: {
        backgroundColor: '#000000',
        paddingHorizontal: 50,
        paddingVertical: 10,
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10
    },
    btnTitle: {
        color: '#FFFFFF',
    },
});


export default CreateScreen;