"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RecipeDashboard() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", ingredients: "", steps: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("/api/recipe", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setLoading(false);
      });
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { ...form, id: editingId } : form;
    const token = localStorage.getItem("token");
    const res = await fetch("/api/recipe", {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setForm({ title: "", description: "" });
      setEditingId(null);
      // Refresh list
      fetch("/api/recipe", { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => setRecipes(data));
    }
  };

  const handleEdit = recipe => {
    setForm({ title: recipe.title, description: recipe.description, ingredients: recipe.ingredients, steps: recipe.steps });
    setEditingId(recipe.id);
  };

  const handleDelete = async id => {
    if (!confirm("Delete this recipe?")) return;
    const token = localStorage.getItem("token");
    await fetch("/api/recipe", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    });
    setRecipes(recipes.filter(r => r.id !== id));
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">My Recipes</h1>
        <form onSubmit={handleSave} className="mb-8">
          {error && <div className="text-red-600 mb-2">{error}</div>}
          <input name="title" className="input input-bordered w-full mb-2" placeholder="Title" value={form.title} onChange={handleChange} />
          <textarea name="description" className="textarea textarea-bordered w-full mb-2" placeholder="Description" value={form.description} onChange={handleChange} />
          <textarea name="ingredients" className="textarea textarea-bordered w-full mb-2" placeholder="Ingredients (comma separated)" value={form.ingredients} onChange={handleChange} />
          <textarea name="steps" className="textarea textarea-bordered w-full mb-2" placeholder="Steps (comma separated)" value={form.steps} onChange={handleChange} />
          <button type="submit" className="btn btn-primary w-full">{editingId ? "Update" : "Create"} Recipe</button>
          {editingId && <button type="button" className="btn btn-secondary w-full mt-2" onClick={() => { setEditingId(null); setForm({ title: "", description: "", ingredients: "", steps: "" }); }}>Cancel Edit</button>}
        </form>
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id} className="mb-4 border-b pb-2 flex justify-between items-center">
              <div>
                <div className="font-semibold">{recipe.title}</div>
                <div className="text-sm text-gray-600">{recipe.description}</div>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-xs btn-info" onClick={() => handleEdit(recipe)}>Edit</button>
                <button className="btn btn-xs btn-error" onClick={() => handleDelete(recipe.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 