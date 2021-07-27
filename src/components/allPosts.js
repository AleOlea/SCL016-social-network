import { isLiked, likesFun } from './likes.js';

// All Posts function, returns html element div with all posts
export const allPosts = () => {
  const allPostDiv = document.createElement('div');
  allPostDiv.id = 'allPosts-div';
  // Initialize firebase firestore
  const db = firebase.firestore();
  // Get all documents in a collection https://firebase.google.com/docs/firestore/query-data/get-data
  db.collection('allPosts').get().then((querySnapshot) => {
    console.log(querySnapshot);
    // For each post create a html element (li, div and button)
    querySnapshot.forEach((doc) => {
      const posts = doc.data();
      const allPostsLi = document.createElement('li');
      allPostsLi.id = 'allPosts-li';

      const homePostsContainer = `<div>${posts.tittle}</div><div>${posts.content}</div>`;
      allPostsLi.innerHTML += homePostsContainer;
      allPostDiv.appendChild(allPostsLi);

      // Create a button
      const likeButtonEl = document.createElement('button');
      likeButtonEl.textContent = '❤';
      likeButtonEl.id = 'like-button';
      // Post that Im going to update
      const postToUpdate = db.collection('allPosts').doc(doc.id);
      const alreadyLiked = isLiked(doc.data());
      likeButtonEl.addEventListener('click', likesFun(postToUpdate, alreadyLiked));
      allPostsLi.appendChild(likeButtonEl);
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
  });

  // Return  div with all post
  return allPostDiv;
};
