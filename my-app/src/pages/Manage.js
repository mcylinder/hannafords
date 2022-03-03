import { useDispatch } from "react-redux";
import { updateFromAirTable } from "../redux/itemsSlice";
import { reactLocalStorage } from "reactjs-localstorage";
import styled from "styled-components";
import { BiBookmarkMinus, BiCloudDownload } from "react-icons/bi";
import { useState } from "react";

const DataButton = styled.button`
  border: 1px solid var(--gray-1);
  box-sizing: border-box;
  border-radius: 2px;
  width: 259px;
  border-radius: 3px;
  padding: 6px 6px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  font-family: var(--snsrf);
  font-weight: 400;
  font-size: 1.2rem;
  background-color: white;
  cursor: pointer;
  ${props => props.isloading === 'true' ? 'opacity: 0.2;' : ''}
`;

const iconSize = 30;

const BiBookmarkMinusStyled = styled(BiBookmarkMinus)`
  width: ${iconSize}px;
  height: ${iconSize}px;
  color: black;
  margin-right: 10px;
`;

const BiCloudDownloadStyled = styled(BiCloudDownload)`
  width: ${iconSize}px;
  height: ${iconSize}px;
  margin-right: 10px;
  color: black;
`;

export default function Manage() {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const url = "http://food.peterducharme.com/run.php";

    const updateFromJson = async () => {
        setLoading(true);
        const response = await fetch(url);
        const items = await response.json();
        dispatch(updateFromAirTable(items));
        setLoading(false);
    }

    const clearBookMarks = () => {
        reactLocalStorage.set("bookMarked", "{}");
        reactLocalStorage.set("basketMarked", "{}");
    }

    return (
        <div>
            <DataButton onClick={clearBookMarks}>
                <BiBookmarkMinusStyled /> Clear selections
            </DataButton>
            <DataButton onClick={updateFromJson} isloading={loading.toString()}>
                <BiCloudDownloadStyled />
                {loading ? 'syncing..' : 'Sync data'}
            </DataButton>
        </div>
    );
}
