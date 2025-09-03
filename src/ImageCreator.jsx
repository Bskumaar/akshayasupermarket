import React, { useState, useRef } from "react";

function ImageCreator() {
  const [image, setImage] = useState(null);
  const [topText, setTopText] = useState("");
  const [mrp, setMrp] = useState("");
  const [ourPrice, setOurPrice] = useState("");
  const [save, setSave] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null); 
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleCreateImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = 600;
    const height = 800;
    canvas.width = width;
    canvas.height = height;

    // Card background
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);

    // Top store name
    ctx.fillStyle = "#0d6efd"; // blue
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Akshaya Super Market, Perambalur-9500080808", width / 2, 40);

    // Draw uploaded image
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        const imgHeight = height * 0.45;
        ctx.drawImage(img, 0, 60, width, imgHeight); // leave space for top name

        // Custom texts
        ctx.textAlign = "center";

        ctx.fillStyle = "#0d6efd"; 
        ctx.font = "bold 28px Arial";
        ctx.fillText(topText, width / 2, imgHeight + 100);

        ctx.fillStyle = "#6c757d";
        ctx.font = "20px Arial";
        ctx.fillText(`MRP: ₹${mrp}`, width / 2, imgHeight + 150);

        ctx.fillStyle = "#198754";
        ctx.font = "bold 24px Arial";
        ctx.fillText(`நம்ம விலை: ₹${ourPrice}`, width / 2, imgHeight + 200);

        ctx.fillStyle = "#dc3545";
        ctx.font = "bold 22px Arial";
        ctx.fillText(`சேமிப்பு: ₹${save}`, width / 2, imgHeight + 250);

        // Footer text
        ctx.fillStyle = "#000";
        ctx.font = "16px Arial";
        ctx.fillText("@Akshaya Super Market, Perambalur-9500080808", width / 2, height - 30);

        // Update preview
        setPreviewUrl(canvas.toDataURL("image/png"));
      };
    }
  };

  const handleDownload = () => {
    if (previewUrl) {
      const link = document.createElement("a");
      link.download = "offer-card.png";
      link.href = previewUrl;
      link.click();
    }
  };

  return (

    <div className="container py-5">
      
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "650px" }}>
         <div className="text-center mb-4">
  <h1 className="display-4 fw-bold text-primary">Akshaya Super Market</h1>
  <h5 className="text-secondary">Perambalur-9500080808</h5>
</div>

        <h2 className="text-center mb-4 text-primary fw-bold">🛒 Offer Card உருவாக்கு</h2>

        <div className="mb-3">
          <label className="form-label fw-semibold">படத்தை Upload செய்ய</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="form-control" />
        </div>

        <div className="mb-3">
          <input type="text" placeholder="MRP" value={mrp} onChange={e => setMrp(e.target.value)} className="form-control mb-2" />
          <input type="text" placeholder="நம்ம விலை" value={ourPrice} onChange={e => setOurPrice(e.target.value)} className="form-control mb-2" />
          <input type="text" placeholder="சேமிப்பு" value={save} onChange={e => setSave(e.target.value)} className="form-control mb-2" />
        </div>

        <div className="d-flex justify-content-center gap-3 mb-3">
          <button onClick={handleCreateImage} className="btn btn-primary">Create Card</button>
          <button onClick={handleDownload} className="btn btn-success">Download</button>
        </div>

        {/* Preview */}
        {previewUrl && (
          <div className="text-center">
            <div className="card shadow p-2 mx-auto" style={{ maxWidth: "600px" }}>
              <img src={previewUrl} alt="Offer Card" className="img-fluid rounded" />
            </div>
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>
    </div>
  );
}

export default ImageCreator;
