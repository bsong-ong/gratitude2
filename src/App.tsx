import React, { useState, useContext } from 'react';
import { Plus, Heart, Calendar, Globe } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import enTranslations from './translations/en.json';
import thTranslations from './translations/th.json';

interface GratitudeEntry {
  id: number;
  title: string;
  description: string;
  date: string;
}

const AppContent: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const translations = language === 'en' ? enTranslations : thTranslations;
  
  const [entries, setEntries] = useState<GratitudeEntry[]>([
    {
      id: 1,
      title: language === 'en' ? "Morning Sunshine" : "แสงแดดยามเช้า",
      description: language === 'en' 
        ? "The way the sunlight filtered through the trees this morning was pure magic." 
        : "วิธีที่แสงแดดส่องผ่านต้นไม้ในตอนเช้านี้เป็นสิ่งมหัศจรรย์ที่แท้จริง",
      date: "2023-11-15"
    },
    {
      id: 2,
      title: language === 'en' ? "Unexpected Kindness" : "น้ำใจที่ไม่คาดคิด",
      description: language === 'en'
        ? "The barista remembered my usual order without asking. Small but meaningful connection."
        : "บาริสต้าจำออเดอร์ปกติของฉันได้โดยไม่ต้องถาม น้ำใจเล็กๆ ที่มีความหมายมาก",
      date: "2023-11-14"
    }
  ]);
  
  const [newEntry, setNewEntry] = useState({ title: '', description: '' });
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEntry.title.trim() && newEntry.description.trim()) {
      const entry = {
        ...newEntry,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0]
      };
      setEntries([entry, ...entries]);
      setNewEntry({ title: '', description: '' });
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm hover:bg-indigo-200 transition-colors"
            >
              <Globe size={16} /> {language === 'en' ? 'English' : 'ไทย'}
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-2 flex items-center justify-center gap-2">
            <Heart className="text-red-400" size={32} /> {translations.appTitle}
          </h1>
          <p className="text-lg text-indigo-600">{translations.appSubtitle}</p>
        </header>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} /> {translations.addEntry}
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                {translations.titleLabel}
              </label>
              <input
                type="text"
                id="title"
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={translations.titlePlaceholder}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                {translations.descriptionLabel}
              </label>
              <textarea
                id="description"
                value={newEntry.description}
                onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={translations.descriptionPlaceholder}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {translations.cancel}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                {translations.saveEntry}
              </button>
            </div>
          </form>
        )}

        <div className="space-y-6">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-indigo-700">{entry.title}</h2>
                <div className="flex items-center text-gray-500">
                  <Calendar size={16} className="mr-1" />
                  <span className="text-sm">{entry.date}</span>
                </div>
              </div>
              <p className="mt-3 text-gray-600">{entry.description}</p>
              <div className="mt-4 flex justify-end">
                <button className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                  <Heart size={16} className="fill-current" /> 12
                </button>
              </div>
            </div>
          ))}
        </div>

        {entries.length === 0 && !isAdding && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-gray-500 mb-4">{translations.noEntries}</p>
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors mx-auto"
            >
              <Plus size={20} /> {translations.addFirstEntry}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
