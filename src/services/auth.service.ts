import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';

import {
    AngularFirestore,
    AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { SweelAlertService } from './sweetAlert';
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { initializeApp } from '@angular/fire/app';
import DB, { environment } from 'src/environment/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userData: any;
    loading: boolean = false;
    _sweel: SweelAlertService = new SweelAlertService();
    data: any;

    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone,
        public spinnerService: SpinnerService
    ) {

        this.afAuth.authState.subscribe((user) => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user')!);
            } else {
                localStorage.setItem('user', 'null');
                JSON.parse(localStorage.getItem('user')!);
            }
        });
    }

    getData(collectionRef: any) {
        getDoc(collectionRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    this.data = docSnap.data();
                } else {
                    console.log("El documento no existe.");
                }
            })
            .catch((error) => {
                console.error("Error al obtener el documento:", error);
            });
    }

    signIn(email: string, password: string) {
        this.spinnerService.loading = true;
        return this.afAuth
            .signInWithEmailAndPassword(email, password).then((result) => {
                this.setUserData(result.user);

                const nombreColeccion = "users";

                const q = doc(DB, nombreColeccion, result.user?.uid +'');

                this.getData(q);

                this.afAuth.authState.subscribe((user) => {
                    if (user) {
                        this.spinnerService.loading = false;
                        this.router.navigate(['home']);
                    }
                });
            })
            .catch((error) => {
                this.spinnerService.loading = false;
                this._sweel.alertWarning("Atención", "El correo electrónico y/o la contraseña son incorrectas. Favor intentalo de nuevo.");
            });

    }

    signUp(email: string, password: string, name: string, dateOfBirth: string, phoneNumber: string) {
        this.spinnerService.loading = true;
        return this.afAuth
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                const user = result.user;
                let uid = user?.uid;
                this.afs.collection('users').doc(user?.uid).set({
                    email,
                    password,
                    name,
                    dateOfBirth,
                    phoneNumber,
                    uid
                });

                if (user) {
                    this.router.navigate(['sign-in']);
                }
                this.spinnerService.loading = false;
            })
            .catch((error) => {
                this.spinnerService.loading = false;
                this._sweel.alertWarning("Atención", "El formulario presenta errores, está incompleto o el usuario ya existe.");
            });
    }

    setUserData(user: any) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${user.uid}`
        );

        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
        };
        return userRef.set(userData, {
            merge: true,
        });
    }

    logOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['sign-in']);
        });
    }
}
