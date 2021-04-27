import { getCurrentUser } from '../data/currentUser.js';

export const postProfile = () => {
  const profilePostDiv = document.createElement('div');
  profilePostDiv.id = 'profilePosts-div';
  const db = firebase.firestore();
  const userProfile = getCurrentUser().email;

  db.collection('allPosts').where('user', '==', userProfile).get().then((querySnapshot) => {
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      const profilePosts = doc.data();
      console.log(profilePosts);

      const postContainer = document.createElement('div');
      postContainer.id = 'post-container';

      const profilePostsLi = document.createElement('li');
      profilePostsLi.id = 'profile-post-li';

      const profilePostsContainer = `<div id= "title-post-${doc.id}">${profilePosts.tittle}</div><div id= "content-post-${doc.id}">${profilePosts.content}</div>`;
      profilePostsLi.innerHTML += profilePostsContainer;
      postContainer.appendChild(profilePostsLi);

      profilePostDiv.appendChild(postContainer);
      console.log(doc.id, '=>', doc.data());
      // Changes https://firebase.google.com/docs/firestore/query-data/listen
      db.collection('allPosts').doc(doc.id)
        .onSnapshot((newPost) => {
          console.log(`fue actualizado ${doc.id}`, newPost.data());
          const changedTittle = document.getElementById(`title-post-${doc.id}`);
          const changedContent = document.getElementById(`content-post-${doc.id}`);
          changedTittle.textContent = newPost.data().tittle;
          changedContent.textContent = newPost.data().content;
        });

      // Editing a post https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es-419
      const editionMenu = document.createElement('ul');
      editionMenu.id = 'edition-menu';
      const editLi = document.createElement('li');
      editLi.id = 'edit-li';
      // editLi.textContent = 'edit';
      editionMenu.appendChild(editLi);

      const editModal = () => {
        console.log('me estoy haciendo click');

        const modalEditContent = document.createElement('div');
        modalEditContent.id = 'modal-edit-content';

        const spanCloseModal = document.createElement('span');
        spanCloseModal.id = 'span-close-modal';
        spanCloseModal.textContent = 'X';
        spanCloseModal.addEventListener('click', () => {
          modalEditContent.style.display = 'none';
        });

        const pEditTitle = document.createElement('p');
        pEditTitle.id = 'p-edit-title';
        pEditTitle.textContent = 'Titulo';

        const titleEdition = document.createElement('textarea');
        titleEdition.id = 'title-edit';
        titleEdition.textContent = profilePosts.tittle;

        const pEditContent = document.createElement('p');
        pEditContent.id = 'p-edit-content';
        pEditContent.textContent = 'Contenido';

        const contentEdition = document.createElement('textarea');
        contentEdition.id = 'edit-content';
        contentEdition.textContent = profilePosts.content;
        const editingMyPosts = () => {
          const editMyPost = db.collection('allPosts').doc(doc.id);
          return editMyPost.update({
            tittle: titleEdition.value,
            content: contentEdition.value,
          })
            .then(() => {
              console.log('Document successfully updated!');
              modalEditContent.style.display = 'none';
            })
            .catch((error) => {
            // The document probably doesn't exist.
              console.error('Error updating document: ', error);
            });
        };
        const buttonSubmitEdition = document.createElement('button');
        buttonSubmitEdition.id = 'button-submit-edittion';
        buttonSubmitEdition.textContent = 'Guardar';
        buttonSubmitEdition.addEventListener('click', editingMyPosts);

        modalEditContent.appendChild(buttonSubmitEdition);
        modalEditContent.appendChild(spanCloseModal);
        modalEditContent.appendChild(pEditTitle);
        modalEditContent.appendChild(titleEdition);
        modalEditContent.appendChild(pEditContent);
        modalEditContent.appendChild(contentEdition);
        profilePostDiv.appendChild(modalEditContent);

        modalEditContent.display = 'initial';
        return modalEditContent;
      };
      editLi.addEventListener('click', editModal);

      // Delete a Post
      const deleteLi = document.createElement('li');
      deleteLi.id = 'delete-li';
      editionMenu.appendChild(deleteLi);
      postContainer.appendChild(editionMenu);

      const deleteMyPost = () => {
        db.collection('allPosts').doc(doc.id).delete().then(() => {
          profilePostDiv.removeChild(postContainer);
          console.log('Document successfully deleted!');
        })
          .catch((error) => {
            console.error('Error removing document: ', error);
          });
      };
      deleteLi.addEventListener('click', deleteMyPost);
    });
  });
  return profilePostDiv;
};
