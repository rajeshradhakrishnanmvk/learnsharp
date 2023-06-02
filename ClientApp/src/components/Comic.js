import React, { Component  } from 'react';
import './Comic.css'
import ImagePanel from './ImagePanel';
import TopPanel from './TopPanel';

import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';
export class Comic extends Component {
    static displayName = Comic.name;

    constructor(props) {
        super(props);
        this.state = { comic_chats: [], loading: true, assistantChats: [] }
    }
    
    componentDidMount() {
        this.populateComicChats();
    }

    static renderComicStrips(that_comic){
    // var assistantChat = that_comic.state.comic_chats
    //                   .filter(prevChat => prevChat.role === 'assistant')
    //                   .map(chat => ({
    //                     ...chat,
    //                     imageSrc: "https://gramener.com/comicgen/v1/comic?name=dee&angle=side&emotion=angry&pose=explaining&box=&boxcolor=%23000000&boxgap=&mirror=" 
    //                   }));
    
    //that_comic.setState({assistantChats: assistantChat });
    
  

    const handleDragOver = (event) => {
      event.preventDefault();
    };

    const handleDrop = (event, i, index) => {
      event.preventDefault();
      const draggedImageSrc = event.dataTransfer.getData('text/plain');
      that_comic.setState(prevState => {
        console.log(prevState);
        const updatedCards = prevState.assistantChats.map((chat, cardIndex) => {
          if (cardIndex === i * 3 + index) {
            return {
              ...chat,
              imageSrc: draggedImageSrc
            };
          }
          return chat;
        });
        return { assistantChats: updatedCards };
      });
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
      var assistantChat = that_comic.state.assistantChats
      const rows = Math.ceil(assistantChat.length / 3);
      const cards = [];
        for (let i = 0; i < rows; i++) {
                const rowCards = assistantChat.slice(i * 3, i * 3 + 3);
                const row = (
                    <div className="card-row" key={i}>
                    {rowCards.map((chat, index) => (
                        <div className="card" key={index} onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, i, index)}>
                            <div className="card-header">
                                  <img src={chat.imageSrc} alt="Profile" className="profile-image" />
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
              <div className="comic-top-bar">
                <TopPanel />
              </div>
              <div className="card-table">{contents}</div>
            </section>
        </div>
        )
    }
    async populateComicChats() {
        fetch('savechat')
        .then(response => response.json())
        .then(data => {
             var assistantChat=data.filter(prevChat => prevChat.role === 'assistant')
                      .map(chat => ({
                        ...chat,
                        imageSrc: "https://gramener.com/comicgen/v1/comic?name=dee&angle=side&emotion=angry&pose=explaining&box=&boxcolor=%23000000&boxgap=&mirror=" 
                      }));
            this.setState({ comic_chats: data, loading: false, assistantChats: assistantChat });
        })
        .catch(error => {
            console.error('Error:', error);
        });

      }
}

