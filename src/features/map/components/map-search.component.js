
import React, { useEffect, useContext, useState } from "react";
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components/native';

import { LocationContext } from '../../../services/location/location.context';

const SearchBoxView = styled.View`
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  z-index: 999;
  top: 30px;
  width: 100%;
`;

export const MapSearch = () => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword)

  useEffect(() => {
    setSearchKeyword(keyword)
  }, [keyword]);

  return (
    <SearchBoxView>
      <Searchbar
        placeholder="Search"
        icon='map'
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchBoxView>
  )
}