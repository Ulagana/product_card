// 'use client'

// import { useState, useEffect } from 'react'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { toast } from "@/components/ui/use-toast"

// // Types for our entities
// type Category = {
//   _id: string;
//   name: string;
//   description: string;
// }

// type Subcategory = {
//   _id: string;
//   name: string;
//   description: string;
//   catId: string;
// }

// type Product = {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   catId: string;
//   subCatId: string;
// }

// export default function AdminPanel() {
//   const [categories, setCategories] = useState<Category[]>([])
//   const [subcategories, setSubcategories] = useState<Subcategory[]>([])
//   const [products, setProducts] = useState<Product[]>([])

//   const [newCategory, setNewCategory] = useState({ name: '', description: '' })
//   const [newSubcategory, setNewSubcategory] = useState({ name: '', description: '', catId: '' })
//   const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, catId: '', subCatId: '' })

//   useEffect(() => {
//     fetchCategories()
//     fetchSubcategories()
//     fetchProducts()
//   }, [])

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch('/api/categories')
//       const data = await response.json()
//       setCategories(data.data)
//     } catch (error) {
//       console.error('Error fetching categories:', error)
//       toast({ title: "Error", description: "Failed to fetch categories", variant: "destructive" })
//     }
//   }

//   const fetchSubcategories = async () => {
//     try {
//       const response = await fetch('/api/subcategories')
//       const data = await response.json()
//       setSubcategories(data)
//     } catch (error) {
//       console.error('Error fetching subcategories:', error)
//       toast({ title: "Error", description: "Failed to fetch subcategories", variant: "destructive" })
//     }
//   }

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch('/api/products')
//       const data = await response.json()
//       setProducts(data)
//     } catch (error) {
//       console.error('Error fetching products:', error)
//       toast({ title: "Error", description: "Failed to fetch products", variant: "destructive" })
//     }
//   }

//   const handleCategorySubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       const response = await fetch('/api/categories', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newCategory),
//       })
//       if (response.ok) {
//         toast({ title: "Success", description: "Category created successfully" })
//         fetchCategories()
//         setNewCategory({ name: '', description: '' })
//       } else {
//         toast({ title: "Error", description: "Failed to create category", variant: "destructive" })
//       }
//     } catch (error) {
//       console.error('Error creating category:', error)
//       toast({ title: "Error", description: "Failed to create category", variant: "destructive" })
//     }
//   }

//   const handleSubcategorySubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       const response = await fetch('/api/subcategories', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newSubcategory),
//       })
//       if (response.ok) {
//         toast({ title: "Success", description: "Subcategory created successfully" })
//         fetchSubcategories()
//         setNewSubcategory({ name: '', description: '', catId: '' })
//       } else {
//         toast({ title: "Error", description: "Failed to create subcategory", variant: "destructive" })
//       }
//     } catch (error) {
//       console.error('Error creating subcategory:', error)
//       toast({ title: "Error", description: "Failed to create subcategory", variant: "destructive" })
//     }
//   }

