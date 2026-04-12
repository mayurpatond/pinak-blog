import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { API_URL } from "../config";

export default function PostPage() {

    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext)
    const { id } = useParams();
    useEffect(() => {
        fetch(`${API_URL}/post/${id}`)
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

        fetch(`${API_URL}/post/${postInfo._id}`, {
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

  <div className="post-meta">
    <time>Created on {formatISO9075(new Date(postInfo.createdAt))}</time>
    <span className="author">By {postInfo.author.username}</span>
  </div>

  {userInfo.id === postInfo.author._id && (
    <div className="edit-option">
      <Link className="edit-anchor" to={`/edit/${postInfo._id}`}>
        ✏️ Edit Post
      </Link>

      <button className="delete_post" onClick={deletePost}>
        🗑️ Delete Post
      </button>
    </div>
  )}

  <div className="postimage">
    <img
      src={`http://localhost:4000/${postInfo.cover}`}
      alt="No preview"
    />
  </div>

  <div className="post-content"
       dangerouslySetInnerHTML={{ __html: postInfo.content }} />
</div>

    )
}