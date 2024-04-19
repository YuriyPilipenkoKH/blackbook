import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const ClientCard = styled('div')`
    display: grid;
    grid-template-columns: 50px auto 30px;
    grid-template-rows: repeat(3, 24px);
    align-items: center;
    gap: 4px;
    width: 280px;
    border: 4px solid #676d69;
    border-radius: 0.75rem;
    padding:8px 12px;
`
export const PhWrap = styled('div')`
    display: flex;
    gap: 8px;
    height: 24px;
    &>span{
        width: 50px;
    }
`   