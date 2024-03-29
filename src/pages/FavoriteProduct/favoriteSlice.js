import { createSlice } from '@reduxjs/toolkit';
import { doRequest } from '../../utils/common';

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    favorites: [],
    loading: false,
  },
  reducers: {
    setFavorites(state, action) {
      state.favorites = action.payload;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setFavorites, setLoading } = favoriteSlice.actions;

export const fetchFavorites = (username) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await doRequest(
      'get',
      `api/Favorite/GetFavorite/?username=${username}`
    );
    const favorites = response.data;
    dispatch(setFavorites(favorites));
  } catch (error) {
    console.error('Error fetching favorites:', error);
    dispatch(setLoading(false));
  }
};

export const handleAddFavoriteAsync = (proId, userName) => async (dispatch) => {
  try {
    const response = await doRequest("post", "api/Favorite/AddFavorite", {
      data: { userName: userName, proId: proId },
    });
    dispatch(fetchFavorites(userName)); // Gọi lại fetchFavorites sau khi thêm thành công
  } catch (error) {
    console.error('Error adding favorite:', error);
  }
};

export const handleRemoveFavoriteAsync = (proId, userName) => async (dispatch) => {
  try {
    const response = await doRequest(
      "delete",
      `api/Favorite/RemoveFavorite?userName=${userName}&proId=${proId}`
    );
    dispatch(fetchFavorites(userName));
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
};

export default favoriteSlice.reducer;
