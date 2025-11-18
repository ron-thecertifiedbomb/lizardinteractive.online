// components/TodoApp.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Check, 
  Trash2, 
  Edit3, 
  Filter, 
  Calendar,
  Clock,
  Star,
  Search,
  MoreVertical,
  CheckCircle2,
  Circle
} from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  important: boolean;
  category: string;
  dueDate?: string;
  createdAt: string;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'important'>('all');
  const [category, setCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<string[]>(['Personal', 'Work', 'Shopping', 'Health', 'Learning']);
  const [newCategory, setNewCategory] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedCategories = localStorage.getItem('todo-categories');
    
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('todo-categories', JSON.stringify(categories));
  }, [categories]);

  const addTodo = () => {
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
      important: false,
      category: 'Personal',
      createdAt: new Date().toISOString()
    };

    setTodos([todo, ...todos]);
    setNewTodo('');
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const toggleImportant = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, important: !todo.important } : todo
    ));
  };

  const startEditing = (todo: Todo) => {
    setEditingTodo(todo);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (!editingTodo || !editText.trim()) return;

    setTodos(todos.map(todo =>
      todo.id === editingTodo.id ? { ...todo, text: editText.trim() } : todo
    ));
    setEditingTodo(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingTodo(null);
    setEditText('');
  };

  const updateCategory = (id: string, newCategory: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, category: newCategory } : todo
    ));
  };

  const updateDueDate = (id: string, dueDate: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, dueDate } : todo
    ));
  };

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
      setShowCategoryInput(false);
    }
  };

  const getFilteredTodos = () => {
    let filtered = todos;

    // Apply status filter
    switch (filter) {
      case 'active':
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = filtered.filter(todo => todo.completed);
        break;
      case 'important':
        filtered = filtered.filter(todo => todo.important);
        break;
    }

    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter(todo => todo.category === category);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(todo =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const getStats = () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const important = todos.filter(todo => todo.important && !todo.completed).length;
    const active = total - completed;

    return { total, completed, important, active };
  };

  const stats = getStats();
  const filteredTodos = getFilteredTodos();

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto p-10  bg-slate-800 rounded-xl">
        {/* Header */}
        {/* <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Todo App
          </h1>
          <p className="text-gray-600 text-lg">Stay organized and get things done</p>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Add Todo Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-blue-600" />
                Add New Todo
              </h3>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="What needs to be done?"
                    className=" w-full max-w-30 p-3 border text-gray-800 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={addTodo}
                    className="bg-blue-600 text-gray-400 p-3 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
                Overview
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-700">Total</span>
                  <span className="font-semibold text-blue-700">{stats.total}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700">Active</span>
                  <span className="font-semibold text-green-700">{stats.active}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-700">Important</span>
                  <span className="font-semibold text-purple-700">{stats.important}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                  <span className="text-gray-700">Completed</span>
                  <span className="font-semibold text-gray-700">{stats.completed}</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-orange-600" />
                  Categories
                </h3>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setCategory('all')}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    category === 'all' 
                      ? 'bg-blue-50 border border-blue-200 text-blue-700' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  📁 All Tasks
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex justify-between items-center ${
                      category === cat 
                        ? 'bg-blue-50 border border-blue-200 text-blue-700' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>📋 {cat}</span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                      {todos.filter(todo => todo.category === cat).length}
                    </span>
                  </button>
                ))}
                {showCategoryInput ? (
                  <div className="flex space-x-2 p-3">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                      placeholder="New category"
                      className="flex-1 p-2 border border-gray-300 rounded-lg text-sm  text-gray-800"
                      autoFocus
                    />
                    <button
                      onClick={addCategory}
                      className="bg-green-500 text-white p-2 rounded-lg"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCategoryInput(true)}
                    className="w-full text-left p-3 rounded-xl text-gray-500 hover:bg-gray-50 transition-all flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </button>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={clearCompleted}
                  className="w-full text-left p-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
                >
                  🗑️ Clear Completed
                </button>
                <button
                  onClick={() => setFilter('all')}
                  className="w-full text-left p-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all"
                >
                  📋 Show All Tasks
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters and Search */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search todos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border  text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      filter === 'all' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('active')}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      filter === 'active' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFilter('completed')}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      filter === 'completed' 
                        ? 'bg-gray-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => setFilter('important')}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      filter === 'important' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Important
                  </button>
                </div>
              </div>
            </div>

            {/* Todos List */}
            <div className="space-y-3">
              {filteredTodos.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {todos.length === 0 ? 'No todos yet!' : 'No todos found'}
                  </h3>
                  <p className="text-gray-600">
                    {todos.length === 0 
                      ? "Get started by adding your first todo above!" 
                      : "Try changing your filters or search term."}
                  </p>
                </div>
              ) : (
                filteredTodos.map(todo => (
                  <div
                    key={todo.id}
                    className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-4 transition-all hover:shadow-md ${
                      todo.completed ? 'opacity-75' : ''
                    } ${todo.important && !todo.completed ? 'border-l-4 border-l-purple-500' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {/* Complete Checkbox */}
                        <button
                          onClick={() => toggleComplete(todo.id)}
                          className={`mt-1 transition-all ${
                            todo.completed ? 'text-green-500' : 'text-gray-400 hover:text-green-500'
                          }`}
                        >
                          {todo.completed ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : (
                            <Circle className="w-6 h-6" />
                          )}
                        </button>

                        {/* Todo Content */}
                        <div className="flex-1 min-w-0">
                          {editingTodo?.id === todo.id ? (
                            <div className="space-y-3">
                              <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoFocus
                              />
                              <div className="flex space-x-2">
                                <button
                                  onClick={saveEdit}
                                  className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="bg-gray-500 text-white px-3 py-1 rounded-lg text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <p className={`text-gray-900 ${todo.completed ? 'line-through' : ''}`}>
                                {todo.text}
                              </p>
                              
                              {/* Meta Information */}
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                  {todo.category}
                                </span>
                                {todo.dueDate && (
                                  <span className="flex items-center text-xs text-gray-500">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(todo.dueDate).toLocaleDateString()}
                                  </span>
                                )}
                                <span className="flex items-center text-xs text-gray-500">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {new Date(todo.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      {editingTodo?.id !== todo.id && (
                        <div className="flex items-center space-x-1">
                          {/* Important Toggle */}
                          <button
                            onClick={() => toggleImportant(todo.id)}
                            className={`p-2 rounded-lg transition-all ${
                              todo.important 
                                ? 'text-purple-600 bg-purple-50' 
                                : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'
                            }`}
                          >
                            <Star className={`w-4 h-4 ${todo.important ? 'fill-current' : ''}`} />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => startEditing(todo)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          {/* More Options */}
                          <div className="relative group">
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            
                            {/* Dropdown Menu */}
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                              <div className="p-2">
                                <div className="text-xs font-semibold text-gray-500 px-3 py-2">
                                  Change Category
                                </div>
                                {categories.map(cat => (
                                  <button
                                    key={cat}
                                    onClick={() => updateCategory(todo.id, cat)}
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg transition-colors"
                                  >
                                    {cat}
                                  </button>
                                ))}
                              </div>
                              <div className="border-t border-gray-200 p-2">
                                <input
                                  type="date"
                                  onChange={(e) => updateDueDate(todo.id, e.target.value)}
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  placeholder="Add due date"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;