import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { updateSearchTerm } from "../redux/itemsSlice";

import { BiCart, BiData, BiAddToQueue } from "react-icons/bi";
import Searchfield from "./Seachfield";

const StyledDom = styled.div`
  height: 62px;
`;

const IconOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 96px;

`;

const statusComplete = `
color: #03b5b6;
font-weight: 700;
font-size: 1.7rem;
`

const StatusCount = styled.div`
font-family: var(  --snsrf);
font-style: normal;
font-weight: 500;
font-size: 1.1rem;
line-height: 1.8rem;
color: black;
${props => props.msg === 'Done' ? statusComplete : null}
`;


const BiCartStyled = styled(BiCart)`
  width: 36px;
  height: 36px;
  color: black;
`;

const BiDataStyled = styled(BiData)`
  width: 36px;
  height: 36px;
  margin-left: 17px;
  color: black;
`;

const BiAddToQueueStyled = styled(BiAddToQueue)`
  width: 36px;
  height: 36px;
  margin-left: 17px;
  color: black;
`;

export default function Header({ statusCount }) {
    const path = useLocation().pathname;
    const dispatch = useDispatch();

    const performSearch = ({ target }) => {
        dispatch(updateSearchTerm(target.value));
    }

    if (path === "/") {
        return (
            <StyledDom className={["container", "fl-md", "fl-jcsb"]}>
                <StatusCount msg={statusCount}>{statusCount}</StatusCount>
                <IconOptions>
                    <Link to={"/pantry"}>
                        <BiAddToQueueStyled />
                    </Link>
                </IconOptions>
            </StyledDom>
        );
    }

    if (path === "/pantry") {
        return (
            <StyledDom className={["container", "fl-md", "fl-jcsb"]}>
                <Searchfield performSearch={performSearch} />
                <IconOptions>
                    <Link to={"/"}>
                        <BiCartStyled />
                    </Link>

                    <Link to={"/manage"}>
                        <BiDataStyled />
                    </Link>
                </IconOptions>
            </StyledDom>
        );
    }

    if (path === "/manage") {
        return (
            <StyledDom className={["container", "fl-md", "fl-jcsb"]}>
                <div></div>
                <IconOptions>
                    <div></div>
                    <Link to={"/pantry"}>
                        <BiAddToQueueStyled />
                    </Link>
                </IconOptions>
            </StyledDom>
        );
    }

    return <></>;
}
