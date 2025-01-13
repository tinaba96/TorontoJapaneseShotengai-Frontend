import Link from "next/link";
import Image from "next/image";
import styles from "./AllContents.module.css";

// interface ContentsItem {
//   id: number;
//   date: string;
//   title: string;
//   link: string;
// }

// const contentItems: ContentsItem[] = [
//   {
//     id: 1,
//     date: "2023-05-01",
//     title: "JAPANサマーフェスティバル開催決定",
//     link: "/news/1",
//   },
//   {
//     id: 2,
//     date: "2023-04-15",
//     title: "新規ショップオープンのお知らせ",
//     link: "/news/2",
//   },
//   {
//     id: 3,
//     date: "2023-04-01",
//     title: "ゴールデンウィークイベント情報",
//     link: "/news/3",
//   },
// ];

const AllContents = () => {
  return (
    <section
      className={`${styles["shinsaibashi-index"]} ${styles["fade"]} ${styles["inview-PxSt0lkin2"]} ${styles["inview"]}`}
    >
      <div className={`${styles["for_inbound_button_wrap"]}`}>
        <Link href="https://forms.gle/nNQfVLwU6yrVL2DC6/" target="_blank">
          <div className={`${styles["loop_inner"]}`}>
            <p className={`${styles["img_box"]}`}>
              <Image
                alt="For-inbound_01"
                src="/images/bg.png"
                width={300}
                height={200}
              />
            </p>
            <p className={`${styles["img_box"]}`}>
              <Image
                alt="For-inbound_02"
                src="/images/bg.png"
                width={300}
                height={200}
              />
            </p>
          </div>
          <p className={`${styles["lead"]}`}>
            <span>【企業様】新規登録はこちら</span>
            <svg
              id="レイヤー_1"
              data-name="レイヤー 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 79.83 78.03"
            >
              <polygon
                points="40.82 0 33.5 7.32 60.03 33.84 0 33.84 0 44.19 60.03 44.19 33.5 70.71 40.82 78.03 72.52 46.33 79.83 39.01 40.82 0"
                className={`${styles["cls-1"]}`}
              ></polygon>
            </svg>
          </p>
        </Link>
      </div>

      <div className={`${styles["block-inner"]}`}>
        <div className={`${styles["top-index"]} ${styles["top-index-Left"]}`}>
          <div className={`${styles["map"]}`}>
            <Link href="/map/">
              <Image
                src="/images/default2.png"
                alt="MAP"
                width={300}
                height={200}
              />
              <div className={`${styles["fg"]}`}>
                <h1>MAP</h1>
                <h2>TJSのお店を探す</h2>
              </div>
            </Link>
          </div>
          <div className={`${styles["walk"]}`}>
            <Link href="/blogs/">
              <Image
                src="/images/default.png"
                alt="BLOG"
                width={300}
                height={200}
              />
              <div className={`${styles["fg"]}`}>
                <h1>BLOG</h1>
                <h2>TJSのお店をご紹介</h2>
              </div>
            </Link>
          </div>
          <div className={`${styles["event"]}`}>
            <Link href="/events">
              <Image
                src="/images/default.png"
                alt="EVENT, CAMPAIGN"
                width={300}
                height={200}
              />
              <div className={`${styles["fg"]}`}>
                <h1>
                  EVENT, <br className={`${styles["only-sp"]}`} />
                  CAMPAIGN
                </h1>
                <h2>開催中のイベント・キャンペーン</h2>
              </div>
            </Link>
          </div>
        </div>

        <div className={`${styles["top-index"]} ${styles["top-index-Right"]}`}>
          <div className={`${styles["tenant"]}`}>
            <Link href="https://forms.gle/nNQfVLwU6yrVL2DC6/">
              <Image
                src="/images/default2.png"
                alt="TENANT OWNER"
                width={300}
                height={200}
              />
              <div className={`${styles["fg"]}`}>
                <h1>
                  TENANT
                  <br />
                  OWNER
                </h1>
                <h2>テナント事業者様へ</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllContents;
