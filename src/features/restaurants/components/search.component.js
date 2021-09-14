
import React, { useEffect, useContext, useState } from "react";
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components/native';

import { LocationContext } from '../../../services/location/location.context';

const SearchBoxView = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = ({ isFavouritesToggled, onFavouritesToggle}) => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword)
  
  useEffect(() => {
    setSearchKeyword(keyword)
  }, [keyword]);

  return (
    <SearchBoxView>
      <Searchbar
        placeholder="Search"
        onIconPress={onFavouritesToggle}
        icon={isFavouritesToggled ? 'heart' : 'heart-outline'}
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