// import { useEffect, useRef } from 'react';
// import styles from './detail.module.css';
// import classNames from 'classnames/bind';

// const cx = classNames.bind(styles);

// function StyleTag() {
//   const ref = useRef(null);
//   useEffect(() => {
//     if (ref.current && !document.getElementById('detail-styles')) {
//       const tag = document.createElement('style');
//       tag.id = 'detail-styles';
//       tag.textContent = css;
//       document.head.appendChild(tag);
//     }
//   }, []);
//   return <span ref={ref} style={{ display: 'none' }} />;
// }

// /* ─── Data ───────────────────────────────────────────── */
// const galleryImages = [
//   {
//     src: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
//     caption: 'Cổng Văn Miếu',
//   },
//   {
//     src: 'https://statics.vinpearl.com/khue-van-cac-1_1677232503.jpg',
//     caption: 'Khuê Văn Các',
//   },
//   {
//     src: 'https://static.vinwonders.com/production/2025/08/bia-tien-si-van-mieu-mao-dien.jpg',
//     caption: 'Bia Tiến sĩ',
//   },
//   {
//     src: 'https://images.vietnamtourism.gov.vn/vn//images/2021/thang_7/0507.phuc_dung_mot_so_cong_trinh_tai_di_tich_ho_van.jpeg',
//     caption: 'Hồ Văn',
//   },
//   {
//     src: 'https://dbnd.1cdn.vn/2023/10/29/images-2cae99c722739fd7811264aa2403900996a2f3d0574170a58461e1d17578db37aecd895c4aeb58aa1307f3cbfbb3bac884a7f0e98f6d1708ff7d5d6c30c8863e-_n-1698594425370.jpg',
//     caption: 'Sự kiện nghệ thuật',
//   },
// ];

// const storyItems = [
//   'Văn Miếu – Quốc Tử Giám được xây dựng năm 1070 dưới triều Lý, nhằm thờ Khổng Tử và các bậc hiền triết, đồng thời là trung tâm giáo dục lớn nhất của nước ta thời phong kiến.',
//   'Năm 1076, Quốc Tử Giám được thành lập – trở thành trường đại học đầu tiên của Việt Nam, nơi đào tạo nhân tài cho triều đình.',
//   'Hệ thống bia Tiến sĩ ghi danh những người đỗ đạt qua các kỳ thi lớn, thể hiện truyền thống trọng học vấn và tôn vinh hiền tài.',
//   'Ngày nay, Văn Miếu không chỉ là di tích lịch sử mà còn là biểu tượng văn hóa, nơi học sinh – sinh viên gửi gắm ước mơ tri thức.',
// ];

// /* ─── Sub-components ─────────────────────────────────── */
// function InfoCard({ label, value }) {
//   return (
//     <div className="rounded-2xl bg-white p-6 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_45px_rgba(0,0,0,0.12)] transition-all duration-300">
//       <div className="text-sm text-gray-500">{label}</div>
//       <div className="mt-2 text-lg font-semibold">{value}</div>
//     </div>
//   );
// }

// /* ─── Main component ─────────────────────────────────── */
// export default function DetailComponent() {
//   return (
//     <>
//       <StyleTag />

//       <div className="detail_container">
//         {/* ── HERO ── */}
//         <header
//           className="relative min-h-[55vh] bg-cover bg-center"
//           style={{
//             backgroundImage:
//               'url(https://upload.wikimedia.org/wikipedia/commons/3/39/Hanoi_Temple_of_Literature_%28cropped%29.jpg)',
//           }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />
//           <div className="absolute bottom-12 left-8 right-8 max-w-5xl mx-auto text-white">
//             <p className="subheading text-gray-200">Tri thức & Truyền thống</p>
//             <h1 className="heading mt-4">Văn Miếu – Quốc Tử Giám</h1>
//             <p className="mt-6 max-w-xl text-lg md:text-xl opacity-90">
//               Trường đại học đầu tiên và biểu tượng hiếu học của Việt Nam
//             </p>
//           </div>
//         </header>

