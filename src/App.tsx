import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import './App.css';

interface Message {
  name: string;
  comment: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [db, setDb] = React.useState<firebase.firestore.Firestore>();

  React.useEffect(() => {
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
    });

    setDb(firebase.firestore());
  }, []);

  // const db = firebase.firestore();
  React.useEffect(() => {
    getMessages();
  }, [db]);

  const [name, setName] = React.useState('');
  function handleNameChange(event: React.FormEvent<HTMLInputElement>) {
    setName(event.currentTarget.value);
  }

  const [comment, setComment] = React.useState('');
  function handleCommentChange(event: React.FormEvent<HTMLInputElement>) {
    setComment(event.currentTarget.value);
  }

  function handleClick() {
    if (!db) {
      return;
    }
    if (name && comment) {
      const message = {
        name,
        comment,
      };
      addMessage(message);
      getMessages();
      setName('');
      setComment('');
    }
  }

  function addMessage(message: Message) {
    if (!db) {
      return;
    }
    db.collection('comments')
      .add(message)
      .then(docRef => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  }

  function getMessages() {
    if (!db) {
      return;
    }
    db.collection('comments')
      .get()
      .then(querySnapshot => {
        let newMessages: any[] = [];
        querySnapshot.forEach(doc => {
          newMessages = [...newMessages, doc.data()];
        });

        setMessages(newMessages);
      });
  }

  return (
    <div className="App">
      <h1>React Firebase Sample</h1>

      <div>
        <input
          type="text"
          placeholder="Name"
          defaultValue={name}
          onChange={event => handleNameChange(event)}
        />
        :{' '}
        <input
          type="text"
          placeholder="Comment"
          defaultValue={comment}
          onChange={event => handleCommentChange(event)}
        />
        <button onClick={() => handleClick()}>Add</button>
      </div>

      <ul>
        {messages.map((message, index) => {
          return (
            <li key={index}>
              <p>
                {message.name}: {message.comment}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
