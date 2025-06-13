import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import './CometChat.css';

const CometChatApp: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<CometChat.User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await CometChat.getLoggedinUser();
        if (!currentUser) {
          navigate('/login');
        } else {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error checking user:', error);
        navigate('/login');
      }
    };

    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await CometChat.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cometchat-container">
      <div className="cometchat-header">
        <h1>CometChat</h1>
        <div className="user-info">
          <span>Welcome, {user.getName()}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
      <div className="cometchat-content">
        {/* Add your chat components here */}
        <div className="chat-messages">
          <h2>Messages</h2>
          {/* Message list will go here */}
        </div>
      </div>
    </div>
  );
};

export default CometChatApp; 