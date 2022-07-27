import React, { useEffect } from 'react';
import { fetchUsers } from '@features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const Dashboard = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>List of Users</h2>
      {user.loading && <div>Loading...</div>}
      {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
      {!user.loading && user.users.length ? (
        <ul>
          {user.users.map((person: { id: number; name: string }) => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Dashboard;