//         <main className="px-6 md:px-10 py-16 space-y-24 max-w-6xl mx-auto">
//           {/* ── GALLERY ── */}
//           <section>
//             <h2>Không gian tiêu biểu</h2>
//             <p className="text-gray-500 mb-10">
//               Nơi hội tụ tinh hoa văn hóa và tri thức Việt
//             </p>
//             <div className="marquee">
//               <div className="track">
//                 {[...galleryImages, ...galleryImages].map((img, i) => (
//                   <figure className="item" key={i}>
//                     <img src={img.src} alt={img.caption} />
//                     <figcaption>{img.caption}</figcaption>
//                   </figure>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* ── FULL IMAGE ── */}
//           <section className="relative">
//             <img
//               src="https://cdn.nhandan.vn/images/1ef398c4e2fb4bf07980a2ded785b3ef2e28956fdc3a30bfc3e12514162f3d47cea35d28e55c71e7bd663360d355cd83c2f83d73e59417e978d21ae1783d0e84e667d376bf869970b83bd2a9ea12e0ea/hanam-10-2-2809.jpg"
//               alt="Văn Miếu Hà Nội"
//               className="w-full h-[420px] object-cover rounded-[2rem]"
//             />
//             <span className="absolute bottom-6 left-6 bg-black/60 text-white px-5 py-2 rounded-full text-sm tracking-wide">
//               Temple of Literature · Hà Nội
//             </span>
//           </section>

//           {/* ── STORY ── */}
//           <section className="relative grid grid-cols-1 md:grid-cols-12 gap-16 max-w-6xl mx-auto">
//             <div className="md:col-span-7 relative pl-10">
//               <span className="absolute left-3 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-400 via-amber-200 to-transparent" />
//               <h2 className="text-3xl font-semibold mb-10">
//                 Câu chuyện của Văn Miếu
//               </h2>
//               <div className="space-y-12 text-gray-700 leading-relaxed">
//                 {storyItems.map((text, i) => (
//                   <div className="relative" key={i}>
//                     <span className="absolute -left-[38px] top-2 w-3 h-3 rounded-full bg-amber-500" />
//                     <p>{text}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <aside className="md:col-span-5">
//               <div className="sticky top-32 rounded-3xl bg-gradient-to-br from-amber-50 to-white p-10 shadow-sm">
//                 <p className="text-sm uppercase tracking-widest text-amber-600 mb-4">
//                   Tinh hoa học vấn
//                 </p>
//                 <blockquote className="text-xl font-medium text-gray-800 leading-snug">
//                   "Hiền tài là nguyên khí của quốc gia."
//                 </blockquote>
//                 <div className="mt-10 text-sm text-gray-500">
//                   — Thân Nhân Trung
//                 </div>
//               </div>
//             </aside>
//           </section>

//           {/* ── INFO CARDS ── */}
//           <section>
//             <h2 className="text-center">Cẩm nang tham quan</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
//               <InfoCard label="Vị trí" value="Quận Đống Đa" />
//               <InfoCard label="Biểu tượng" value="Khuê Văn Các" />
//               <InfoCard label="Chủ đề" value="Giáo dục" />
//               <InfoCard label="Giá trị" value="Di sản quốc gia" />
//             </div>
//           </section>

//           {/* ── QUOTE ── */}
//           <section className="border-l-4 border-amber-500 pl-8">
//             <blockquote className="italic text-xl text-gray-700 max-w-3xl">
//               "Văn Miếu là nơi lưu giữ tinh thần hiếu học và truyền thống tôn sư
//               trọng đạo của dân tộc Việt Nam."
//             </blockquote>
//           </section>
//         </main>
//       </div>
//     </>
//   );
// }

import styles from './detail.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

/* ─── Data ───────────────────────────────────────────── */
const galleryImages = [
  {
    src: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    caption: 'Cổng Văn Miếu',
  },
  {
    src: 'https://statics.vinpearl.com/khue-van-cac-1_1677232503.jpg',
    caption: 'Khuê Văn Các',
  },
  {
    src: 'https://static.vinwonders.com/production/2025/08/bia-tien-si-van-mieu-mao-dien.jpg',
    caption: 'Bia Tiến sĩ',
  },
  {
    src: 'https://images.vietnamtourism.gov.vn/vn/images/2021/thang_7/0507.phuc_dung_mot_so_cong_trinh_tai_di_tich_ho_van.jpeg',
    caption: 'Hồ Văn',
  },
  {
    src: 'https://dbnd.1cdn.vn/2023/10/29/images-2cae99c722739fd7811264aa2403900996a2f3d0574170a58461e1d17578db37aecd895c4aeb58aa1307f3cbfbb3bac884a7f0e98f6d1708ff7d5d6c30c8863e-_n-1698594425370.jpg',
    caption: 'Sự kiện nghệ thuật',
  },
];

