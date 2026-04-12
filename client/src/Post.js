// import { Link } from 'react-router-dom';
// import logo from './pexels.jpg';
// import { format } from "date-fns";

// export default function Post({ _id,title, summary, cover, content, createdAt, author }) {
//   return (
//     <div className='post'>
//       <div className='image'>
//         <Link to={`/post/${_id}`}>
//           <img src={'http://localhost:4000/' + cover} alt='Loading..'></img>
//         </Link>
//       </div>
//       <div className='texts'>
//         <Link to={`/post/${_id}`}>
//           <h2>{title}</h2>
//         </Link>
//         <p className='info'>
//           <Link className='author'> {author.username} </Link>
//           <time> {format(new Date(createdAt), "dd-MM-yyyy")}</time>
//         </p>
//         <p>{summary} </p>
//       </div>
//     </div>
//   )
// }


// new ui  code===================================================================



import { Link } from "react-router-dom";
import { format } from "date-fns";
import { API_URL } from "./config";

export default function Post({
  _id,
  title,
  summary,
  cover,
  createdAt,
  author,
}) {
  return (
    <article className="post-card">
      <Link to={`/post/${_id}`} className="post-image">
        <img
          src={`${API_URL}/${cover}`}
          alt={title}
          loading="lazy"
        />
      </Link>

      <div className="post-content">
        <Link to={`/post/${_id}`}>
          <h2 className="post-title">{title}</h2>
        </Link>

        <div className="post-meta">
          <span className="post-author">✍ {author.username}</span>
          <span className="post-date">
            {format(new Date(createdAt), "dd MMM yyyy")}
          </span>
        </div>

        <p className="post-summary">{summary}</p>

        <Link to={`/post/${_id}`} className="read-more">
          Read more →
        </Link>
      </div>
    </article>
  );
}







