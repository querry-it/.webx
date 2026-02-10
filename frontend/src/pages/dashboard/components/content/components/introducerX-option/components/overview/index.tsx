import classNames from 'classnames/bind';
import styles from './overview.module.css';
import PlaceHero from './components/PlaceHero/index.tsx';
import PlaceAction from './components/PlaceAction/index.tsx';
import PlaceIntroducer from './components/PlaceIntroducer/index.tsx';
import PlaceInformation from './components/PlaceInformation/index.tsx';
import PlaceGallery from './components/PlaceGallery/index.tsx';
import ExteralArticleCard from './components/ExternalArticleCard/index.tsx';
import { useEditor } from '../../../../../../../../state/useEditor.ts';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const cx = classNames.bind(styles);

export default function Overview({ selectedPlace }) {
  const { state, dispatch } = useEditor();
  const Icon = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
  const setState = (option: string, key: string, value: boolean) => {
    dispatch({
      type: option,
      payload: { [key]: value },
    });
  };
  return (
    <>
      <div
        className={cx('sticky', {
          'sticky--show': state.navbar_x.headerXy,
        })}
      >
        <div className={cx('left')} />
        <div className={cx('center')}>Văn Miếu - Quốc Tử Giám</div>
        <div className={cx('right')}>
          <X size={20} strokeWidth={2.2} />
        </div>
      </div>
      <div className={cx('location__content')}>
        <PlaceHero place={selectedPlace} className={cx('place__hero')} />
        <PlaceAction className={cx('place__action')} />
        <PlaceIntroducer
          place={selectedPlace}
          className={cx('place__introducer')}
        />
        <PlaceInformation
          place={selectedPlace}
          className={cx('place__information')}
        />
        <PlaceGallery place={selectedPlace} className={cx('place__gallery')} />
        <ExteralArticleCard place={selectedPlace} className={cx('card')} />
      </div>
    </>
  );
}
