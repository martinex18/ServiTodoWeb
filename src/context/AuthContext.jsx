import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';

const auth = getAuth(app);
const db = getFirestore(app);

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null); // 👈 nuevo
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