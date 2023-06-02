import React, { useState } from 'react';
import './TopPanel.css'

const TopPanel = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const handleLanguageDrop = (e) => {
      e.preventDefault();
      const language = e.dataTransfer.getData('text');
      setSelectedLanguage(language);
    };
  
    const handleLanguageDragOver = (e) => {
      e.preventDefault();
    };
  
    const handleLanguageDragStart = (e, language) => {
      e.dataTransfer.setData('text', language);
    };
  return (
    <div className="top-panel">
    <div className="language-list">
    <div
          className={`language-item ${selectedLanguage === 'Malayalam' ? 'selected-language' : ''}`}
          draggable
          onDragStart={(e) => handleLanguageDragStart(e, 'Malayalam')}
        >
          Malayalam
        </div>
    <div
          className={`language-item ${selectedLanguage === 'Bengali' ? 'selected-language' : ''}`}
          draggable
          onDragStart={(e) => handleLanguageDragStart(e, 'Bengali')}
        >
          Bengali
        </div>
        <div
          className={`language-item ${selectedLanguage === 'Gujarati' ? 'selected-language' : ''}`}
          draggable
          onDragStart={(e) => handleLanguageDragStart(e, 'Gujarati')}
        >
          Gujarati
        </div>
    </div>
  </div>

  );
};

export default TopPanel;
