import React, { Component, useEffect  } from 'react';
import './AIChat.css'



export class AIChat extends Component {
    static displayName = AIChat.name;
    
    constructor(props) {
      super(props);
      this.state = { message:'', value: '', previousChat:[] , currentTitle:'' };
      this.getMessage = this.getMessage.bind(this);
    }
    updatePreviousChat() {
      //console.log(this.state.currentTitle, this.state.value, this.state.message);
      
      if (!this.state.currentTitle && this.state.value && this.state.message) {
        this.setState({ currentTitle: this.state.value });
      }
      
      if (this.state.currentTitle && this.state.value && this.state.message) {
        const newChat = [
          ...this.state.previousChat,
          {
            title: this.state.currentTitle,
            role: "user",
            content: this.state.value
          },
          {
            title: this.state.currentTitle,
            role: "assistant",
            content: this.state.message
          }
        ];
    
        this.setState({ previousChat: newChat });
      }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {
      //this.updatePreviousChat();
      // console.log("prevSate",prevState.currentTitle, prevState.value, prevState.message);
      // console.log("currentState",this.state.currentTitle, this.state.value, this.state.message);
      if (
        prevState.currentTitle !== this.state.currentTitle ||
        prevState.value !== this.state.value ||
        prevState.message !== this.state.message
      ) {
        if (!this.state.currentTitle && this.state.value && this.state.message) {
          this.setState((prevState) => ({ currentTitle: prevState.value }));
        }
        if (this.state.currentTitle && this.state.value && this.state.message) {
          this.setState((prevState) => ({
            previousChat: [
              ...prevState.previousChat,
              {
                title: prevState.currentTitle,
                role: 'user',
                content: prevState.value,
              },
              {
                title: prevState.currentTitle,
                role: 'assistant',
                content: prevState.message,
              },
            ],
          }));
        }
      }
    }

    createNewChat(){
      this.setState({message: ''})
      this.setState({value: ''})
      this.setState({currentTitle: ''})
    }

    async saveChat()
    {
        try {
          const response = await fetch('savechat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.previousChat),
          });
      
          if (response.ok) {
            console.log('Chat state saved successfully');
          } else {
            console.error('Failed to save chat state:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
    }
    
    fecthChat(){
      fetch('savechat')
      .then(response => response.json())
      .then(data => {
          // Assuming the response data is an array of chat messages
          this.setState({ previousChat: data });
      })
      .catch(error => {
          // Handle error
          console.error('Error:', error);
      });
    }
    handleClick(uniqueTitle){
      this.setState({currentTitle: uniqueTitle})
      this.setState({message: ''})
      this.setState({value: ''})
    }
    async getMessage() {
      try {
        const response = await fetch('chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            inputs: this.state.value
          })
        });
        if (response.ok) {
          const data = await response.json();
          // Assuming the translation result is stored in the "translatedText" property of the response
          //console.log(data.output);
          this.setState({
            message: data.output
          });
          
        } else {
          // Handle error response
          console.error('Translation failed:', response.statusText);
        }
      } catch (error) {
        // Handle network error
        console.error('Error:', error);
      }
    };

    render() {
        //console.log(this.state.previousChat);
        const currentChat = this.state.previousChat.filter(prevChat => prevChat.title === this.state.currentTitle);
        //console.log("currentChat",currentChat)
        const uniqueTitles =Array.from(new Set(this.state.previousChat.map(prevChat => prevChat.title)))
        //console.log("uniqueTitles",uniqueTitles)
        return (
            <div className='chat-all chat-app'>
            <section className='chat-side-bar'>
                {this.state.previousChat.length === 0 && <button className='chat-btn' onClick={() => this.fecthChat()}>Fetch Chat</button>}
                <button className='chat-btn' onClick={() => this.createNewChat()}>+ New Chat</button>
                {this.state.previousChat.length > 0 && <button className='chat-btn' onClick={() => this.saveChat()}>Save Chat</button>}
                <ul className='chat-history'>
                  {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => this.handleClick(uniqueTitle)}>{uniqueTitle}</li>) }
                </ul>
                <nav>
                    <p>Made by Rajesh</p>
                </nav>
            </section>
            <section className='chat-main'>
                {!this.state.currentTitle && <h1 className='chat-h1'>Rajesh ChatGPT</h1>}
                <ul className='chat-feed'>
                {currentChat?.map((chatMessage, index) => <li key={index}>
                  <p className='chat-feed-role'>{chatMessage.role}</p>
                  <p>{chatMessage.content}</p>
                </li>)}
                </ul>
                <div className='chat-bottom-section'>
                    <div className='chat-input-container'>
                        <input value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} className='chat-input'></input>
                        <div id="submit" onClick={this.getMessage}>➢</div>
                    </div>
                    <p className="chat-info">Open Assistant - This is the 4th iteration English supervised-fine-tuning (SFT) model of the Open-Assistant project. 
            </p>
                </div>

            </section>
            </div>
        );
    }

   

}