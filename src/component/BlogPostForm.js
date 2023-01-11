import React, { useContext , useState} from 'react';
import { Text, View, StyleSheet , TextInput, TouchableOpacity,} from 'react-native';
import {Context} from '../context/BlogContext';

const BlogPostForm = ({onSubmit, btnTitle, initialValues}) => {

    const [title, setTitle] = useState(initialValues.title);
    const [content , setContent] = useState(initialValues.content);

    return (
        <View>
            <Text style={styles.text}>Enter title</Text>
            <TextInput 
                style={styles.textInput}
                value={title}
                onChangeText = {(text) => setTitle(text)}
                multiline = {true}
            />
            <Text style={styles.text}>Enter Content</Text>
            <TextInput 
                style={styles.textInput}
                value={content}
                multiline = {true}
                onChangeText = {text => setContent(text)}
            />

            <TouchableOpacity onPress={() => onSubmit(title, content)}>
                <View style={styles.btn}>
                    <Text style={styles.btnTitle}>{btnTitle ? btnTitle: "Save Post" }</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

// Used to give default values to props also can do using ternary operator.
BlogPostForm.defaultProps = {
    initialValues: {
        title: " ",
        content: " ",
    },

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

export default BlogPostForm;