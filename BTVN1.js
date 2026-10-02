const readline = require("readline-sync");

// Bảng giá cố định phụ kiện Gym (VNĐ)
const PRICE_TABLE = {
  SHAKER: 120000,
  GLOVES: 180000,
  STRAP: 150000,
};

// Biến lưu trữ trạng thái đơn hàng trong bộ nhớ
let currentOrderCode = "";
let isOrderValid = false;

// Hàm hỗ trợ định dạng số tiền VND
function formatCurrency(amount) {
  return amount.toLocaleString("vi-VN") + " VND";
}

// Vòng lặp Menu chính
let choice = 0;

do {
  console.log("\n========================================");
  console.log("   HE THONG BAN LE PHU KIEN PHONG GYM   ");
  console.log("========================================");
  console.log("1. Nhap va chuan hoa ma don hang");
  console.log("2. Tinh tien va in hoa don phu kien");
  console.log("3. Thoat chuong trinh");
  console.log("========================================");

  choice = parseInt(readline.question("Chon chuc nang (1-3): "));

  switch (choice) {
    case 1: {
      console.log("\n--- NHAP & CHUAN HOA MA DON HANG ---");
      const rawCode = readline.question(
        "Nhap ma don (VD: gym-shaker-gloves-vip): "
      );

      // Chuẩn hóa chuỗi mã đơn
      const cleanCode = rawCode.trim().toUpperCase();

      // Kiểm tra tính hợp lệ
      if (cleanCode.length < 8) {
        console.log(" Lỗi: Độ dài mã đơn hàng phải từ 8 ký tự trở lên!");
        isOrderValid = false;
      } else if (!cleanCode.startsWith("GYM-")) {
        console.log(" Lỗi: Mã đơn hàng phải bắt đầu bằng tiền tố 'GYM-'!");
        isOrderValid = false;
      } else {
        currentOrderCode = cleanCode;
        isOrderValid = true;
        console.log(` Mã đơn hàng hợp lệ: "${currentOrderCode}"`);
      }
      break;
    }

    case 2: {
      console.log("\n--- IN HOA DON BAN LE PHU KIEN ---");

      // Kiểm tra tiền điều kiện trước khi in
      if (!isOrderValid || !currentOrderCode) {
        console.log(" Vui lòng nhập mã đơn hàng hợp lệ ở Chức năng 1 trước!");
        break;
      }

      // Phân tách các phần tử trong mã đơn
      const parts = currentOrderCode.split("-");
      const isVIP = parts.includes("VIP");

      let subtotal = 0;
      const itemsList = [];

      // Tính toán các món hàng có trong đơn
      for (const item of parts) {
        if (PRICE_TABLE[item]) {
          itemsList.push({
            name: item,
            price: PRICE_TABLE[item],
          });
          subtotal += PRICE_TABLE[item];
        }
      }

      if (itemsList.length === 0) {
        console.log(" Không tìm thấy phụ kiện hợp lệ nào trong mã đơn!");
        break;
      }

      // Tính chiết khấu giảm giá VIP (10%)
      const discount = isVIP ? subtotal * 0.1 : 0;
      const finalTotal = subtotal - discount;

      // In hóa đơn ra Console
      console.log("-".repeat(40));
      console.log("       HOA DON BAN LE PHU KIEN GYM      ");
      console.log("-".repeat(40));
      console.log(`Ma don hang : ${currentOrderCode}`);
      console.log(`Loai khach  : ${isVIP ? "HOI VIEN VIP (-10%)" : "THUONG"}`);
      console.log("-".repeat(40));
      console.log(
        `${"TEN PHU KIEN".padEnd(20)}${"THANH TIEN".padStart(20)}`
      );
      console.log("-".repeat(40));

      for (const item of itemsList) {
        const nameStr = item.name.padEnd(20);
        const priceStr = formatCurrency(item.price).padStart(20);
        console.log(`${nameStr}${priceStr}`);
      }

      console.log("-".repeat(40));
      console.log(
        `${"Tam tinh:".padEnd(20)}${formatCurrency(subtotal).padStart(20)}`
      );
      if (isVIP) {
        console.log(
          `${"Giam gia VIP (10%):".padEnd(20)}${formatCurrency(-discount).padStart(20)}`
        );
      }
      console.log("-".repeat(40));
      console.log(
        `${"TONG CONG:".padEnd(20)}${formatCurrency(finalTotal).padStart(20)}`
      );
      console.log("=".repeat(40));
      console.log("  CAM ON QUY KHACH - HEN GAP LAI!  ");
      console.log("=".repeat(40));
      break;
    }

    case 3:
      console.log("\nCam on ban da su dung phan me. Tam biet!");
      break;

    default:
      console.log("\n Lựa chọn không hợp lệ! Vui lòng chọn từ 1 đến 3.");
      break;
  }
} while (choice !== 3);