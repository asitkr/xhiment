import React, { useEffect, useState } from 'react';
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { db , auth} from "../firebase";

const Home = ({ isAuth }) => {

    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
    };

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
    
        getPosts();
    }, [deletePost]);

    console.log(postLists);

    return (
        <div className='container home'>
            <div className="row text fs-1">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    {
                        postLists.map((item) => {
                            return(
                                <div className='row wrapper my-5 p-3' key={item.id}>
                                    <div className='col-md-12'>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className='d-flex justify-content-between align-items-sm-center'>
                                                    <h3 className="card-title">{item.title}</h3>                                                
                                                    <div className="deletePost">
                                                        {
                                                            isAuth && item.author.id === auth.currentUser.uid && (
                                                                <button
                                                                    onClick={() => {
                                                                    deletePost(item.id);
                                                                    }}
                                                                >
                                                                    &#128465;
                                                                </button>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <hr />
                                                <div>
                                                    <p className="card-text postTextContainer fs-4">{item.posts}</p>
                                                </div>
                                                <hr />
                                                <p className='my-2' style={{fontSize: "16px"}}>@{item.author.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default Home;