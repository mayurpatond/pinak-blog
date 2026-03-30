import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";

export default function PostPage() {

    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext)
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                })
            })

    }, [])

    function deletePost(ev) {
         ev.preventDefault();
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this post?'
        );

        if (!confirmDelete) return;

        fetch(`http://localhost:4000/post/${postInfo._id}`, {
            method: 'DELETE',
            credentials: 'include',
        }).then((res) => {
            if (res.ok) {
                alert('Post deleted');
                window.location.href = '/';
                
            } else {
                alert('You are not allowed to delete this post');
            }
        });
    }


    if (!postInfo) return "";
    return (
        <div className="postpage">
            <h1>{postInfo.title}</h1>
            <time>Created on {formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author"> By {postInfo.author.username}</div>

            {userInfo.id === postInfo.author._id && (
                <div className="edit-option">
                    <Link className="edit-anchor" to={`/edit/${postInfo._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>

                        Edit Post </Link>

                    <Link className="delete_post" onClick={deletePost}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                        </svg>
                        Delete Post
                    </Link>
                </div>
            )}

            <div className="postimage">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="No preview" />
            </div>

            <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
    )
}