const storyItems = [
  'Văn Miếu – Quốc Tử Giám được xây dựng năm 1070 dưới triều Lý, nhằm thờ Khổng Tử và các bậc hiền triết.',
  'Năm 1076, Quốc Tử Giám được thành lập – trở thành trường đại học đầu tiên của Việt Nam.',
  'Hệ thống bia Tiến sĩ ghi danh những người đỗ đạt qua các kỳ thi lớn.',
  'Ngày nay, Văn Miếu là biểu tượng văn hóa và truyền thống hiếu học của Việt Nam.',
];

/* ─── Info Card ─────────────────────────────────── */
function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-white p-6 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_45px_rgba(0,0,0,0.12)] transition-all duration-300">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────── */
export default function DetailComponent() {
  return (
    <div className={cx('detail_container')}>
      {/* HERO */}
      <header
        className="relative min-h-[55vh] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://upload.wikimedia.org/wikipedia/commons/3/39/Hanoi_Temple_of_Literature_%28cropped%29.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />

        <div className="absolute bottom-12 left-8 right-8 max-w-5xl mx-auto text-white">
          <p className={cx('subheading')}>Tri thức & Truyền thống</p>

          <h1 className={cx('heading')}>Văn Miếu – Quốc Tử Giám</h1>

          <p className="mt-6 max-w-xl text-lg md:text-xl opacity-90">
            Trường đại học đầu tiên và biểu tượng hiếu học của Việt Nam
          </p>
        </div>
      </header>

      <main className="px-6 md:px-10 py-16 space-y-24 max-w-6xl mx-auto">
        {/* GALLERY */}
        <section>
          <h2>Không gian tiêu biểu</h2>

          <p className="text-gray-500 mb-10">
            Nơi hội tụ tinh hoa văn hóa và tri thức Việt
          </p>

          <div className={cx('marquee')}>
            <div className={cx('track')}>
              {[...galleryImages, ...galleryImages].map((img, i) => (
                <figure className={cx('item')} key={i}>
                  <img src={img.src} alt={img.caption} />
                  <figcaption>{img.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* IMAGE */}
        <section className="relative">
          <img
            src="https://cdn.nhandan.vn/images/1ef398c4e2fb4bf07980a2ded785b3ef2e28956fdc3a30bfc3e12514162f3d47cea35d28e55c71e7bd663360d355cd83c2f83d73e59417e978d21ae1783d0e84e667d376bf869970b83bd2a9ea12e0ea/hanam-10-2-2809.jpg"
            alt="Văn Miếu Hà Nội"
            className="w-full h-[420px] object-cover rounded-[2rem]"
          />

          <span className="absolute bottom-6 left-6 bg-black/60 text-white px-5 py-2 rounded-full text-sm tracking-wide">
            Temple of Literature · Hà Nội
          </span>
        </section>

        {/* STORY */}
        <section className="relative grid grid-cols-1 md:grid-cols-12 gap-16 max-w-6xl mx-auto">
          <div className="md:col-span-7 relative pl-10">
            <span className="absolute left-3 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-400 via-amber-200 to-transparent" />

            <h2 className="text-3xl font-semibold mb-10">
              Câu chuyện của Văn Miếu
            </h2>

            <div className="space-y-12 text-gray-700 leading-relaxed">
              {storyItems.map((text, i) => (
                <div className="relative" key={i}>
                  <span className="absolute -left-[38px] top-2 w-3 h-3 rounded-full bg-amber-500" />
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="sticky top-32 rounded-3xl bg-gradient-to-br from-amber-50 to-white p-10 shadow-sm">
              <p className="text-sm uppercase tracking-widest text-amber-600 mb-4">
                Tinh hoa học vấn
              </p>

              <blockquote className="text-xl font-medium text-gray-800 leading-snug">
                "Hiền tài là nguyên khí của quốc gia."
              </blockquote>

              <div className="mt-10 text-sm text-gray-500">
                — Thân Nhân Trung
              </div>
            </div>
          </aside>
        </section>

        {/* INFO */}
        <section>
          <h2 className="text-center">Cẩm nang tham quan</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            <InfoCard label="Vị trí" value="Quận Đống Đa" />
            <InfoCard label="Biểu tượng" value="Khuê Văn Các" />
            <InfoCard label="Chủ đề" value="Giáo dục" />
            <InfoCard label="Giá trị" value="Di sản quốc gia" />
          </div>
        </section>

        {/* QUOTE */}
        <section className="border-l-4 border-amber-500 pl-8">
          <blockquote className="italic text-xl text-gray-700 max-w-3xl">
            "Văn Miếu là nơi lưu giữ tinh thần hiếu học và truyền thống tôn sư
            trọng đạo của dân tộc Việt Nam."
          </blockquote>
        </section>
      </main>
    </div>
  );
}
