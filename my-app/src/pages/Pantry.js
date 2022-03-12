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
    const flt = useSelector((state) => state.item.searchTerm.toLowerCase());
  const [bookstatus, setBookstatus] = useState({});

  const localStore = () => {
    const basket = JSON.parse(reactLocalStorage.get("basketMarked", "{}"));
    const book = JSON.parse(reactLocalStorage.get("bookMarked", "{}"));
    const itemStorage = JSON.parse(reactLocalStorage.get("itemStorage", "[]"));
    return { basket, book, itemStorage }
  }


    const toggleActive = (id) => {
      const { book } = localStore();
      book[id] = book[id] ?? false;
      book[id] = !book[id];
      reactLocalStorage.set("bookMarked", JSON.stringify(book));
      setBookstatus(book);
      if(book[id]) toggleBookMark(id, 'add');
      if(!book[id]) toggleBookMark(id, 'remove');

    };

  useEffect(() => {
    const { book } = localStore();
    setBookstatus(book);
    }, []);

    const toggleBookMark = async (id, state) => {
      let queryString = new URLSearchParams({ 'action' : state, 'id' : id});  
      const ignore = await fetch("http://food.peterducharme.com/bookmark.php?"+queryString, {
        method: 'POST',
        redirect: 'follow'
      })
   }


  const storedObjects = localStore().itemStorage;
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
