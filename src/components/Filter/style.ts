import styled from "styled-components";

export const Container = styled.aside`
  max-width: 320px;
  min-width: 220px;

  padding: 0.5rem 1rem;

  border-radius: 8px;
  border: 1px solid #dee0e3;

  & > div:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 400;
  color: #222;

  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dee0e3;
`;

export const Options = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 0.5rem;
`;
