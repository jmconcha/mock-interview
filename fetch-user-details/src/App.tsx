import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Name {
  title: string;
  first: string;
  last: string;
}

function getUserFullName(name: Name): string {
  const { title, first, last } = name;

  return `${title} ${first} ${last}`;
}

function App(): JSX.Element {
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const apiUrl = `https://randomuser.me/api?page=${currentPage}`;

    const fetchUsers = async () => {
      const response = await axios.get(apiUrl);
      setUsers((prevState) => [...prevState, ...response.data.results]);
    };

    fetchUsers();
  }, [currentPage]);

  const previousPage = () => setCurrentPage((prevState) => prevState - 1);
  const nextPage = () => setCurrentPage((prevState) => prevState + 1);

  return (
    <>
      <div>
        {users.map((user: any) => (
          <div key={user.id.value || user.dob.date}>
            <img src={user.picture.thumbnail} alt="avatar" />
            <h4>{getUserFullName(user.name)}</h4>
          </div>
        ))}
      </div>
      <button onClick={previousPage}>Previous Page</button>
      <button onClick={nextPage}>Next Page</button>
    </>
  );
}

export default App;
