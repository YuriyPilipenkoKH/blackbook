import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const buttonStyles =css`
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: var(--green);
  color: #eee;
  border: 2px solid #eee;
  /* border-radius: 4px; */
  padding: 4px 24px ;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  box-shadow: var(--shadow-four);
  transition: all 0.4s ease;

  &:hover  {
  color: #092e7d;
  box-shadow: var(--shadow-two);
  background-color: #159638c0;
  & >svg {
  fill: #888;
  }
}

&:active {
  transform: scale(0.98);
}
`
export const ripple=css`
&:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #5b24ff 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.4s, opacity 1s;
}

&:active:after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}

&:disabled {
  cursor: none;
  background-color: #888;

  &:hover {
  color: #eee;
  background-color: #888;
  box-shadow: var(--shadow-four);
  }
}
`
export const SBtn = styled('button')`
  position: relative;
  overflow: hidden;

 ${buttonStyles} ;
 ${ripple} ;

`;

export const SBtnDelete = styled('button')`
  position: relative;
  overflow: hidden;
  
  ${buttonStyles} ;
  ${ripple} ;
  background-color: var(--red);
border-radius: 6px;
`;

export const SAddNewBtn = styled('button')`
  ${buttonStyles} ;

  width: 280px;
  color: #676d69;
  border: 4px solid #676d69;
  padding: 0.25rem 1rem;
  border-radius: 0.75rem;
  font-weight: 600;
  background-color: transparent;

  &:hover {
    background-color: #14532d;
    color: #eee;
  }

`;

export const SCancelBtn = styled('button')`
  ${buttonStyles} ;

  font-weight: 600;
  border-radius:6px; 

  background-color: #5604ef;

  &:hover {
  background-color: #5604efa0;
  }
  &:disabled{
  background-color: #888;
  }

`;

export const SEditBtn = styled('button')`
  ${buttonStyles} ;
  width: 105px;
  font-weight: 600;
  border-radius:8px; 
  border-color: #14532d;
  background-color: #14532d;

  &:hover {
  background-color: #5604efa0;
  }
  &:disabled{
  background-color: #888;
  }

`;

export const SFlatBtn = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 8px;
  font-weight: 600;
  border-radius: 50%; 
  border: none;
  /* background-color: transparent; */

  &:hover {
  background-color: #5983679b;
  }
  &:disabled{
  background-color: #888;
  }

`;

export const SPagBtn = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 30px; */
  height: 30px;
  padding: 8px 12px;
  font-weight: 600;
  border-radius: 6px; 
  color:#676d69;
  border: 2px solid #676d69;
  background-color: transparent;

  &:hover {
  background-color: #5983679b;
  color:#eee;
  }
  &:disabled{
  background-color: #888;
  }

`;


export const flatBtnStyles = {
  display: 'grid',
  placeItems: 'center',
  width: '30px',
  height: '30px',
  padding: '8px',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: 'transparent',

  '&:hover': {
    backgroundColor: '#5983679b',
  }
};
export const callBtnStyles = {
  display: 'grid',
  placeItems: 'center',
  width: '70px',
  height: '36px',
  padding: '8px',
  border: 'none',

  '&:hover': {
    backgroundColor: '#5983679b',
  }
};

export const dellBtnStyle: React.CSSProperties = {
  position:"absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  padding: '8px',
  border: 'none',
  backgroundColor: 'transparent',

};