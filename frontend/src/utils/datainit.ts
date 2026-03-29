export const loadAndSyncLayers = (dispatch: any) => {
  try {
    const checkedClassStr = localStorage.getItem('checkedClass');
    const checkedMarkerStr = localStorage.getItem('checkedMarker');
    const checkedTravelStr = localStorage.getItem('checkedTravel');

    const checkedClass: Record<number, boolean> = checkedClassStr
      ? JSON.parse(checkedClassStr)
      : {};

    const checkedMarker: Record<number, boolean> = checkedMarkerStr
      ? JSON.parse(checkedMarkerStr)
      : {};

    const checkedTravel: Record<string, boolean> = checkedTravelStr
      ? JSON.parse(checkedTravelStr)
      : {};

    const payload: any = {};

    for (let i = 1; i <= 5; i++) {
      const key = `class_${i.toString().padStart(2, '0')}`;
      payload[key] = Boolean(checkedClass[i]);
    }

    for (let i = 1; i <= 12; i++) {
      const key = `marker_${i.toString().padStart(2, '0')}`;
      payload[key] = Boolean(checkedMarker[i]);
    }

    for (let i = 1; i <= 10; i++) {
      const key = `travel_${i.toString().padStart(2, '0')}`;
      const travelValues = Object.values(checkedTravel);
      payload[key] = Boolean(travelValues[i - 1]);
    }

    dispatch({
      type: 'SET_INFORMATION',
      payload: payload,
    });
  } catch (error) {
    console.warn('Lỗi khi load và sync layers từ localStorage:', error);

    const fallbackPayload: any = {};
    for (let i = 1; i <= 5; i++)
      fallbackPayload[`class_${i.toString().padStart(2, '0')}`] = false;
    for (let i = 1; i <= 12; i++)
      fallbackPayload[`marker_${i.toString().padStart(2, '0')}`] = false;
    for (let i = 1; i <= 10; i++)
      fallbackPayload[`travel_${i.toString().padStart(2, '0')}`] = false;

    dispatch({
      type: 'SET_INFORMATION',
      payload: fallbackPayload,
    });
  }
};
