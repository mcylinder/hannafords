import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";


const StyledInput = styled.input`
  background: #ffffff;
  border: 1px solid var(--gray-1);
  box-sizing: border-box;
  border-radius: 2px;
  width: 206px;
  border-radius: 3px;
  padding: 0 8px;
  font-size: 1.3rem;
  height: 32px;
  ::placeholder {
    color: #cccccc;
    letter-spacing: 0.03rem;
  }
`;

export default function Searchfield({ performSearch }) {


  const flt = useSelector((state) => state.item.searchTerm.toLowerCase());
  useEffect(() => {
    console.log(flt);
  }, [flt]);


  return <StyledInput
    aria-label="search field"
    onChange={performSearch}
    value={flt}
    placeholder="filter..."
    type="text" />;
}
