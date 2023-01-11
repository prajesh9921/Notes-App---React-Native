import React, { useState, useReducer } from "react";
import createContextData from "./createContextData";
import JsonServer from "../api/JsonServer";

// const BlogContext = React.createContext();

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blog':
            return action.payload;
        case 'edit_blog':
            return state.map((blogPost) =>  {
                return blogPost.id === action.payload.id ? action.payload : blogPost;
            })
        case 'del_blog':
            return state.filter((blogPost) => blogPost.id !== action.payload);
        case 'add_blog':
            return [
                ...state,
                { id: Math.floor(Math.random() * 99999),
                  title: action.payload.title,
                  content: action.payload.content
                }]
        default:
            return state;
    };
};

const getBlogPost = (dispatch) => {
    return async () => {
        try{
            const response = await JsonServer.get('/blogposts');
            dispatch({type: "get_blog", payload: response.data})
        } catch (e) {
            console.log(e)
        }
    };
};

const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        await JsonServer.post('/blogposts', {title,content});
        // dispatch({type: 'add_blog', payload: {title, content, callback}});
        callback();
    };
};

const deleteBlogPost = (dispatch) => {
    return async (id) => {
        try{
            await JsonServer.delete(`/blogposts/${id}`);
        } catch (e) {
            console.log(e);
        } finally {
            dispatch({type: 'del_blog', payload: id});
        }
    };
};

const editBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        await JsonServer.put(`/blogposts/${id}`, {title: title, content: content})
        dispatch({type: 'edit_blog', payload: {id, title, content}});
        callback();
    }
};

export const {Context, Provider} = createContextData(
    blogReducer,
    {addBlogPost, deleteBlogPost, editBlogPost, getBlogPost},
    []
);

// export const BlogProvider = ({children}) => {
//     // const [blogPosts, setBlogPosts] = useState([]);
//     const [blogPosts, dispatch] = useReducer(blogReducer, []);

//     // const addBlogPost = () => {
//     //     setBlogPosts([...blogPosts, { title: `BlogPost #${blogPosts.length + 1}`}]);   
//     // };

//     const addBlogPost = () => {
//         dispatch({type: 'add_blog'});
//     };

//     return (
//     <BlogContext.Provider value={{ data: blogPosts, addBlogPost: addBlogPost}}>
//         {children}
//     </BlogContext.Provider>
//     );
// };

// export default BlogContext;
