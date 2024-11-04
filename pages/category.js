import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cat.css'

function Category() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/categories')
  //     .then(response => {
  //       if ((response?.data)) {
  //            console.log('response',response.data)
  //         setCategories(response?.data?.data);
  //       } else {
  //         console.error('API response is not an array');
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   axios.post('http://localhost:5000/api/categories', { name, description })
  //     .then(response => {
  //       if (Array.isArray(response.data)) {
  //         setCategories([...categories, response.data]);
  //       } else {
  //         console.error('API response is not an array');
  //       }
  //       setName('');
  //       setDescription('');
  //       window.location.reload()
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  // const getFetchData = async () => {
  //   const data = await axios.get("/");
  //   console.log(data);
  //   if (data.data.success) {
  //     setDataList(data.data.data);
  //   }
  // };

  // useEffect(() => {
  //   getFetchData();
  // }, []);
  
  useEffect(() => {
    // Fetch categories from the server
    axios.get('http://localhost:5000/api/categories')
      .then(response => setCategories(response.data.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editMode) {
      handleUpdate(editId);
    } else {
      handleCreate(); 
    }
  };

  const handleCreate = () => {
    axios.post('http://localhost:5000/api/categories', { name, description })
      .then(response => {
        setCategories([...categories, response.data.data]);
        setName('');
        setDescription('');
      })
      .catch(error => console.error('Error creating category:', error));
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:5000/api/categories/${id}`, { name, description })
      .then(response => {
        const updatedCategory = response.data.data;

        const updatedCategories = categories.map(category =>
          category._id === id ? updatedCategory : category
        );

        setCategories(updatedCategories);
        setEditMode(false);
        setEditId(null);
        setName('');
        setDescription('');
        console.log('Category updated successfully:', updatedCategory);
      })
      .catch(error => console.error('Error updating category:', error.response?.data || error.message));
  };

  const handleEdit = (category) => {
    setEditMode(true);
    setEditId(category._id);
    setName(category.name);
    setDescription(category.description);
  };
  
  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/categories/${id}`)
      .then(response => {
        alert("deleted category")
         window.location.reload()
        // getFetchData();
        if (Array.isArray(response.data)) {
          const updatedCategories = categories.filter(category => category._id !== id);
          setCategories(updatedCategories);

        } else {
          console.error('API response is not an array');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
<div>
      <h1>Category</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
        />
        <button type="submit">
          {editMode ? 'Update Category' : 'Create Category'}
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <button onClick={() => handleEdit(category)}>Edit</button> <span> </span>
                <button onClick={() => handleDelete(category._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Category;