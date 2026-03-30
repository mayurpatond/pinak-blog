import { Navigate, useParams } from 'react-router-dom';



export default function Deletepost() {

     const { id } = useParams();

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


return(
<h3>this post deleted</h3>
)

}