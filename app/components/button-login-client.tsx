'use client'


import { type Session,  createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState} from 'react';

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function AuthButtonCliente({session}: {session: Session | null}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const buttonStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";


  
  const handleSignIn = async () => {


    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }
  
    // Validar la longitud de la contraseña
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
  
    // Validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Ingrese un correo electrónico válido.');
      return;
    }

    await supabase.auth.signInWithPassword({
      email,
      password,
    })
      .then((response) => {
        
        if (response.data.session === null) {
          if (response.error != null) {
            setError(response.error.message);
          }
        } else {
          closeModal();
          router.refresh();
          setEmail('');
        setPassword('');
        setError('');
        }
      })
      .catch((error) => {
        
        // Manejar errores generales aquí, ya que la función .catch() manejará cualquier error ocurrido en la promesa
        setError('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
      });
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
      {session ? (
        <Button 
          
          onClick={onOpen}
        >
          Sign out
        </Button >
      ) : (
        <>
          
          <Button 
            
            onClick={() => setShowModal(true)}
          >
            Iniciar sesión
          </Button >
        </>
      )}

<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
    </>
  );
}
