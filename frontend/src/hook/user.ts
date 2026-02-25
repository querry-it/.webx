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

  return { getUserId, setUserId, clearUserId };
};
