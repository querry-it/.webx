import { ChevronDown, ChevronUp } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './support.module.css';
import { useRef, useState } from 'react';
import { useEditor } from '../../../../../../state/useEditor';
import { CheckBox } from '../../../../../../components/checkbox';

const cx = classNames.bind(styles);

const loadData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : {};
};

const saveData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default function SupportComponent() {
  const { dispatch } = useEditor();
  const IconRef = useRef({ x: 20, y: 1.6 });

  const classItems = [
    { id: 1, name: 'Bản đồ danh giới Hà Nội' },
    { id: 2, name: 'Bản đồ danh giới quận huyện' },
    { id: 3, name: 'Bản đồ giao thông' },
    { id: 4, name: 'Bản đồ mật độ giao thông' },
    { id: 5, name: 'Bản đồ nhiệt độ' },
  ];

  const markerItems = [
    { id: 1, name: 'Di tích' },
    { id: 2, name: 'Thiên nhiên' },
    { id: 3, name: 'Bảo tàng' },
    { id: 4, name: 'Kiến trúc' },
    { id: 5, name: 'Khu phố' },
    { id: 6, name: 'Công viên' },
    { id: 7, name: 'Làng cổ' },
    { id: 8, name: 'Bến xe' },
    { id: 9, name: 'Quán cà phê' },
    { id: 10, name: 'Cửa hàng' },
    { id: 11, name: 'Nhà hàng' },
    { id: 12, name: 'Bến tàu điện' },
  ];

  const travelItems = [
    {
      id: '6f2c1a9d-4c11-4f2b-9c10-111111111111',
      name: 'Chuyến du lịch số 01',
    },
    {
      id: '7a3d2b8e-5d22-4c3b-8d21-222222222222',
      name: 'Chuyến du lịch số 02',
    },
    {
      id: '8b4e3c9f-6e33-4d4c-9e32-333333333333',
      name: 'Chuyến du lịch số 03',
    },
    {
      id: '9c5f4d0a-7f44-4e5d-8f43-444444444444',
      name: 'Chuyến du lịch số 04',
    },
    {
      id: 'ad6e5f1b-8055-4f6e-9f54-555555555555',
      name: 'Chuyến du lịch số 05',
    },
    {
      id: 'be7f601c-9166-4a7f-8b65-666666666666',
      name: 'Chuyến du lịch số 06',
    },
    {
      id: 'cf80112d-a277-4b8a-9c76-777777777777',
      name: 'Chuyến du lịch số 07',
    },
    {
      id: 'd081223e-b388-4c9b-8d87-888888888888',
      name: 'Chuyến du lịch số 08',
    },
    {
      id: 'e192334f-c499-4dac-9d98-999999999999',
      name: 'Chuyến du lịch số 09',
    },
    {
      id: 'f2a3445g-d5aa-4ebc-8e0a-aaaaaaaaaaaa',
      name: 'Chuyến du lịch số 10',
    },
  ];

  const [menuX, setMenuX] = useState(false);
  const [menuY, setMenuY] = useState(false);
  const [menuZ, setMenuZ] = useState(false);

  const [checkedClass, setCheckedClass] = useState(() => {
    return loadData('checkedClass') || { 1: true };
  });

  const [checkedMarker, setCheckedMarker] = useState(() =>
    loadData('checkedMarker'),
  );
  const [checkedTravel, setCheckedTravel] = useState(() =>
    loadData('checkedTravel'),
  );

  const toggleChecked = (
    group: 'class' | 'marker' | 'travel',
    id: number | string,
  ) => {
    let fieldName = '';

    if (group === 'class') {
      fieldName = `class_${String(id).padStart(2, '0')}`;
    } else if (group === 'marker') {
      fieldName = `marker_${String(id).padStart(2, '0')}`;
    } else if (group === 'travel') {
      const index = travelItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        fieldName = `travel_${String(index + 1).padStart(2, '0')}`;
      }
    }

    if (group === 'class') {
      setCheckedClass((prev) => {
        const updated = { ...prev, [id]: !prev[id] };
        saveData('checkedClass', updated);

        if (fieldName) {
          dispatch({
            type: 'SET_INFORMATION',
            payload: { [fieldName]: updated[id] },
          });
        }

        return updated;
      });
    }

    if (group === 'marker') {
      setCheckedMarker((prev) => {
        const updated = { ...prev, [id]: !prev[id] };
        saveData('checkedMarker', updated);

        if (fieldName) {
          dispatch({
            type: 'SET_INFORMATION',
            payload: { [fieldName]: updated[id] },
          });
        }

        return updated;
      });
    }

    if (group === 'travel') {
      setCheckedTravel((prev) => {
        const updated = { ...prev, [id]: !prev[id] };
        // saveData('checkedTravel', updated);

        if (fieldName) {
          dispatch({
            type: 'SET_INFORMATION',
            payload: { [fieldName]: updated[id] },
          });
        }

        return updated;
      });
    }
  };

  return (
    <div className={cx('location__bgr')}>
      <div className="min-h-[70px] border-b border-gray-200"></div>
      <div className="scroll-hidden w-full h-[calc(100%-70px)] overflow-y-auto flex flex-col gap-2 pb-10 pt-2">
        <MenuItem
          title="Các lớp bản đồ"
          open={menuX}
          onToggle={() => setMenuX(!menuX)}
          items={classItems}
          checked={checkedClass}
          onToggleItem={(id) => toggleChecked('class', id)}
          iconSize={IconRef.current.x}
        />

        <MenuItem
          title="Các loại điểm"
          open={menuY}
          onToggle={() => setMenuY(!menuY)}
          items={markerItems}
          checked={checkedMarker}
          onToggleItem={(id) => toggleChecked('marker', id)}
          iconSize={IconRef.current.x}
        />

        <MenuItem
          title="Các tuyến du lịch"
          open={menuZ}
          onToggle={() => setMenuZ(!menuZ)}
          items={travelItems}
          checked={checkedTravel}
          onToggleItem={(id) => toggleChecked('travel', id)}
          iconSize={IconRef.current.x}
        />
      </div>
    </div>
  );
}

function MenuItem({
  title,
  open,
  onToggle,
  items,
  checked,
  onToggleItem,
  iconSize,
}) {
  return (
    <div className="w-full">
      <div
        className="h-[48px] mx-[10px] flex justify-between rounded-[6px]
                   items-center border border-blue-gray-500 cursor-pointer"
        onClick={onToggle}
      >
        <div className="pl-6">
          <span>{title}</span>
        </div>

        <div className="flex justify-center items-center pr-6">
          <div className="w-8 h-8 rounded-[10px] hover:bg-gray-100 flex justify-center items-center">
            {open ? (
              <ChevronDown size={iconSize} strokeWidth="1.4" />
            ) : (
              <ChevronUp size={iconSize} strokeWidth="1.4" />
            )}
          </div>
        </div>
      </div>

      {open && (
        <div className="mt-2 mx-[10px] space-y-2">
          {items.map((i) => (
            <div
              key={i.id}
              className="h-[48px] flex justify-between rounded-[6px]
                         items-center border border-dashed border-blue-gray-500"
            >
              <div className="pl-6">{i.name}</div>

              <div className="pr-6">
                <CheckBox
                  checked={checked?.[i.id] || false}
                  onChange={() => onToggleItem(i.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
