import React, { useState } from 'react';
import './TopPanel.css'

const TopPanel = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('');

 
    const handleLanguageDragStart = (e, language) => {
      setSelectedLanguage(language);
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
        <div
          className={`language-item ${selectedLanguage === 'Hindi' ? 'selected-language' : ''}`}
          draggable
          onDragStart={(e) => handleLanguageDragStart(e, 'Hindi')}
        >
          Hindi
        </div>
        <div
          className={`language-item ${selectedLanguage === 'Kannada' ? 'selected-language' : ''}`}
          draggable
          onDragStart={(e) => handleLanguageDragStart(e, 'Kannada')}
        >
          Kannada
        </div>
        <div
          className={`language-item ${selectedLanguage === 'Marathi' ? 'selected-language' : ''}`}
          draggable
          onDragStart={(e) => handleLanguageDragStart(e, 'Marathi')}
        >
          Marathi
        </div>
        <div
          className={`language-item ${selectedLanguage === 'Odia' ? 'selected-language' : ''}`}
          draggable
          onDragStart={(e) => handleLanguageDragStart(e, 'Odia')}
        >
          Odia
        </div>
        <div
          className={`language-item ${selectedLanguage === 'Punjabi' ? 'selected-language' : ''}`}
          draggable
          onDragStart={(e) => handleLanguageDragStart(e, 'Punjabi')}
        >
          Punjabi
        </div>
        <div
          className={`language-item ${selectedLanguage === 'Tamil' ? 'selected-language' : ''}`}
          draggable
          onDragStart={(e) => handleLanguageDragStart(e, 'Tamil')}
        >
          Tamil
        </div>
        <div
          className={`language-item ${selectedLanguage === 'Telugu' ? 'selected-language' : ''}`}
          draggable
          onDragStart={(e) => handleLanguageDragStart(e, 'Telugu')}
        >
          Telugu
        </div>

    </div>
  </div>

  );
};

export default TopPanel;
