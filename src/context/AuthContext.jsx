import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from "../firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Busca rol en 'worker' primero
                const workerSnap = await getDoc(doc(db, "worker", firebaseUser.uid));
                if (workerSnap.exists()) {
                    setUser({ uid: firebaseUser.uid, ...workerSnap.data() });
                    setRole("worker");
                } else {
                    // Si no, busca en 'client'
                    const clientSnap = await getDoc(doc(db, "client", firebaseUser.uid));
                    if (clientSnap.exists()) {
                        setUser({ uid: firebaseUser.uid, ...clientSnap.data() });
                        setRole("client");
                    }
                }
            } else {
                setUser(null);
                setRole(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, role, loading, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};