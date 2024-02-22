import React from 'react';
import InteractiveCard from '../UI/UserCard';

const dummyUserData = [
  { id: 1, username: 'User1', avatar: 'url_to_avatar_1' },
  { id: 2, username: 'User2', avatar: 'url_to_avatar_2' },
  // ... more user data
];

const ChatUsersCard = ({ setRecipientId }) => {
  const handleUserClick = (userId) => {
    setRecipientId(userId);
  };

  return (
    <div className="chat-users-card">
      {dummyUserData.map((user) => (
        <div key={user.id} className="user-card" onClick={() => handleUserClick(user.id)}>
          <InteractiveCard user={user} />
        </div>
      ))}
    </div>
  );
};

export default ChatUsersCard;
