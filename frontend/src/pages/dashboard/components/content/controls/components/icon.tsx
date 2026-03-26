export const createLogoMarker = (
  imgUrl: string,
  size: [number, number] = [50, 50],
  padding: number = 4,
  borderColor: string = '#fff',
  borderWidth: number = 2,
) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size[0]}px;
        height: ${size[1]}px;
        padding: ${padding}px;
        box-sizing: border-box;
        border: ${borderWidth}px solid ${borderColor};
        border-radius: 50%;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
      ">
        <img src="${imgUrl}" style="
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        "/>
      </div>
    `,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1]],
  });
};
