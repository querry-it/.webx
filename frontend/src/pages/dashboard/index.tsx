import { useEditor } from '../../state/useEditor';
import Loading from '../loading';
import Container from './components/container';
import DropDown from './components/drop-down';
import ProfileModal from './components/profile-modal';
import SetupModal from './components/setup-modal';
import LogoutModal from './components/logout-modal';
import { Api } from '../../utils/api';
import { useEffect } from 'react';
import { accessToken } from '../../utils/accessToken';
import { UserHook } from '../../hook/user';
import { refreshToken } from '../../utils/refresh';
import { loadAndSyncLayers } from '../../utils/datainit';

export default function Dashboard() {
  const { state, dispatch } = useEditor();

  const { getAccessToken, setAccessToken } = accessToken();
  const { setUserId, setCode, setUserName, setFullName, setAvatar } =
    UserHook();

  useEffect(() => {
    const init = async () => {
      try {
        const refreshData = await refreshToken();

        setAccessToken(refreshData.accessToken);
        setUserId(refreshData.userId);

        const data = await Api(
          {
            method: 'GET',
            url: `/auth/get-info/${refreshData.userId}`,
          },
          {
            token: getAccessToken(),
            setToken: setAccessToken,
            setUserId: setUserId,
          },
        );
        setCode(data.data.code);
        setUserName(data.data.username);
        setFullName(data.data.fullname);
        setAvatar(data.data.avatar_url);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch({ type: 'SET_UTIL', payload: { loading: true } });
        loadAndSyncLayers(dispatch);
      }
    };

    init();
  }, []);

  return (
    <>
      {!state.util.loading ? <Loading /> : <Container />}
      {state.dropdown.logout && <DropDown />}
      {state.modal.profile && <ProfileModal />}
      {state.modal.person && <SetupModal />}
      {state.modal.setup && <SetupModal />}
      {state.modal.logout && <LogoutModal />}
    </>
  );
}
