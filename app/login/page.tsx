'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };

    checkAuth();

    // Manejar cambios en el estado de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Puedes utilizar 'event' y 'session' según tus necesidades
      const user = await supabase.auth.getUser();
      console.log(user)
      setIsAuthenticated(!!user.data);
    });

    // Limpiar el suscriptor al desmontar el componente
    return () => {
      // Llama a la función 'unsubscribe' en el objeto de suscripción
      authListener.subscription?.unsubscribe();
    };
  }, []);

  // ...


  const handleSignUp = async () => {
    // ... Código anterior ...
  };

  const handleSignIn = async () => {
    try {
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // El estado de autenticación se manejará en onAuthStateChange
      closeModal();
    } catch (error) {
      console.log(error);
      setShowModal(true);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      ) : (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowModal(true)}
          >
            Sign up
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowModal(true)}
          >
            Sign in
          </button>
        </>
      )}

      {/* Modal de inicio de sesión */}
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          {/* ... Código anterior ... */}
        </div>
      )}
    </>
  );
}
