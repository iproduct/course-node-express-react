import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { MessageData } from '../service/messages-loader';

type Props = {}

const Dashboard = (props: Props) => {
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