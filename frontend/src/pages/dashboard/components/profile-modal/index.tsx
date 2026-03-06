import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import styles from './profilemodal.module.css';
import { useEditor } from '../../../../state/useEditor';
import { UserHook } from '../../../../hook/user';
import { accessToken } from '../../../../utils/accessToken';
import { uploadAvatar } from '../../../../utils/uploadAvatar';
import { updateProfile } from '../../../../utils/updateProfile';
import { getAvatarLetters } from '../../../../utils/name';
import { validationProfile } from '../../../../utils/validate_profile';
import { Camera } from 'lucide-react';
import Loader from '../../../../components/loader/loader';
import { domain } from '../../../../utils/domain';

const cx = classNames.bind(styles);

interface Active {
  name: boolean;
  code: boolean;
}

interface Information {
  name: string;
  code: string;
}

export default function ProfileModal() {
  const { dispatch } = useEditor();
  const { getAccessToken, setAccessToken } = accessToken();
  const {
    getFullName,
    getUserName,
    getAvatar,
    setUserName,
    setFullName,
    setAvatar,
    setUserId,
  } = UserHook();

  const setState = (
    option: string,
    key: string,
    value: boolean | string | number,
  ) => {
    dispatch({ type: option, payload: { [key]: value } });
  };

  const [active, setActive] = useState<Active>({
    name: false,
    code: false,
  });

  const [info, setInfo] = useState<Information>({
    name: getFullName(),
    code: getUserName(),
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [errorLine, setErrorLine] = useState<string | null>(null);

  const [src, setSrc] = useState<string>(`${domain}/uploads/${getAvatar()}`);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChooseImage = () => {
    inputRef.current?.click();
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(false);
    const url = await uploadAvatar(file, {
      token: getAccessToken(),
      setAccessToken,
      setUserId,
    });

    if (url) {
      setAvatar(url);
      setSrc(`${domain}/uploads/${url}`);
      setLoading(true);
    }
  };

  const handleSave = async () => {
    const checkProfile = validationProfile(info);
    if (checkProfile !== '') {
      setErrorLine(checkProfile);
      return;
    }

    try {
      await updateProfile(
        info.name,
        info.code,
        getAccessToken(),
        setAccessToken,
        setUserId,
      );
      // ✅ Thêm xử lý sau khi lưu thành công
      setFullName(info.name);
      setUserName(info.code);
      setState('SET_MODAL', 'profile', false);
    } catch (err: any) {
      // ✅ Fix: lấy đúng message từ response
      setErrorLine(err.response?.data?.message || 'Cập nhật thất bại.');
    }
  };

  return (
    <>
      <div
        onClick={() => setState('SET_MODAL', 'profile', false)}
        className={cx('modal-overlay')}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={cx('modal-container')}
        >
          <div className={cx('title')}>
            <div className={cx('title__box')}>
              <div className={cx('title__box--line')}>
                <h2 className={cx('text')}>Chỉnh sửa hồ sơ</h2>
              </div>
            </div>
            <div className={cx('title__space')}></div>
          </div>
          <div className={cx('content')}>
            <form>
              <div className={cx('content__avatar')}>
                <div className={cx('content__avatar--image')}>
                  <button type="button" onClick={handleChooseImage}>
                    {getAvatar() === null ? (
                      <div className={cx('img_div')}>
                        <p>{getAvatarLetters(getFullName())}</p>
                      </div>
                    ) : (
                      <img src={src} alt="avatar" />
                    )}
                    <div className={cx('wrapper')}>
                      {loading ? (
                        <Camera size={18} strokeWidth={1.6} />
                      ) : (
                        <Loader />
                      )}
                    </div>
                  </button>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleChangeImage}
                  />
                </div>
              </div>
              <div
                onClick={() =>
                  setActive({
                    name: !active.name,
                    code: false,
                  })
                }
                className={cx('content__name', {
                  active: active.name,
                })}
              >
                <div className={cx('content__name--label')}>
                  <label>Tên hiển thị</label>
                </div>
                <div className={cx('content__name--input')}>
                  <input
                    type="text"
                    value={info.name}
                    onChange={(e) =>
                      setInfo((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div
                onClick={() =>
                  setActive({
                    name: false,
                    code: !active.code,
                  })
                }
                className={cx('content__code', {
                  active: active.code,
                })}
              >
                <div className={cx('content__code--label')}>
                  <label>Tên người dùng</label>
                </div>
                <div className={cx('content__code--input')}>
                  <input
                    type="text"
                    value={info.code}
                    onChange={(e) =>
                      setInfo((prev) => ({
                        ...prev,
                        code: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              {errorLine !== null && <p className={cx('px')}>{errorLine}</p>}
              <p className={cx('p')}>
                Hồ sơ của bạn giúp người khác nhận ra bạn. Tên và tên người dùng
                của bạn cũng được sử dụng trong ứng dụng Sora.
              </p>
            </form>
            <div className={cx('submit')}>
              <div className={cx('submit__btn')}>
                <button
                  onClick={() => setState('SET_MODAL', 'profile', false)}
                  className={cx('no-save')}
                >
                  <div>Hủy</div>
                </button>
                <button onClick={handleSave} className={cx('save')}>
                  <div>Lưu</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
