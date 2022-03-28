// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyA-ECAo2IzfT30j51vu4I5vxa1IrZ4QMu0',
	authDomain: 'vue-crazyfinds.firebaseapp.com',
	databaseURL: 'https://vue-crazyfinds-default-rtdb.firebaseio.com',
	projectId: 'vue-crazyfinds',
	storageBucket: 'vue-crazyfinds.appspot.com',
	messagingSenderId: '782007552940',
	appId: '1:782007552940:web:f06c8c6e20595952708809',
	measurementId: 'G-B4E62WEYX5',
}

// Initialize Firebase
export const db = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
