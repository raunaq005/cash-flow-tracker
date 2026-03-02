import { db, storage } from '../config/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EXPENSES_COLLECTION = 'expenses';
const DRIVE_FOLDER_ID = process.env.REACT_APP_GOOGLE_DRIVE_FOLDER_ID;

export const addExpenseToDatabase = async (expense) => {
  try {
    const docRef = await addDoc(collection(db, EXPENSES_COLLECTION), {
      ...expense,
      createdAt: new Date(),
    });
    console.log('Expense added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

export const getExpensesFromDatabase = async () => {
  try {
    const q = query(collection(db, EXPENSES_COLLECTION));
    const querySnapshot = await getDocs(q);
    const expenses = [];
    querySnapshot.forEach((doc) => {
      expenses.push({ id: doc.id, ...doc.data() });
    });
    return expenses;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const deleteExpenseFromDatabase = async (expenseId) => {
  try {
    await deleteDoc(doc(db, EXPENSES_COLLECTION, expenseId));
    console.log('Expense deleted with ID:', expenseId);
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};

export const uploadFileToGoogleDrive = async (file, category) => {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const storagePath = `expenses/${category}/${fileName}`;
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log('File uploaded to Google Drive:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    throw error;
  }
};
