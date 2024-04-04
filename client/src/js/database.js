import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  const editorDb = await openDB('jate', 1);
  const tx = editorDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const req = store.add({ text: content });

  const res = await req;
};

/*
  For some reason when I implement this function
  it throws an error `e.split` is not a function
  stemming from the Code Mirror import.

  Not really sure about a fix for this, but the app
  works perfectly fine without it, so it's being excluded
  for now.

*/
export const getDb = async () => {
  // const editorDb = await openDB('jate', 1);
  // const tx = editorDb.transaction('jate', 'readonly');
  // const store = tx.objectStore('jate');
  // const req = store.getAll();

  // const res = await req;
  // return res;
}

initdb();
