// src/pages/NotesPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // Import toast
import api from '../api';

function NotesPage() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const [editingNote, setEditingNote] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await api.get('/notes');
                setNotes(response.data);
            } catch (error) {
                console.error('Failed to fetch notes', error);
                toast.error('Failed to fetch your notes.');
            }
        };
        fetchNotes();
    }, []);

    const handleCreateNote = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/notes', { title, content });
            setNotes([...notes, response.data]);
            setTitle('');
            setContent('');
            toast.success('Note created successfully!'); // Success toast
        } catch (error) {
            console.error('Failed to create note', error);
            toast.error('Failed to create note.'); // Error toast
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            await api.delete(`/notes/${noteId}`);
            setNotes(notes.filter((note) => note._id !== noteId));
            toast.success('Note deleted!'); // Success toast
        } catch (error) {
            console.error('Failed to delete note', error);
            toast.error('Failed to delete note.'); // Error toast
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleEditClick = (note) => {
        setEditingNote(note);
        setEditedTitle(note.title);
        setEditedContent(note.content);
    };

    const handleUpdateNote = async (e) => {
        e.preventDefault();
        if (!editingNote) return;

        try {
            const response = await api.put(`/notes/${editingNote._id}`, {
                title: editedTitle,
                content: editedContent,
            });
            setNotes(notes.map((note) => (note._id === editingNote._id ? response.data : note)));
            setEditingNote(null);
            toast.success('Note updated successfully!'); // Success toast
        } catch (error) {
            console.error('Failed to update note', error);
            toast.error('Failed to update note.'); // Error toast
        }
    };

    const handleCancelEdit = () => {
        setEditingNote(null);
    };

    // The JSX for the return statement remains the same.
    // Copy the styled JSX from the previous step here.
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Your Notes</h2>
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow"
                    >
                        Logout
                    </button>
                </div>

                <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Add a New Note</h3>
                    <form onSubmit={handleCreateNote} className="space-y-4">
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required rows="4" className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                        <button type="submit" className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Note</button>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note) => (
                        <div key={note._id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
                            {editingNote && editingNote._id === note._id ? (
                                <form onSubmit={handleUpdateNote} className="flex flex-col h-full">
                                    <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} required className="mb-2 px-2 py-1 text-lg font-bold border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                    <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} required className="flex-grow mb-4 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    <div className="space-x-2">
                                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm">Save</button>
                                        <button type="button" onClick={handleCancelEdit} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded text-sm">Cancel</button>
                                    </div>
                                </form>
                            ) : (
                                <div className="flex flex-col h-full">
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{note.title}</h3>
                                        <p className="text-gray-600 whitespace-pre-wrap">{note.content}</p>
                                    </div>
                                    <div className="mt-4 space-x-2">
                                        <button onClick={() => handleEditClick(note)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm">Edit</button>
                                        <button onClick={() => handleDeleteNote(note._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm">Delete</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NotesPage;