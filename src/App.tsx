import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import './App.css';

const App: React.FC = () => {
  React.useEffect(() => {
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
    });

    const db = firebase.firestore();

    db.collection("comments").add({
      name: "Ada",
      comment: "Lovelace",
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

    db.collection('comments').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });
  });

  function handleClick() {
    console.log('aaa');
  }

  return (
    <div className="App">
      <h1>仁保島村 管理画面</h1>

      <h2>来館者の声登録</h2>
      <div>
        <input type="text" placeholder="来館者名" />
      </div>
      <div>
        <textarea placeholder="来館者の声"></textarea>
      </div>
      <div>
        <button onClick={() => handleClick()}>登録</button>
      </div>
    </div>
  );
}

export default App;
