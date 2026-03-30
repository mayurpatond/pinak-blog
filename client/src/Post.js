import { Link } from 'react-router-dom';
import logo from './pexels.jpg';
import { format } from "date-fns";

export default function Post({ _id,title, summary, cover, content, createdAt, author }) {
  return (
    <div className='post'>
      <div className='image'>
        <Link to={`/post/${_id}`}>
          <img src={'http://localhost:4000/' + cover} alt='Loading..'></img>
        </Link>
      </div>
      <div className='texts'>
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className='info'>
          <Link className='author'> {author.username} </Link>
          <time> {format(new Date(createdAt), "dd-MM-yyyy")}</time>
        </p>
        <p>{summary} </p>
      </div>
    </div>
  )
}