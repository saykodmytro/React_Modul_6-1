import axios from 'axios';
import Loader from 'components/Loader/Loader';
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';

const PostsComments = lazy(() => import('pages/PostsComments'));

// /posts/0deqwe
// /posts/dwa2123dwa241
const PostDetails = () => {
  const { postId } = useParams();
  // postId -> '0deqwe';
  // postId -> 'dwa2123dwa241';
  // Робимо кнопку Back
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');
  const [postDetails, setPostDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        setPostDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  return (
    <div>
      <h1>Post Details</h1>
      <Link to={backLinkRef.current}>Go back</Link>
      {error !== null && <p className="error-bage">{error}</p>}
      {isLoading && <Loader />}
      {postDetails !== null && (
        <div>
          <h2>{postDetails.title}</h2>
          <h3>PostId: {postDetails.id}</h3>
          <code>{postDetails.body}</code>
        </div>
      )}
      <div>
        <NavLink className="header-link" to="comments">
          Comments
        </NavLink>
      </div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="comments" element={<PostsComments />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default PostDetails;
