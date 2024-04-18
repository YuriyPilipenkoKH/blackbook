'use client'

import { SAddNewBtn, SBtn, SBtnDelete, SCancelBtn, SEditBtn, SFlatBtn } from "./Button.styled";
import { useFormStatus } from 'react-dom'

  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      children: React.ReactNode;
    }


  export  const Btn: React.FC<ButtonProps> = ({ children, ...props }) => {
    const {pending} = useFormStatus()

    return (
        <SBtn type='button' {...props}> 
            {pending ? 'Process' : children}
        </SBtn>
    )
  };

  export const BtnDelete: React.FC<ButtonProps> = ({ children, ...props }) => {
      return <SBtnDelete type='button' {...props}> {children}</SBtnDelete>;
  };

  export const AddNewBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
      return <SAddNewBtn type='button' {...props}> {children}</SAddNewBtn>;
  };
  export const CancelBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
      return <SCancelBtn type='button' {...props}> {children}</SCancelBtn>;
  };
  export const EditBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
      return <SEditBtn type='button' {...props}> {children}</SEditBtn>;
  };
  export const FlatBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
      return <SFlatBtn type='button' {...props}> {children}</SFlatBtn>;
  };



