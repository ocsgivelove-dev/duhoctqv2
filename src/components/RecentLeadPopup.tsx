import { useEffect, useState } from "react";

const NAMES = [
  "Trần Văn Nam",
  "Nguyễn Thị Hà",
  "Lê Minh Quân",
  "Phạm Thu Trang",
  "Hoàng Văn Dũng",
  "Đỗ Thị Mai",
  "Vũ Đức Anh",
  "Bùi Thanh Tùng",
  "Ngô Thị Lan",
  "Đặng Hữu Phước",
];

const CITIES = [
  "Bình Dương",
  "Hà Nội",
  "Bắc Giang",
  "Nghệ An",
  "Thanh Hóa",
  "Hải Phòng",
  "Đồng Nai",
  "Thái Nguyên",
  "Cần Thơ",
  "Đắk Lắk",
];

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)] as T;
}

/** Thông báo "khách vừa đăng ký" trượt lên góc dưới bên trái. */
export function RecentLeadPopup() {
  const [item, setItem] = useState<{ name: string; city: string; mins: number } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hideTimer: number | undefined;
    let nextTimer: number | undefined;

    const show = () => {
      setItem({ name: pick(NAMES), city: pick(CITIES), mins: 1 + Math.floor(Math.random() * 9) });
      setVisible(true);
      hideTimer = window.setTimeout(() => setVisible(false), 5500);
      nextTimer = window.setTimeout(show, 5500 + 10000 + Math.random() * 5000);
    };

    const first = window.setTimeout(show, 6000);
    return () => {
      window.clearTimeout(first);
      if (hideTimer) window.clearTimeout(hideTimer);
      if (nextTimer) window.clearTimeout(nextTimer);
    };
  }, []);

  if (!item) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed bottom-24 left-3 z-40 max-w-[17rem] rounded-2xl bg-card/90 p-3 shadow-[var(--shadow-card)] ring-1 ring-border backdrop-blur transition-all duration-500 sm:bottom-6 sm:left-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <p className="text-xs leading-snug text-card-foreground">
        <span className="font-bold">{item.name}</span>{" "}
        <span className="text-muted-foreground">({item.city})</span> vừa đăng ký nhận tư vấn
      </p>
      <p className="mt-1 text-[11px] font-semibold text-primary">{item.mins} phút trước</p>
    </div>
  );
}
