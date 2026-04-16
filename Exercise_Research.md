# 🏷️ Cache Mode trong Label (Cocos Creator)

Thuộc tính **CacheMode** của `Label` được dùng để tối ưu hiệu suất khi game có nhiều chữ.

---

## 📋 Các Mode

### 🔹 None _(mặc định)_

Mỗi khi nội dung Label thay đổi, hệ thống sẽ vẽ lại chữ đó vào một bộ đệm tạm thời rồi đưa lên màn hình.

|                   |                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| ✅ **Ưu điểm**    | Tiết kiệm bộ nhớ (Video Memory) vì không lưu trữ lại hình ảnh của chữ.                                               |
| ❌ **Nhược điểm** | Tốn CPU/GPU nếu nội dung thay đổi liên tục hoặc có quá nhiều Label, vì mỗi Label sẽ tạo ra một Draw Call riêng biệt. |

---

### 🔹 BITMAP

Cocos sẽ chuyển đổi toàn bộ text trong Label thành một dạng giống như **Sprite** và cố gắng đưa vào một hệ thống quản lý có tên gọi là **Dynamic Atlas**.

|                   |                                                                                                                                                                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅ **Ưu điểm**    | Cực kỳ hiệu quả để giảm Draw Call. Nhiều Label dùng chung một font có thể được gom lại chỉ trong **1 lần vẽ**. Tốc độ render rất nhanh.                                                                                                                     |
| ❌ **Nhược điểm** | Khi chỉ cần thay đổi 1 ký tự trong text, engine sẽ phải xoá Sprite cũ trong Atlas và render lại thành texture mới, sau đó nhét lại vào Dynamic Atlas. Nếu text quá dài và Atlas đầy, Cocos sẽ phải tạo thêm Atlas mới — làm tăng Draw Call và tiêu tốn RAM. |

---

### 🔹 CHAR

Cocos chia nhỏ text trong Label thành **từng ký tự (character)** và lưu từng ký tự đó vào Dynamic Atlas.

|                   |                                                                                                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅ **Ưu điểm**    | Nếu một chữ cái đã được vẽ một lần, lần sau nó sẽ được tái sử dụng cho tất cả các Label có cùng font và dùng CHAR mode. Hiệu quả khi dùng các đoạn hội thoại dài, văn bản trong `ScrollView`. |
| ❌ **Nhược điểm** | Không hỗ trợ các hiệu ứng như Gradient theo từng dòng, hoặc bẻ cong chữ. Chế độ CHAR sẽ khó xử lý hơn vì nó coi mỗi chữ là một thực thể độc lập.                                              |

---

## 📚 Tìm Hiểu Thêm

### Dynamic Atlas

> Dùng để **gom các ảnh thành Atlas trong realtime** (khi game đang chạy). Chỉ hoạt động khi chạy game.

**Tại sao cần có?**

- Tự động gộp các texture rời (không nằm trong Atlas) để **giảm Draw Calls**.
- Mỗi lần GPU chuyển từ việc vẽ Texture A sang Texture B, nó phải thực hiện một thao tác gọi là **Switch Texture** — việc này tốn thời gian hơn nhiều so với việc chỉ vẽ tiếp trên cùng một Texture.
- Khi tất cả nằm trong Dynamic Atlas, GPU không cần phải "thay bộ lọc" liên tục, giúp quá trình xử lý diễn ra trơn tru và liên tục.
- Không cần phải tạo Atlas thủ công.

**Nhược điểm:**

- Dù chỉ có vài tấm ảnh nhỏ, Engine vẫn phải cấp phát toàn bộ tấm **2048 × 2048** trong bộ nhớ card đồ họa.
- Khi một tấm ảnh cũ bị xóa đi, vùng trống nó để lại có thể quá nhỏ để nhét một tấm ảnh mới vào — mặc dù tổng diện tích trống trên Atlas vẫn còn nhiều. Engine phải tạo thêm Dynamic Atlas thứ 2, thứ 3... dẫn đến tốn VRAM và tăng Draw Call trở lại vì các đối tượng nằm rải rác trên nhiều Atlas khác nhau.
- Nếu trong một frame có quá nhiều Label Bitmap hoặc Sprite mới xuất hiện cùng lúc, game sẽ bị **khựng** do CPU quá tải.

---

### BMFont

> Là một loại định dạng font chữ mà trong đó **mỗi ký tự là một hình ảnh pixel (bitmap)** riêng biệt, thay vì là các công thức toán học (vector) như font chữ thông thường (`.ttf`, `.otf`).

**Cấu trúc:**

```
📄 file.png   →  Atlas chứa tất cả ký tự
📄 file.fnt   →  Dữ liệu tọa độ, chiều cao, khoảng cách giữa các chữ
```

**Tại sao cần có?**

