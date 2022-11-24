import React, { useEffect, useState } from 'react'
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isAuth }) => {

    const [title, setTitle] = useState("");
    const [posts, setPosts] = useState("");

    const postsCollectionRef = collection(db, "posts");
    const navigate = useNavigate();

    // console.log(title);
    // console.log(posts);

    const createPost = async () => {
        await addDoc(postsCollectionRef, {
            title,
            posts,
            author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
        });
        navigate("/");
    };

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, []);
    

    return (
        <>
            <div className="container create__post">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6" style={{marginTop: "6%"}}>
                        <div className="card text-white bg-dark my-5 p-3">
                            <div className="card-header fs-1 text-center">Create A Post</div>
                            <div className="form-group mx-5">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Enter title"
                                    onChange={(e) => {setTitle(e.target.value)}}
                                    />
                            </div>
                            <div className="form-group mx-5 my-4">
                                <textarea 
                                    className="form-control" 
                                    rows="3" 
                                    placeholder="Enter post message..."
                                    onChange={(e) => {setPosts(e.target.value)}}
                                    />
                            </div>
                            <button 
                                type="button" 
                                className="btn btn-primary mx-5 text-white fs-5 fw-bold" 
                                style={{backgroundColor: "#FF4F00", border: "none"}}
                                onClick={createPost}
                            >
                                Submit Post
                            </button>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    )
}

export default CreatePost