import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth, db, googleProvider, microsoftProvider } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

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
                const displayName = (currentUser.displayName || currentUser.email.split('@')[0] || '').trim();
                const nameParts = displayName.split(/\s+/).filter(Boolean);
                let initials = 'U';
                if (nameParts.length > 0) {
                    initials = nameParts.length > 1 
                        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
                        : `${nameParts[0][0]}`.toUpperCase();
                }
                
                const checkUserRole = async () => {
                    let role = 'buyer';
                    try {
                        const userDocRef = doc(db, 'users', currentUser.uid);
                        const userDocSnap = await getDoc(userDocRef);
                        if (userDocSnap.exists()) {
                            role = userDocSnap.data().role || 'buyer';
                        }
                    } catch (error) {
                        console.error('Error fetching user role:', error);
                    }

                    setUser({
                        uid: currentUser.uid,
                        name: currentUser.displayName || currentUser.email.split('@')[0],
                        email: currentUser.email,
                        initials: initials,
                        photoURL: currentUser.photoURL,
                        isAdmin: ADMIN_EMAILS.includes(currentUser.email),
                        isSeller: role === 'seller',
                        isDelivery: role === 'delivery',
                        role: role
                    });
                    setLoading(false);
                };
                checkUserRole();
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signup = async (email, password, name, role = 'buyer') => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        
        // Save user role to Firestore
        await setDoc(doc(db, 'users', result.user.uid), {
            uid: result.user.uid,
            name,
            email,
            role,
            createdAt: new Date().toISOString()
        });
        
        return result;
    };

    const handleOAuthLogin = async (provider) => {
        const result = await signInWithPopup(auth, provider);
        const userDocRef = doc(db, 'users', result.user.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        // If user doesn't exist in Firestore, create a default buyer record
        if (!userDocSnap.exists()) {
            await setDoc(userDocRef, {
                uid: result.user.uid,
                name: result.user.displayName || result.user.email.split('@')[0],
                email: result.user.email,
                role: 'buyer',
                createdAt: new Date().toISOString()
            });
        }
        return result;
    };

    const loginWithGoogle = () => {
        return handleOAuthLogin(googleProvider);
    };

    const loginWithMicrosoft = () => {
        return handleOAuthLogin(microsoftProvider);
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
