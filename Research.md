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
