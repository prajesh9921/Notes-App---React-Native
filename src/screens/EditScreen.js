import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import BlogPostForm from '../component/BlogPostForm';
import { Context } from '../context/BlogContext';   

const EditScreen = ({navigation}) => {

    const id = navigation.getParam('id');
    const {state, editBlogPost} = useContext(Context);

    const blogPost = state.find(
        blogPost => blogPost.id === id
    );

    // const [title, setTitle] = useState(blogPost.title);
    // const [content, setContent] = useState(blogPost.content);
    
    
    return (
        <View>
            <BlogPostForm
                initialValues = {{title: blogPost.title, content: blogPost.content}}
                onSubmit = {(title, content) => {
                    editBlogPost(id, title, content, () => navigation.pop())
                }}
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

            <TouchableOpacity>
                <View style={styles.btn}>
                    <Text style={styles.btnTitle}>Update Post</Text>
                </View>
            </TouchableOpacity> */}
        </View>
    );  
}



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

export default EditScreen;