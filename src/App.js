import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function App() {
  const task = useSelector(store => store.task);
  return (
    <div>
      <h1>{task.title}</h1>
    </div>
  );
}
