import { FormEvent, useCallback, useState } from 'react'
import { PostCreateDto, PostStatus } from '../model/post-model'

type Props = {
  onCreatePost: (post: PostCreateDto) => void
  onError: (error: Error) => void
}

const PostInput = ({ onCreatePost, onError }: Props) => {
  const [title, setText] = useState('');
  const [status, setStatus] = useState(PostStatus.Published);
  const submitPost = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (title.trim().length === 0) {
        onError(new Error('All fields are required'))
        return;
      }
      const post = new PostCreateDto('', '', 1, [], '');
      onCreatePost(post);
      resetPost();
    },
    [title, onCreatePost, onError],
    
  )
  function resetPost(event?: FormEvent) {
    setText('');
    setStatus(PostStatus.Published);
  }
  return (
    <form onSubmit={submitPost} onReset={resetPost} className='my-2'>
      <input value={title} onChange={event => setText(event.target.value)} className="form-control" placeholder="What to do next?" />
      <select value={status} onChange={event => setStatus(parseInt(event.target.value))} className="form-select">
        <option value={PostStatus.Published}>Active</option>
        <option value={PostStatus.Created}>Completed</option>
        <option value={PostStatus.Archived}>Canceled</option>
      </select>
      <div className="d-flex flex-row">
        <button type="submit" className="btn btn-success ms-2">Submit</button>
        <button type="reset" className="btn btn-danger ms-2">Reset</button>
      </div>
    </form>
  )
}

export default PostInput;