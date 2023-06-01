import React, { Component  } from 'react';
import './Comic.css'

import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';
export class Comic extends Component {
    static displayName = Comic.name;
    render() 
    {
        return (
            <div className="card">
            <div className="card-header">
                <img src="https://gramener.com/comicgen/v1/comic?name=dee&angle=side&emotion=angry&pose=explaining&box=&boxcolor=%23000000&boxgap=&mirror=" alt="Profile" className="profile-image" />
                <div className="profile-info">
                <h3>John Doe</h3>
                <p>Posted on May 10, 2023</p>
                </div>
            </div>
            <div className="card-content">
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                fringilla velit a enim rutrum, nec efficitur mauris ultricies.
                </p>
            </div>
            <div className="card-actions">
                <button className="card-button">
                <FaThumbsUp className="icon" />
                Like
                </button>
                <button className="card-button">
                <FaComment className="icon" />
                indic
                </button>
                <button className="card-button">
                <FaShare className="icon" />
                Share
                </button>
            </div>
            </div>
        );
    };
}

