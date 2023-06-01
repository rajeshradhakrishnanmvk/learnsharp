import React, { Component  } from 'react';
import './Comic.css'
import ImagePanel from './ImagePanel';

import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';
export class Comic extends Component {
    static displayName = Comic.name;

    constructor(props) {
        super(props);
        this.state = { comic_chats: [], loading: true
                      ,imageSrc: "https://gramener.com/comicgen/v1/comic?name=dee&angle=side&emotion=angry&pose=explaining&box=&boxcolor=%23000000&boxgap=&mirror="
                      }
    }
    
    componentDidMount() {
        this.populateComicChats();
    }

    static renderComicStrips(that_comic){
    var previousChat = that_comic.state.comic_chats.filter(prevChat => prevChat.role === 'assistant');
    const rows = Math.ceil(previousChat.length / 3);
    const cards = [];
    const handleDragOver = (event) => {
      event.preventDefault();
    };

    const handleDrop = (event) => {
      event.preventDefault();
      const draggedImageSrc = event.dataTransfer.getData('text/plain');
      that_comic.setState({imageSrc : draggedImageSrc});
    };
    const handleButtonClick = async (i,index,content) => {
        try {

            const response = await fetch('trans', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                text: content,
                lang: "Malayalam"
              })
            });
            if (response.ok) {
              const data = await response.json();
            
              console.log(data.output);
              const pElement = document.querySelector('#card-content-' + i + '-' + index)
              pElement.textContent = data.output
              
            } else {
              // Handle error response
              console.error('Translation failed:', response.statusText);
            }
          } catch (error) {
            // Handle network error
            console.error('Error:', error);
          }
      };
        for (let i = 0; i < rows; i++) {
                const rowCards = previousChat.slice(i * 3, i * 3 + 3);
                const row = (
                    <div className="card-row" key={i}>
                    {rowCards.map((chat, index) => (
                        <div className="card" key={index} onDragOver={handleDragOver} onDrop={handleDrop}>
                            <div className="card-header">
                                  <img src={that_comic.state.imageSrc} alt="Profile" className="profile-image" />
                                <div className="profile-info">
                                <h3>{chat.role}</h3>
                                <p>{chat.title}</p>
                                
                                </div>
                            </div>
                            <div className="card-content">
                                <p id={`card-content-${i}-${index}`}>
                                {chat.content}
                                </p>
                            </div>
                            <div className="card-actions">
                                <button className="card-button">
                                <FaThumbsUp className="icon" />
                                Like
                                </button>
                                <button className="card-button" onClick={() => handleButtonClick(i,index,chat.content)}>
                                <FaComment className="icon" />
                                indic
                                </button>
                                <button className="card-button">
                                <FaShare className="icon" />
                                Share
                                </button>
                            </div>
                        </div>
                    ))}
                    </div>
                );

            cards.push(row);

            return (cards);
            }
    }
    render() 
    {
        let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : Comic.renderComicStrips(this);

        return (
        <div className='comic-all comic-app'>
            <section className='comic-side-bar'>
            <ImagePanel />
            </section>
            <section className='comic-main'>
              <div className="card-table">{contents}</div>
            </section>
        </div>
        )
    }
    async populateComicChats() {
        fetch('savechat')
        .then(response => response.json())
        .then(data => {
            this.setState({ comic_chats: data, loading: false});
        })
        .catch(error => {
            console.error('Error:', error);
        });

      }
}

