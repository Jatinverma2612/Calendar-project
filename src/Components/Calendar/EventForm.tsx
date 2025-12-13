import React, { useState } from 'react';
import type { CalendarEvent } from '../../types';


interface EventFormProps {
  selectedDate: Date | null;

  eventToEdit?: CalendarEvent | null; 
  onSubmit: (eventData: Omit<CalendarEvent, 'id'>) => void;
  onDelete?: (id: string) => void;
  onCancel: () => void;
}

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export const EventForm: React.FC<EventFormProps> = ({ 
  selectedDate, 
  eventToEdit, 
  onSubmit, 
  onDelete,
  onCancel 
}) => {

  const [title, setTitle] = useState(eventToEdit?.title || '');
  const [description, setDescription] = useState(eventToEdit?.description || '');
  const [selectedColor, setSelectedColor] = useState(eventToEdit?.color || COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;


    const dateToUse = eventToEdit?.startDate || selectedDate;
    if (!dateToUse) return;

    onSubmit({
      title,
      description,
      startDate: dateToUse,
      endDate: dateToUse,
      color: selectedColor,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Event Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          autoFocus
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">Color</label>
        <div className="flex gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${
                selectedColor === color ? 'ring-2 ring-offset-2 ring-neutral-400 scale-110' : ''
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-2 border-t border-neutral-100 mt-4">
        {eventToEdit && onDelete ? (
          <button
            type="button"
            onClick={() => onDelete(eventToEdit.id)}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
          >
            Delete
          </button>
        ) : (
          <div></div>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-neutral-600 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
          >
            {eventToEdit ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </form>
  );
};