//   const handleProductSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       const response = await fetch('/api/products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newProduct),
//       })
//       if (response.ok) {
//         toast({ title: "Success", description: "Product created successfully" })
//         fetchProducts()
//         setNewProduct({ name: '', description: '', price: 0, catId: '', subCatId: '' })
//       } else {
//         toast({ title: "Error", description: "Failed to create product", variant: "destructive" })
//       }
//     } catch (error) {
//       console.error('Error creating product:', error)
//       toast({ title: "Error", description: "Failed to create product", variant: "destructive" })
//     }
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
//       <Tabs defaultValue="category">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="category">Category</TabsTrigger>
//           <TabsTrigger value="subcategory">Subcategory</TabsTrigger>
//           <TabsTrigger value="product">Product</TabsTrigger>
//         </TabsList>
//         <TabsContent value="category">
//           <form onSubmit={handleCategorySubmit} className="space-y-4 mb-8">
//             <div>
//               <Label htmlFor="category-name">Category Name</Label>
//               <Input 
//                 id="category-name" 
//                 value={newCategory.name}
//                 onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
//                 placeholder="Enter category name" 
//               />
//             </div>
//             <div>
//               <Label htmlFor="category-description">Description</Label>
//               <Textarea 
//                 id="category-description" 
//                 value={newCategory.description}
//                 onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
//                 placeholder="Enter category description" 
//               />
//             </div>
//             <Button type="submit">Add Category</Button>
//           </form>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Description</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {categories.map((category) => (
//                 <TableRow key={category._id}>
//                   <TableCell>{category.name}</TableCell>
//                   <TableCell>{category.description}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TabsContent>
//         <TabsContent value="subcategory">
//           <form onSubmit={handleSubcategorySubmit} className="space-y-4 mb-8">
//             <div>
//               <Label htmlFor="subcategory-name">Subcategory Name</Label>
//               <Input 
//                 id="subcategory-name" 
//                 value={newSubcategory.name}
//                 onChange={(e) => setNewSubcategory({...newSubcategory, name: e.target.value})}
//                 placeholder="Enter subcategory name" 
//               />
//             </div>
//             <div>
//               <Label htmlFor="parent-category">Parent Category</Label>
//               <Select onValueChange={(value) => setNewSubcategory({...newSubcategory, catId: value})}>
//                 <SelectTrigger id="parent-category">
//                   <SelectValue placeholder="Select parent category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((category) => (
//                     <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label htmlFor="subcategory-description">Description</Label>
//               <Textarea 
//                 id="subcategory-description" 
//                 value={newSubcategory.description}
//                 onChange={(e) => setNewSubcategory({...newSubcategory, description: e.target.value})}
//                 placeholder="Enter subcategory description" 
//               />
//             </div>
//             <Button type="submit">Add Subcategory</Button>
//           </form>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Parent Category</TableHead>
//                 <TableHead>Description</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {subcategories.map((subcategory) => (
//                 <TableRow key={subcategory._id}>
//                   <TableCell>{subcategory.name}</TableCell>
//                   <TableCell>{categories.find(c => c._id === subcategory.catId)?.name}</TableCell>
//                   <TableCell>{subcategory.description}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TabsContent>
//         <TabsContent value="product">
//           <form onSubmit={handleProductSubmit} className="space-y-4 mb-8">
//             <div>
//               <Label htmlFor="product-name">Product Name</Label>
//               <Input 
//                 id="product-name" 
//                 value={newProduct.name}
//                 onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
//                 placeholder="Enter product name" 
//               />
//             </div>
//             <div>
//               <Label htmlFor="product-category">Category</Label>
//               <Select onValueChange={(value) => setNewProduct({...newProduct, catId: value})}>
//                 <SelectTrigger id="product-category">
//                   <SelectValue placeholder="Select category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((category) => (
//                     <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label htmlFor="product-subcategory">Subcategory</Label>
//               <Select onValueChange={(value) => setNewProduct({...newProduct, subCatId: value})}>
//                 <SelectTrigger id="product-subcategory">
//                   <SelectValue placeholder="Select subcategory" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {subcategories.filter(sub => sub.catId === newProduct.catId).map((subcategory) => (
//                     <SelectItem key={subcategory._id} value={subcategory._id}>{subcategory.name}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label htmlFor="product-description">Description</Label>
//               <Textarea 
//                 id="product-description" 
//                 value={newProduct.description}
//                 onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
//                 placeholder="Enter product description" 
//               />
//             </div>
//             <div>
//               <Label htmlFor="product-price">Price</Label>
//               <Input 
//                 id="product-price" 
//                 type="number" 
//                 value={newProduct.price}
//                 onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
//                 placeholder="Enter product price" 
//               />
//             </div>
//             <Button type="submit">Add Product</Button>
//           </form>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Subcategory</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead>Description</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {products.map((product) => (
//                 <TableRow key={product._id}>
//                   <TableCell>{product.name}</TableCell>
//                   <TableCell>{categories.find(c => c._id === product.catId)?.name}</TableCell>
//                   <TableCell>{subcategories.find(s => s._id === product.subCatId)?.name}</TableCell>
//                   <TableCell>${product.price.toFixed(2)}</TableCell>
//                   <TableCell>{product.description}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }