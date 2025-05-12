import { useLoaderData } from 'react-router'
import type { MessageData } from '../service/messages-loader';


const Dashboard = () => {
  const { messages } = useLoaderData() as MessageData;
  return (
    <>
      <h3>Message Dashboard</h3>
      <section className='messages'>
        {messages.map(m => (<div className='message' key={m}>{m}</div>))}
      </section>
    </>

  )
}

export default Dashboard;