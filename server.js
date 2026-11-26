
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// HTMLファイルを公開する
app.use(express.static(path.join(__dirname, "public")));

// Dog APIから犬の画像を取得する
app.get("/api/dog", async (req, res) => {
  try {
    const response = await fetch(
      "https://dog.ceo/api/breeds/image/random"
    );

    if (!response.ok) {
      throw new Error("Dog APIへの接続に失敗しました");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "犬の画像を取得できませんでした"
    });
  }
});

// サーバーを起動する
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
