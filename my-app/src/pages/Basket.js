import styled from "styled-components";
import { reactLocalStorage } from "reactjs-localstorage";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';

const ItemList = styled.div`
display: flex;
align-items: start;
padding-bottom:10px;
`;

const inBasketCss = `
text-decoration-line: line-through;
color: #DCDCDC;
`

const ItemText = styled.div`
font-family: var(--srf);
font-style: normal;
font-weight: normal;
font-size: 24px;
line-height: 30px;
cursor: pointer;
width:300px;
${props => props.inbasket ? inBasketCss : null}
`;

const HeaderText = styled.h2`
font-family: var(  --snsrf);
font-style: normal;
font-weight: 500;
font-size: 1.1rem;
line-height: 1.8rem;
color: #b6b5b5;
`

export default function Basket({ setStatusCount }) {

    const [bookstatus, setBookstatus] = useState({});
    const [basketstatus, setBasketstatus] = useState({});

    const storedObjects = JSON.parse(reactLocalStorage.get("itemStorage", "[]"));

    const localStore = () => {
        const basket = JSON.parse(reactLocalStorage.get("basketMarked", "{}"));
        const book = JSON.parse(reactLocalStorage.get("bookMarked", "{}"));
        return { basket, book }
    }

    useEffect(() => {
        const { basket, book } = localStore();
        setBasketstatus(basket);
        setBookstatus(book);
        calculateStatus();
    }, []);

    const toggleActive = (id) => {
        const { basket, book } = localStore();
        const basketMarked = basket;
        basketMarked[id] = basketMarked[id] ?? false;
        basketMarked[id] = !basketMarked[id];
        reactLocalStorage.set("basketMarked", JSON.stringify(basketMarked));
        setBasketstatus(basketMarked);
        calculateStatus();
    };

    const calculateStatus = () => {
        const { basket, book } = localStore();

        const totalBookMarks = Object.values(book).filter((itemState) => itemState).length;
        const totalInBasket = Object.values(basket).filter((itemState) => itemState).length;

        let response = totalInBasket === totalBookMarks ? `Done` : `${totalInBasket}/${totalBookMarks}`;
        response = !totalBookMarks ? null : response;
        setStatusCount(response);
    }

    const groupedItems = () => {
        const allGrouped = storedObjects.map(item => {
            return bookstatus[item.id] ? item.location : null;
        });

        return Array.from(new Set(allGrouped));
    };

    const displayGroupings = () => {
        return groupedItems().map((group, ii) => (
            <div key={ii} style={{ marginBottom: '5px' }}>
                <HeaderText>{group}</HeaderText>
                {listItems(group)}
            </div>
        ))
    }

    function listItems(group) {
        return storedObjects.map((item) => (item.location === group && bookstatus[item.id]) ? (
            <ItemList key={item.id} onClick={() => toggleActive(item.id)}>
                <ItemText inbasket={basketstatus[item.id]}>{parse(item.name)}</ItemText>
            </ItemList>
        ) : null
        );
    }

    return (
        <div>
            {displayGroupings()}
        </div>
    );
}
