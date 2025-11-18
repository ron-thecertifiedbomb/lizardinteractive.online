// app/planner/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Edit3, Coffee, Calendar, Clock, Target } from 'lucide-react';

interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    category: 'work' | 'personal' | 'health' | 'learning' | 'other';
    timeEstimate: number; // in minutes
    dueDate?: string;
    createdAt: string;
}

interface CategoryCount {
    work: number;
    personal: number;
    health: number;
    learning: number;
    other: number;
}

export default function Planner() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'medium' as 'low' | 'medium' | 'high',
        category: 'personal' as 'work' | 'personal' | 'health' | 'learning' | 'other',
        timeEstimate: 30,
        dueDate: ''
    });
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [selectedCategory, setSelectedCategory] = useState<'all' | Task['category']>('all');
    const [showAddForm, setShowAddForm] = useState(false);

    // Load tasks from localStorage on component mount
    useEffect(() => {
        const savedTasks = localStorage.getItem('planner-tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem('planner-tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (!newTask.title.trim()) return;

        const task: Task = {
            id: Date.now().toString(),
            title: newTask.title,
            description: newTask.description,
            completed: false,
            priority: newTask.priority,
            category: newTask.category,
            timeEstimate: newTask.timeEstimate,
            dueDate: newTask.dueDate,
            createdAt: new Date().toISOString()
        };

        setTasks([task, ...tasks]);
        setNewTask({
            title: '',
            description: '',
            priority: 'medium',
            category: 'personal',
            timeEstimate: 30,
            dueDate: ''
        });
        setShowAddForm(false);
    };

    const updateTask = (id: string, updates: Partial<Task>) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, ...updates } : task
        ));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleComplete = (id: string) => {
        updateTask(id, { completed: !tasks.find(task => task.id === id)?.completed });
    };

    const startEditing = (task: Task) => {
        setEditingTask(task);
        setNewTask({
            title: task.title,
            description: task.description,
            priority: task.priority,
            category: task.category,
            timeEstimate: task.timeEstimate,
            dueDate: task.dueDate || ''
        });
        setShowAddForm(true);
    };

    const saveEdit = () => {
        if (!editingTask || !newTask.title.trim()) return;

        updateTask(editingTask.id, {
            title: newTask.title,
            description: newTask.description,
            priority: newTask.priority,
            category: newTask.category,
            timeEstimate: newTask.timeEstimate,
            dueDate: newTask.dueDate
        });

        setEditingTask(null);
        setNewTask({
            title: '',
            description: '',
            priority: 'medium',
            category: 'personal',
            timeEstimate: 30,
            dueDate: ''
        });
        setShowAddForm(false);
    };

    const cancelEdit = () => {
        setEditingTask(null);
        setNewTask({
            title: '',
            description: '',
            priority: 'medium',
            category: 'personal',
            timeEstimate: 30,
            dueDate: ''
        });
        setShowAddForm(false);
    };

    const getFilteredTasks = () => {
        let filtered = tasks;

        if (activeFilter === 'active') {
            filtered = filtered.filter(task => !task.completed);
        } else if (activeFilter === 'completed') {
            filtered = filtered.filter(task => task.completed);
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(task => task.category === selectedCategory);
        }

        return filtered;
    };

    const getCategoryCounts = (): CategoryCount => {
        return tasks.reduce((acc, task) => {
            if (!task.completed) {
                acc[task.category]++;
            }
            return acc;
        }, {
            work: 0,
            personal: 0,
            health: 0,
            learning: 0,
            other: 0
        });
    };

    const getPriorityColor = (priority: Task['priority']) => {
        switch (priority) {
            case 'high': return 'border-l-red-500';
            case 'medium': return 'border-l-yellow-500';
            case 'low': return 'border-l-green-500';
            default: return 'border-l-gray-300';
        }
    };

    const getCategoryColor = (category: Task['category']) => {
        switch (category) {
            case 'work': return 'bg-blue-100 text-blue-800';
            case 'personal': return 'bg-purple-100 text-purple-800';
            case 'health': return 'bg-green-100 text-green-800';
            case 'learning': return 'bg-orange-100 text-orange-800';
            case 'other': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryIcon = (category: Task['category']) => {
        switch (category) {
            case 'work': return '💼';
            case 'personal': return '🏠';
            case 'health': return '💪';
            case 'learning': return '📚';
            case 'other': return '📦';
            default: return '📝';
        }
    };

    const totalTime = tasks
        .filter(task => !task.completed)
        .reduce((sum, task) => sum + task.timeEstimate, 0);

    const completedTasks = tasks.filter(task => task.completed).length;
    const categoryCounts = getCategoryCounts();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
            {/* Header */}
            <header className="bg-white border-b border-green-200">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-green-600 p-2 rounded-lg">
                                <Coffee className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Daily Planner</h1>
                                <p className="text-gray-600 text-sm">Organize your day, one task at a time</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-600">Today</div>
                            <div className="text-lg font-semibold text-gray-900">
                                {new Date().toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Stats Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <Target className="w-5 h-5 mr-2 text-green-600" />
                                Today's Overview
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Pending Tasks</span>
                                    <span className="font-semibold text-gray-900">
                                        {tasks.filter(t => !t.completed).length}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Completed</span>
                                    <span className="font-semibold text-green-600">{completedTasks}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Time Required</span>
                                    <span className="font-semibold text-amber-600">
                                        {Math.floor(totalTime / 60)}h {totalTime % 60}m
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                            <div className="space-y-2">
                                {(['work', 'personal', 'health', 'learning', 'other'] as const).map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(selectedCategory === category ? 'all' : category)}
                                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${selectedCategory === category
                                                ? 'bg-green-50 border border-green-200'
                                                : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="text-lg">{getCategoryIcon(category)}</span>
                                            <span className="capitalize text-gray-700">{category}</span>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                                            {categoryCounts[category]}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setActiveFilter('all')}
                                    className={`w-full text-left p-3 rounded-xl transition-all ${activeFilter === 'all' ? 'bg-green-50 border border-green-200' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    📋 All Tasks
                                </button>
                                <button
                                    onClick={() => setActiveFilter('active')}
                                    className={`w-full text-left p-3 rounded-xl transition-all ${activeFilter === 'active' ? 'bg-green-50 border border-green-200' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    ⏳ Active
                                </button>
                                <button
                                    onClick={() => setActiveFilter('completed')}
                                    className={`w-full text-left p-3 rounded-xl transition-all ${activeFilter === 'completed' ? 'bg-green-50 border border-green-200' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    ✅ Completed
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Add Task Card */}
                        {showAddForm ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 mb-6">
                                <h3 className="font-semibold text-gray-900 mb-4">
                                    {editingTask ? 'Edit Task' : 'Add New Task'}
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Task title..."
                                            value={newTask.title}
                                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            placeholder="Description (optional)"
                                            value={newTask.description}
                                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                            rows={3}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                            <select
                                                value={newTask.priority}
                                                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            >
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                            <select
                                                value={newTask.category}
                                                onChange={(e) => setNewTask({ ...newTask, category: e.target.value as Task['category'] })}
                                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            >
                                                <option value="work">Work</option>
                                                <option value="personal">Personal</option>
                                                <option value="health">Health</option>
                                                <option value="learning">Learning</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Time (minutes)
                                            </label>
                                            <input
                                                type="number"
                                                value={newTask.timeEstimate}
                                                onChange={(e) => setNewTask({ ...newTask, timeEstimate: parseInt(e.target.value) || 0 })}
                                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                        <input
                                            type="date"
                                            value={newTask.dueDate}
                                            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={editingTask ? saveEdit : addTask}
                                            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                                        >
                                            <Check className="w-5 h-5 mr-2" />
                                            {editingTask ? 'Save Changes' : 'Add Task'}
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="w-full bg-white border-2 border-dashed border-green-300 rounded-2xl p-8 text-center hover:bg-green-50 transition-all mb-6 group"
                            >
                                <Plus className="w-8 h-8 text-green-400 mx-auto mb-2 group-hover:text-green-600" />
                                <div className="text-green-600 font-semibold">Add New Task</div>
                                <div className="text-green-400 text-sm">Click to plan your next activity</div>
                            </button>
                        )}

                        {/* Tasks List */}
                        <div className="space-y-4">
                            {getFilteredTasks().length === 0 ? (
                                <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-12 text-center">
                                    <div className="text-6xl mb-4">☕</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks found</h3>
                                    <p className="text-gray-600">
                                        {tasks.length === 0
                                            ? "Get started by adding your first task!"
                                            : "Try changing your filters to see more tasks."}
                                    </p>
                                </div>
                            ) : (
                                getFilteredTasks().map(task => (
                                    <div
                                        key={task.id}
                                        className={`bg-white rounded-2xl shadow-sm border-l-4 ${getPriorityColor(task.priority)} border border-gray-100 p-6 transition-all hover:shadow-md ${task.completed ? 'opacity-75' : ''
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-4 flex-1">
                                                <button
                                                    onClick={() => toggleComplete(task.id)}
                                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${task.completed
                                                            ? 'bg-green-500 border-green-500 text-white'
                                                            : 'border-gray-300 hover:border-green-500'
                                                        }`}
                                                >
                                                    {task.completed && <Check className="w-4 h-4" />}
                                                </button>
                                                <div className="flex-1">
                                                    <h3 className={`font-semibold text-gray-900 ${task.completed ? 'line-through' : ''}`}>
                                                        {task.title}
                                                    </h3>
                                                    {task.description && (
                                                        <p className="text-gray-600 mt-2 text-sm">{task.description}</p>
                                                    )}
                                                    <div className="flex items-center space-x-4 mt-3">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
                                                            {getCategoryIcon(task.category)} {task.category}
                                                        </span>
                                                        <span className="flex items-center text-gray-500 text-sm">
                                                            <Clock className="w-4 h-4 mr-1" />
                                                            {task.timeEstimate}m
                                                        </span>
                                                        {task.dueDate && (
                                                            <span className="flex items-center text-gray-500 text-sm">
                                                                <Calendar className="w-4 h-4 mr-1" />
                                                                {new Date(task.dueDate).toLocaleDateString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => startEditing(task)}
                                                    className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteTask(task.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
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
}