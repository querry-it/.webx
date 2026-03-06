import { useEditor } from '../state/useEditor';

export const UserHook = () => {
  const { state, dispatch } = useEditor();

  const getUserId = (): string | null => {
    return state.information.userid;
  };

  const setUserId = (userId: string | null): void => {
    dispatch({ type: 'SET_INFORMATION', payload: { userid: userId } });
  };

  const clearUserId = (): void => {
    dispatch({ type: 'SET_INFORMATION', payload: { userid: null } });
  };

  const getCode = (): string | null => {
    return state.information.code;
  };

  const setCode = (code: string | null): void => {
    dispatch({ type: 'SET_INFORMATION', payload: { code: code } });
  };

  const getUserName = (): string | null => {
    return state.information.username;
  };

  const setUserName = (username: string | null): void => {
    dispatch({ type: 'SET_INFORMATION', payload: { username: username } });
  };

  const getFullName = (): string | null => {
    return state.information.fullname;
  };

  const setFullName = (fullname: string | null): void => {
    dispatch({ type: 'SET_INFORMATION', payload: { fullname: fullname } });
  };

  const getAvatar = (): string | null => {
    return state.information.avatar_url;
  };

  const setAvatar = (avatar_url: string | null): void => {
    dispatch({ type: 'SET_INFORMATION', payload: { avatar_url: avatar_url } });
  };

  return {
    getUserId,
    setUserId,
    clearUserId,
    getCode,
    setCode,
    getUserName,
    setUserName,
    getFullName,
    setFullName,
    getAvatar,
    setAvatar,
  };
};
