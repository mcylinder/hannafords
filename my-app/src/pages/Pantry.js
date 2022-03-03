import styled from "styled-components";
import { useSelector } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import { BiBookmark } from "react-icons/bi";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';

const ItemList = styled.li`
  display: flex;
  align-items: start;
  padding-bottom:10px;
`;

const ItemText = styled.div`
  font-family: var(--srf);
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 30px;
  cursor: pointer;
  /* word-break: break-all; */
  width:300px;
`;

const MarkStyle = styled(BiBookmark)`
  margin-right: 7px;
  opacity: 0.35;
  transform: translate(0, 4px);
  width: 25px;
  height: 25px;
 
`;
const MarkStyleActive = styled(MarkStyle)`
  opacity: 1;
  color: red;
`;

export default function Pantry() {
    const flt = useSelector((state) => state.item.searchTerm);
    const [bookstatus, setBookstatus] = useState({});

    const toggleActive = (id) => {
        const bookMarked = JSON.parse(reactLocalStorage.get("bookMarked", "{}"));
      bookMarked[id] = bookMarked[id] ?? false;
        bookMarked[id] = !bookMarked[id];
        reactLocalStorage.set("bookMarked", JSON.stringify(bookMarked));
        setBookstatus(bookMarked);
    };

    useEffect(() => {
        setBookstatus(JSON.parse(reactLocalStorage.get("bookMarked", "{}")));
    }, []);

  const storedObjects = JSON.parse(reactLocalStorage.get("itemStorage", "[]"));
    const filtItems = storedObjects.filter(item => item.name.toLowerCase().indexOf(flt) > -1);

    const listItems = filtItems.map((item) => (
        <ItemList key={item.id} onClick={() => toggleActive(item.id)}>
            {bookstatus[item.id] ? <MarkStyleActive /> : <MarkStyle />}
            <ItemText>{parse(item.name)}</ItemText>
        </ItemList>
    ));

    return (
        <ul>{listItems}</ul>
    );
}
