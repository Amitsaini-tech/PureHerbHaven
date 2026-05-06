import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth, googleProvider, microsoftProvider } from '../firebase';

const ADMIN_EMAILS = [
    'sainiamit3464@gmail.com',
    'testadmin_jetski@example.com'
];

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const nameParts = (currentUser.displayName || currentUser.email.split('@')[0]).split(' ');
                const initials = nameParts.length > 1 
                    ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
                    : `${nameParts[0][0]}`.toUpperCase();
                
                setUser({
                    uid: currentUser.uid,
                    name: currentUser.displayName || currentUser.email.split('@')[0],
                    email: currentUser.email,
                    initials: initials,
                    photoURL: currentUser.photoURL,
                    isAdmin: ADMIN_EMAILS.includes(currentUser.email)
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signup = async (email, password, name) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        return result;
    };

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const loginWithMicrosoft = () => {
        return signInWithPopup(auth, microsoftProvider);
    };

    const logout = () => {
        return signOut(auth);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            signup,
            loginWithGoogle,
            loginWithMicrosoft,
            logout,
            loading
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
