import React from 'react';

// Ao usar "extends React.ButtonHTMLAttributes<HTMLButtonElement>", herdamos 
// todas as propriedades originais de um <button> do HTML (como type, onClick, disabled).
// Isso evita conflitos e a necessidade de reescrever tipos manualmente.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode; // O conteúdo interno do botão (texto, ícone, etc.)
}

// Usa-se a desestruturação para separar o "children" do resto das propriedades (...props).
const Default = ({ children, className = '', ...props }: ButtonProps) => { 
    return (
        <button 
      // Permite injetar classes extras via className, se necessário
      className={`btn-default ${className}`}
      // O spread operator (...props) é o que injeta o onClick e o disabled automaticamente
      {...props}
    >
        {children}
    </button>
    );
}

const Outline = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button 
      className={`btn-outline ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Button = { Default, Outline };