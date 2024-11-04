// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// interface Category {
//   _id: string;
//   name: string;
//   description: string;
// }

// export default function AdminDashboard() {
//   const [categories, setCategories] = useState<Category []>([]);
//   const [newCategory, setNewCategory] = useState({ name: '', description: '' });
//   const [editingCategory, setEditingCategory] = useState<Category | null>(null);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/categories');
//       setCategories(response.data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const handleCreateCategory = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:8080/categories', newCategory);
//       setNewCategory({ name: '', description: '' });
//       fetchCategories();
//     } catch (error) {
//       console.error('Error creating category:', error);
//     }
//   };

//   const handleUpdateCategory = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingCategory) return;
//     try {
//       await axios.put(`http://localhost:8080/categories/${editingCategory._id}`, editingCategory);
//       setEditingCategory(null);
//       fetchCategories();
//     } catch (error) {
//       console.error('Error updating category:', error);
//     }
//   };

//   const handleDeleteCategory = async (id: string) => {
//     try {
//       await axios.delete(`http://localhost:8080/categories/${id}`);
//       fetchCategories();
//     } catch (error) {
//       console.error('Error deleting category:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard - Categories</h1>

//       {/* Create Category Form */}
//       <form onSubmit={handleCreateCategory} className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Create New Category</h2>
//         <input
//           type="text"
//           placeholder="Category Name"
//           value={newCategory.name}
//           onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
//           className="border p-2 mr-2"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={newCategory.description}
//           onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
//           className="border p-2 mr-2"
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create</button>
//       </form>

//       {/* Edit Category Form */}
//       {editingCategory && (
//         <form onSubmit={handleUpdateCategory} className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">Edit Category</h2>
//           <input
//             type="text"
//             placeholder="Category Name"
//             value={editingCategory.name}
//             onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
//             className="border p-2 mr-2"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={editingCategory.description}
//             onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <button type="submit" className="bg-green-500 text-white p-2 rounded mr-2">Update</button>
//           <button onClick={() => setEditingCategory(null)} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
//         </form>
//       )}

//       {/* Categories List */}
//       <h2 className="text-xl font-semibold mb-2">Categories</h2>
//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Description</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((category) => (
//             <tr key={category._id}>
//               <td className="border p-2">{category.name}</td>
//               <td className="border p-2">{category.description}</td>
//               <td className="border p-2">
//                 <button
//                   onClick={() => setEditingCategory(category)}
//                   className="bg-yellow-500 text-white p-1 rounded mr-2"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteCategory(category._id)}
//                   className="bg-red-500 text-white p-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }