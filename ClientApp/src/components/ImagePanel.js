import React from 'react';
import './ImagePanel.css'

const ImagePanel = () => {
  const imageList = [
    'https://gramener.com/comicgen/v1/comic?name=dee&angle=side&emotion=angry&pose=explaining&box=&boxcolor=%23000000&boxgap=&mirror=',
    'https://gramener.com/comicgen/v1/comic?name=aavatar&gender=female&character=bindi&facestyle=sketchy&emotion=happy&attire=bodycon&pose=handonhip&face=%23eeddc5&shirt=%23ffcc66&pant=%233a4e5c&box=&boxcolor=%23000000&boxgap=&mirror=',
    'https://gramener.com/comicgen/v1/comic?name=aryan&emotion=laugh&pose=handsinpocket&shirt=%23ffcc66&face=%23eeddc5&box=&boxcolor=%23000000&boxgap=&mirror=',
    // Add more image URLs here
  ];

  const handleDragStart = (event, imageSrc) => {
    event.dataTransfer.setData('text/plain', imageSrc);
  };

  return (
    <section className="image-panel">
     <table className="image-table">
        <tbody>
          {imageList.map((imageUrl, index) => (
            <tr key={index}>
              <td>
                <img
                  id={`Image ${index + 1}`}
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  draggable="true"
                  onDragStart={(event) => handleDragStart(event, imageUrl)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="image-list">
        {imageList.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Image ${index + 1}`}
          draggable="true"
          onDragStart={(event) => handleDragStart(event, {imageUrl})}
           />
        ))}
      </div> */}
    </section>
  );
};

export default ImagePanel;
