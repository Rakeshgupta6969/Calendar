import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { X, Trash2 } from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { cn } from '../lib/utils';

const colors = [
  { name: 'blue', class: 'bg-blue-500' },
  { name: 'red', class: 'bg-red-500' },
  { name: 'green', class: 'bg-emerald-500' },
  { name: 'yellow', class: 'bg-amber-500' },
  { name: 'purple', class: 'bg-purple-500' },
];

const EventModal = ({ isOpen, onClose, selectedDate, eventToEdit }) => {
  const { addEvent, updateEvent, deleteEvent } = useEvents();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    color: 'blue'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (eventToEdit) {
        setFormData({
          title: eventToEdit.title || '',
          description: eventToEdit.description || '',
          time: eventToEdit.time || '',
          color: eventToEdit.color || 'blue',
        });
      } else {
        setFormData({ title: '', description: '', time: '', color: 'blue' });
      }
      setErrors({});
    }
  }, [isOpen, eventToEdit]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const eventPayload = {
      ...formData,
      date: format(selectedDate, 'yyyy-MM-dd'),
    };

    if (eventToEdit) {
      updateEvent({ ...eventPayload, id: eventToEdit.id });
    } else {
      addEvent(eventPayload);
    }
    onClose();
  };

  const handleDelete = () => {
    if (eventToEdit) {
      deleteEvent(eventToEdit.id);
      onClose();
    }
  };

  const dateDisplay = selectedDate ? format(selectedDate, 'MMMM d, yyyy') : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md sm:p-0">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-md bg-slate-900/80 backdrop-blur-xl rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] overflow-hidden border border-white/10">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {eventToEdit ? 'Edit Event' : 'Add Event'}
            </h3>
            <p className="text-sm text-slate-400">{dateDisplay}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              autoFocus
              className={cn(
                "w-full px-3 py-2 bg-slate-950/50 border rounded-lg shadow-inner text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
                errors.title ? "border-red-500/50 focus:ring-red-500" : "border-white/10"
              )}
              placeholder="e.g., Team Meeting"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Time <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <input
                type="time"
                className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg shadow-inner text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all [color-scheme:dark]"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-300 mb-1">
                 Color Tag
               </label>
               <div className="flex items-center space-x-2 h-10">
                 {colors.map((c) => (
                   <button
                     key={c.name}
                     type="button"
                     onClick={() => setFormData({ ...formData, color: c.name })}
                     className={cn(
                       "w-6 h-6 rounded-full cursor-pointer ring-offset-slate-900 ring-offset-2 transition-all",
                       c.class,
                       formData.color === c.name ? "ring-2 ring-white/50 scale-110" : "hover:scale-110"
                     )}
                     aria-label={`Select ${c.name} color`}
                   />
                 ))}
               </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Description <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg shadow-inner text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Add some details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/5">
            {eventToEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center text-sm font-medium text-red-500 hover:text-red-400 px-3 py-2 rounded-md hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-1.5" />
                Delete
              </button>
            ) : (
              <div></div> // Spacing
            )}
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 border border-white/10 rounded-lg shadow-sm hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors"
              >
                {eventToEdit ? 'Save Changes' : 'Save Event'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
