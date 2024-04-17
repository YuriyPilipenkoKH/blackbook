import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Label_Wrap = styled('div')`
    display: grid;
    grid-template-columns: 58px 58px auto;
    gap: 12px;
    width: 300px;
`;

export const FormLabel = styled('label')`
    display: flex;
    flex-direction: column;
    gap: 2px;
    height: 67px;
    color: #999;
    font-weight: 600;

`;

export const baseInputStyles = css`
    border: 2px solid var(--grey);
    border-radius: 0.5rem/* 8px */;
    padding: 8px 16px;
    background-color: #cbd5e1;
    width: 100%;
    height: 38px;
    transition: all 0.4s ease;
    color: #222;
    font-weight: 600;
`

export const AuthError = styled('div')`
    color: #eee;
    background-color: #dc2626cc;
    font-size: 0.7rem;
    line-height: 1.25rem/* 20px */;
    padding: 12px 8px;
    padding-right: 0.75rem/* 12px */;
    border-radius: 0.375rem/* 6px */;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 28px;
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap; 
`;


export const Form_CreateNew = styled('form')`
    display: grid;
    gap: 12px;
    grid-template-rows: repeat(5, 55px);
    padding: 16px;
    height: 360px;
`;

export const Form_Profile = styled('form')`
    position: relative;
    display: grid;
    grid-template-rows: 67px 67px 67px 67px 67px 67px 30px auto;
    grid-template-columns: 180px 110px;
    justify-items: stretch;
    gap: 10px;
    width: 300px;
    height: 535px;

    &>label {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    &>.save {
        position: absolute;
        bottom: 0;
        background-color: #14532d;
        border-radius:8px; 
        height: 38px;
        width: 100%;
        color: #eee;
        &:disabled{
            opacity: 0.5;
        }
    }
`;



  export const StyledSearchingForm = styled('form')`
    position: relative;
    width: 300px;

    @media screen and (min-width: 768px) {
        display: block;
    }

    & > label  {
        display: flex;
        gap: 5px;

      & > input{
            outline: none;
            width: 300px;
            background: none;
            color: #eee;
            padding: 6px 90px 6px 16px;
            border: 2px solid #999;
            border-radius: 6px;
      }  
    }
    & > .search_btn_wrap{
        position: absolute;
        right: 24px;
        top: 8px;
        display: flex;
        gap: 14px;

        &> button{
            outline: none;
        }  
      &> button > svg {
        fill: #f8fafc;
      }  
    }

   & > .shut{
        position: absolute;
        right: -4px;
        top: 1px;
        width: 12px;
        height: 12px;
        background-color: #f05f05;
        border-radius: 50%;
        border: 2px solid #999;
   }
`

export const lowPriceColor = {
    backgroundColor: '#2196f3',
    color: '#eee',
    border:'none',
}
export const highPriceColor = {
    backgroundColor: '#e2f321',
    color: '#555',
    border:'none',
}
export const black = {
    fill: '#000',
}
export const shiftright = {
    padding: '8px 8px 8px 16px ',
}