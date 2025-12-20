// ==== CẤU HÌNH FIREBASE ====
const firebaseConfig = { 
  apiKey : "AIzaSyDU5ZLLQFOtFFO3VtKYj9Dc-ZjzUhOFHvE",
  authDomain : "jsi07-e13da.firebaseapp.com",
  projectId : "jsi07-e13da",
  storageBucket : "jsi07-e13da.firebasestorage.app",
  messagingSenderId : "54277847367",
  appId : "1:54277847367:web:b435e153e4f892c23cb462"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// ================== XOÁ BÀI HÁT ==================
async function deleteProduct(id) {
    try {
        await db.collection("Music").doc(id).delete();
        console.log("Đã xoá bài hát:", id);
    } catch (error) {
        console.error("Lỗi khi xoá bài hát:", error);
    }
}

// ================== LOAD PLAYLIST ==================
async function loadProducts() {
    const productTableBody = document.getElementById("product-list");
    let htmls = "";
    let index = 1;

    try {
        const querySnapshot = await db.collection("Music").get();

        querySnapshot.forEach((doc) => {
            const product = doc.data();

            const songData = {
                id: doc.id,
                image: product.image,
                title: product.title,
                artist: product.artist,
                audioUrl: product.audioUrl
            };

            htmls += `
            <tr class="song-row" data-song='${JSON.stringify(songData).replace(/'/g, "&apos;")}' >
                <th>${index}</th>
                <td><img src="${product.image}" alt="${product.title}"></td>
                <td>${product.title}</td>
                <td>${product.artist}</td>
                <td>
                    <button class="btn-delete-product" data-id="${doc.id}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>`;
            index++;
        });

        productTableBody.innerHTML = htmls;

        // CLICK CHUYỂN QUA TRANG PHÁT NHẠC
        const rows = document.querySelectorAll(".song-row");
        rows.forEach(row => {
            row.addEventListener("click", () => {
                let songData = row.dataset.song;
                songData = songData.replace(/&apos;/g, "'");

                const song = JSON.parse(songData);
                localStorage.setItem("currentSong", JSON.stringify(song));
                window.location.href = "product.html";
            });
        });

        // NÚT XOÁ
        const btnDeleteProduct = document.querySelectorAll(".btn-delete-product");
        btnDeleteProduct.forEach(btn => {
            btn.addEventListener("click", async (e) => {
                e.stopPropagation();

                const id = btn.getAttribute("data-id");
                if (confirm("Bạn có chắc muốn xoá bài hát này?")) {
                    await deleteProduct(id);
                    loadProducts();
                }
            });
        });

    } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
    }
}

loadProducts();

// ================== UPLOAD BÀI HÁT ==================
const uploadIcon = document.querySelector(".fa-pen-to-square");
const uploadModal = document.getElementById("uploadModal");
const closeModal = document.getElementById("closeModal");
const uploadBtn = document.getElementById("uploadBtn");

uploadIcon.addEventListener("click", () => {
    uploadModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
    uploadModal.style.display = "none";
});

uploadBtn.addEventListener("click", async () => {
    const title = document.getElementById("songTitle").value.trim();
    const artist = document.getElementById("songArtist").value.trim();
    const imageFile = document.getElementById("songImage").files[0];
    const audioFile = document.getElementById("songAudio").files[0];

    if (!title || !artist || !imageFile || !audioFile) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    try {
        const imgRef = storage.ref("images/" + Date.now() + "_" + imageFile.name);
        await imgRef.put(imageFile);
        const imageUrl = await imgRef.getDownloadURL();

        const audioRef = storage.ref("songs/" + Date.now() + "_" + audioFile.name);
        await audioRef.put(audioFile);
        const audioUrl = await audioRef.getDownloadURL();

        await db.collection("Music").add({
            title: title,
            artist: artist,
            image: imageUrl,
            audioUrl: audioUrl
        });

        alert("Upload thành công 🎵");

        document.getElementById("songTitle").value = "";
        document.getElementById("songArtist").value = "";
        document.getElementById("songImage").value = "";
        document.getElementById("songAudio").value = "";

        uploadModal.style.display = "none";
        loadProducts();

    } catch (error) {
        console.error(error);
        alert("Upload thất bại");
    }
});