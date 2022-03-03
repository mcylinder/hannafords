import styled from "styled-components";

const StyledInput = styled.input`
  background: #ffffff;
  border: 1px solid var(--gray-1);
  box-sizing: border-box;
  border-radius: 2px;
  width: 206px;
  border-radius: 3px;
  padding: 0 6px;
  height: 26px;
  ::placeholder {
    color: #cccccc;
    letter-spacing: 0.03rem;
  }
`;

export default function Searchfield({ performSearch }) {
  return <StyledInput
    aria-label="search field"
    onChange={performSearch}
    placeholder="filter..."
    type="text" />;
}