- Giảm Draw Calls giống Atlas.
- Không lo tràn Dynamic Atlas do **kiểm soát hoàn toàn** những ký tự nào được xuất hiện.
- Game sẽ **không bao giờ bị khựng** do phải nạp ký tự mới vào bộ nhớ lúc đang chạy.

---

# ♻️ Component Lifecycle (Cocos Creator)

**Lifecycle (vòng đời)** là một chuỗi các callback được Cocos thực thi theo một thứ tự nhất định — từ khi một Node (hoặc Component) được khởi tạo cho đến khi nó bị tiêu hủy.

---

## 🔄 Thứ Tự Thực Thi

```
1️⃣  Khởi tạo:   onLoad  →  onEnable  →  onStart
2️⃣  Mỗi frame:  update  →  lateUpdate
3️⃣  Kết thúc:   onDisable  →  onDestroy
```

---

## 📦 Các Giai Đoạn Chính

### 🟢 Khởi Tạo

#### `onLoad()`

- Được gọi **1 lần duy nhất** ngay khi Node được kích hoạt (`active`) lần đầu tiên.
- Là nơi tốt nhất để **khởi tạo biến**, đăng ký sự kiện, hoặc truy vấn các Node con.

#### `onEnable()`

- Thực thi **sau** `onLoad` trong lần đầu.
- Thực thi **mỗi lần** `enable` của node đổi từ `false` → `true`.

#### `onStart()`

- Được gọi **1 lần duy nhất** trước khi logic `update` lần đầu tiên chạy.
- Thường dùng cho các logic cần lấy dữ liệu như gọi instance từ các Node khác — vì lúc này **mọi Node đã chạy xong `onLoad`**.

---

### 🔵 Cập Nhật

#### `update(dt)`

- Được thực thi **sau mỗi frame** (thời gian giữa các frame tuỳ thuộc vào từng thiết bị).
- Thường dùng để thực thi **logic chính của game** trong thời gian thực.

#### `lateUpdate()`

- Được thực thi **sau khi mọi logic `update` trong scene kết thúc**.
- Thường dùng để update camera sau khi mọi vật thể đã hoàn thành logic.

---

### 🔴 Kết Thúc

#### `onDisable()`

- Được thực thi **mỗi lần** `enable` của node đổi từ `true` → `false`.
- Kết hợp với `onEnable()`, thường dùng để **reset chỉ số, trạng thái** — ví dụ reset chỉ số của các object lấy từ Object Pool.

#### `onDestroy()`

- Được thực thi **sau khi** node hoặc component bị huỷ.
- Thường dùng để **huỷ sự kiện, dọn dẹp bộ nhớ**.

---

## ⚠️ Lưu Ý Quan Trọng

> `onEnable()` và `onDisable()` được thực thi **nhiều lần** nếu đổi `enable` sang `true`/`false` liên tục.

> Khi node hoặc component bị **disable**, `update()` và `lateUpdate()` sẽ **tạm dừng** và tiếp tục sau khi được enable lại.

**Node bị huỷ (`destroy`) trong các trường hợp sau:**

- Gọi hàm `node.destroy()`
- Chuyển sang Scene mới
- Node cha bị destroy

---

## 📚 Tìm Hiểu Thêm

### 🗑️ Lưu Ý Khi `destroy()`

Khi node bị destroy, vùng nhớ sẽ được **GC (Garbage Collector)** quét và giải phóng. Nếu quá nhiều node bị destroy liên tục sẽ gây **giật lag** do GC phải dọn dẹp quá nhiều.

> ✅ **Giải pháp:** Hạn chế `destroy` node và áp dụng **Object Pooling** để tái sử dụng thay vì tạo và destroy liên tục.

---

### 🖼️ Frame & FPS

**FPS (Frames Per Second)** là tốc độ hiển thị hình ảnh của một thiết bị đồ họa hoặc trò chơi. FPS **không cố định** và thay đổi tuỳ theo từng thiết bị.

**Tại sao FPS lại khác nhau trên mỗi thiết bị?**

| Nguyên nhân                                | Giải thích                                                                                                                                                                                      |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 💻 **Phần cứng**                           | CPU và GPU phải thực hiện hàng triệu phép tính, render hình ảnh — máy yếu và máy mạnh sẽ có tốc độ xử lý khác nhau.                                                                             |
| 📺 **Tốc độ quét màn hình (Refresh Rate)** | Là giới hạn vật lý của màn hình. Màn hình phổ thông: **60Hz**, cao cấp: **90Hz / 120Hz / 144Hz+**. Dù GPU đủ sức chạy 100FPS nhưng nếu màn hình chỉ 60Hz thì thiết bị vẫn chỉ tối đa **60FPS**. |
| 🌡️ **Tình trạng thiết bị**                 | Khi thiết bị nóng đến nhiệt độ nhất định, hệ thống sẽ **tự động bóp hiệu năng** (thermal throttling) để bảo vệ linh kiện, khiến FPS giảm.                                                       |
