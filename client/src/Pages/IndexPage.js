import { useEffect, useState } from "react";
import Post from "../Post";
import { API_URL } from "../config";

export default function IndexPage() {

    const [posts, setPosts]= useState([])

    useEffect(() => {
        fetch(`${API_URL}/post`).then(response => {
            response.json().then(post => {
                setPosts(post)
            })
        })
    }, []);

    return (
        <>
            {posts.length > 0 && posts.map(post =>(
                <Post {...post} />
            ))}
        </>
    )
}