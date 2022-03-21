import './App.css';
import { db } from './firebase';
import React,{useState,useEffect} from 'react';

function App() {
  const [users,setUsers]=useState([]);
  const fetchBlogs = async()=>{
    const response = db.collection('users');
    const data=await response.get();
    data.docs.forEach(item=>{
           setUsers([...users,item.data()])
          })
  }
  useEffect(() => {
    fetchBlogs();
  }, []);


  return (
    <div className="App">
      {
        users && users.map(user=>{
          return(
            <div className="blog-container">
              <h4>{user.userName}</h4>
              <h4>{user.userEmail}</h4>
              <h4>{user.password}</h4>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
