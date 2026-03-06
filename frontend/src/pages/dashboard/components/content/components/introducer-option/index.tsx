import classNames from 'classnames/bind';
import styles from './introducer.module.css';
import Overview from './components/overview';
import Feedback from './components/feedback';
import { useEditor } from '../../../../../../state/useEditor';
import { useEffect, useRef, useState } from 'react';
import { domain } from '../../../../../../utils/domain';

const cx = classNames.bind(styles);

function Xy() {
  const { state, dispatch } = useEditor();
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  const setState = (option: string, key: string, value: boolean) => {
    dispatch({
      type: option,
      payload: { [key]: value },
    });
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationId = state.information.locationid;

        if (!locationId) return;

        const res = await fetch(
          `${domain}/locations/get-location/${locationId}`,
        );

        const data = await res.json();

        if (data.success) {
          setSelectedPlace(data.data);
          setState('SET_INFORMATION', 'lat', data.data.lat);
          setState('SET_INFORMATION', 'lon', data.data.lon);
        }
      } catch (err) {
        console.error('Lỗi lấy location:', err);
      }
    };

    fetchLocation();
  }, [state.information.locationid]);

  if (!selectedPlace) return null;

  return (
    <div className={cx('location__add')}>
      <Overview selectedPlace={selectedPlace} />
    </div>
  );
}

function Y() {
  const Icon = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
  const { state, dispatch } = useEditor();
  const setState = (option: string, key: string, value: boolean) => {
    dispatch({
      type: option,
      payload: { [key]: value },
    });
  };

  const [feedbacks, setFeedbacks] = useState<any>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const locationId = state.information.locationid;
        const userId = null;

        const url = new URL(`${domain}/locations/${locationId}/feedbacks`);
        if (userId) url.searchParams.set('userId', userId);

        const res = await fetch(url.toString());
        const data = await res.json();

        setFeedbacks(data);
      } catch (err) {
        console.error('Lỗi lấy feedbacks:', err);
      }
    };

    fetchFeedbacks();
  }, [state.information]);

  if (!feedbacks) return null;

  return (
    <>
      <Feedback feedbacks={feedbacks} />
    </>
  );
}

export default function IntroducerComponent({ locationId }: string) {
  const { state, dispatch } = useEditor();
  const Icon = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
  const setState = (option: string, key: string, value: boolean) => {
    dispatch({
      type: option,
      payload: { [key]: value },
    });
  };

  useEffect(() => {
    setState('SET_NAVBAR_X', 'Xreview', 'overview');
  }, [locationId]);

  return <>{state.navbar_x.Xreview === 'overview' ? <Xy /> : <Y />}</>;
}
