import { useEditor } from '../state/useEditor';

export const accessToken = () => {
  const { state, dispatch } = useEditor();

  const setAccessToken = (token: string | null): void => {
    dispatch({ type: 'SET_INFORMATION', payload: { token: token } });
  };

  const getAccessToken = (): string | null => {
    return state.information.token;
  };

  const clearToken = (): void => {
    dispatch({ type: 'SET_INFORMATION', payload: { token: null } });
  };
  return { getAccessToken, setAccessToken, clearToken };
};
