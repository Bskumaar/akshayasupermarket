"use client"

import { useState, useRef, useCallback, useEffect } from "react"

function ImageCreator() {
  const [image, setImage] = useState(null)
  const [productName, setProductName] = useState("")
  const [mrp, setMrp] = useState("")
  const [ourPrice, setOurPrice] = useState("")
  const [save, setSave] = useState("0")
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState("")
  const [selectedStyle, setSelectedStyle] = useState("style1")
  const canvasRef = useRef(null)

  const styleOptions = [
    { id: "style1", name: "Modern Orange", previewColor: "bg-orange-500" },
    { id: "style2", name: "Elegant Blue", previewColor: "bg-blue-500" },
    { id: "style3", name: "Premium Gold", previewColor: "bg-yellow-500" },
    { id: "style4", name: "Fresh Green", previewColor: "bg-green-500" },
    { id: "style5", name: "Vibrant Purple", previewColor: "bg-purple-500" }
  ]

  // Save calculation
  useEffect(() => {
    if (mrp && ourPrice) {
      const m = parseInt(mrp, 10) || 0
      const p = parseInt(ourPrice, 10) || 0
      const s = Math.max(0, m - p)
      setSave(s.toString())
    } else setSave("0")
  }, [mrp, ourPrice])

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB")
        return
      }
      setError("")
      setImage(URL.createObjectURL(file))
    }
  }, [])

  const handleNumericInput = useCallback((e, setter) => {
    const value = e.target.value
    if (value === "" || /^\d+$/.test(value)) setter(value)
  }, [])

  const handleProductNameChange = useCallback((e) => {
    const value = e.target.value
    if (value.length <= 30) {
      setProductName(value)
    }
  }, [])

  const getStyleColors = (styleId) => {
    switch(styleId) {
      case "style1": return { 
        titleGradient: ["#f97316","#ea580c"], 
        mrpGradient: ["#FF9933", "#FF9933"], // Indian Saffron (exact flag color)
        priceGradient: ["#FFFFFF", "#FFFFFF"], // Indian White (exact flag color)
        saveGradient: ["#138808", "#138808"], // Indian Green (exact flag color)
        footerColor: "#f97316", 
        phoneColor: "0f172a", 
        continentalColor: "#0f172a", 
        borderColor: "#fdba74",
        priceBorderColor: "#3b82f6", // Blue border for Our Price box
        mrpTextColor: "#000000", // Black text for MRP
        priceTextColor: "#000000", // Black text for Our Price
        saveTextColor: "#000000" // Black text for Save
      }
      case "style2": return { 
        titleGradient: ["#0ea5e9","#0369a1"], 
        mrpGradient:["#6366f1","#4f46e5"], 
        priceGradient:["#0ea5e9","#0369a1"], 
        saveGradient:["#8b5cf6","#7c3aed"], 
        footerColor:"#1e40af", 
        phoneColor:"#374151", 
        continentalColor:"#1e3a8a", 
        borderColor:"#93c5fd",
        priceBorderColor: "#93c5fd",
        mrpTextColor: "#ffffff",
        priceTextColor: "#ffffff",
        saveTextColor: "#ffffff"
      }
      case "style3": return { 
        titleGradient: ["#d97706","#b45309"], 
        mrpGradient:["#ef4444","#dc2626"], 
        priceGradient:["#d97706","#b45309"], 
        saveGradient:["#a16207","#854d0e"], 
        footerColor:"#78350f", 
        phoneColor:"#57534e", 
        continentalColor:"#713f12", 
        borderColor:"#fcd34d",
        priceBorderColor: "#fcd34d",
        mrpTextColor: "#ffffff",
        priceTextColor: "#ffffff",
        saveTextColor: "#ffffff"
      }
      case "style4": return { 
        titleGradient: ["#22c55e","#15803d"], 
        mrpGradient:["#ef4444","#dc2626"], 
        priceGradient:["#22c55e","#15803d"], 
        saveGradient:["#84cc16","#65a30d"], 
        footerColor:"#166534", 
        phoneColor:"#374151", 
        continentalColor:"#14532d", 
        borderColor:"#86efac",
        priceBorderColor: "#86efac",
        mrpTextColor: "#ffffff",
        priceTextColor: "#ffffff",
        saveTextColor: "#ffffff"
      }
      case "style5": return { 
        titleGradient: ["#a855f7","#9333ea"], 
        mrpGradient:["#ef4444","#dc2626"], 
        priceGradient:["#a855f7","#9333ea"], 
        saveGradient:["#ec4899","#db2777"], 
        footerColor:"#6b21a8", 
        phoneColor:"#4b5563", 
        continentalColor:"#581c87", 
        borderColor:"#d8b4fe",
        priceBorderColor: "#d8b4fe",
        mrpTextColor: "#ffffff",
        priceTextColor: "#ffffff",
        saveTextColor: "#ffffff"
      }
      default: return { 
        titleGradient:["#f97316","#ea580c"], 
        mrpGradient:["#ef4444","#dc2626"], 
        priceGradient:["#10b981","#059669"], 
        saveGradient:["#3b82f6","#2563eb"], 
        footerColor:"#1e293b", 
        phoneColor:"#64748b", 
        continentalColor:"#0f172a", 
        borderColor:"#fdba74",
        priceBorderColor: "#3b82f6",
        mrpTextColor: "#ffffff",
        priceTextColor: "#ffffff",
        saveTextColor: "#ffffff"
      }
    }
  }

  // Draw canvas
  const drawOnCanvas = useCallback(
    (ctx, width, height, img) => {
      const colors = getStyleColors(selectedStyle)
      
      // Add border around the entire canvas with rounded corners
      const borderWidth = 4;
      const borderRadius = 10; // Increased from default for rounder corners
      
      // Draw rounded border
      ctx.fillStyle = colors.borderColor;
      ctx.beginPath();
      ctx.roundRect(0, 0, width, height, borderRadius);
      ctx.fill();
      
      // Draw white background slightly smaller to create border effect with rounded corners
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.roundRect(borderWidth, borderWidth, width - borderWidth * 2, height - borderWidth * 2, borderRadius - 4);
      ctx.fill();

      // Fixed font size of 42px
      const titleFontSize = 42
      const titleGradient = ctx.createLinearGradient(0,30 + borderWidth,0,80 + borderWidth)
      titleGradient.addColorStop(0, colors.titleGradient[0])
      titleGradient.addColorStop(1, colors.titleGradient[1])
      ctx.fillStyle = titleGradient
      ctx.font = `bold ${titleFontSize}px 'Segoe UI', Arial, sans-serif`
      ctx.textAlign = "center"
      
      // Truncate product name if it's too long
      const displayName = productName.length > 30 
        ? productName.substring(0, 27) + "..." 
        : productName || "Product Name"
      
      ctx.fillText(displayName, width/2, 70 + borderWidth)

      if(img){
        const boxY = 100 + borderWidth
        const boxHeight = height-200 - borderWidth
        const imgWidth = width/2 - 60
        const imgHeight = boxHeight

        // Left image
        ctx.save()
        ctx.beginPath()
        ctx.roundRect(40 + borderWidth, boxY, imgWidth, imgHeight, 15)
        ctx.clip()
        ctx.drawImage(img,40 + borderWidth,boxY,imgWidth,imgHeight)
        ctx.restore()
        ctx.strokeStyle = "#e2e8f0"
        ctx.lineWidth = 1
        ctx.roundRect(40 + borderWidth, boxY, imgWidth, imgHeight, 15)
        ctx.stroke()

        // Right price boxes
        const boxX = width/2 + 20
        const boxWidth = width/2 - 60
        
        // Increased heights for MRP and Save boxes
        const mrpHeight = boxHeight*0.20  // Increased from 0.2 to 0.25
        const ourPriceHeight = boxHeight*0.6  // Decreased from 0.6 to 0.5 to accommodate larger MRP and Save boxes
        const saveHeight = boxHeight*0.20  // Increased from 0.2 to 0.25

        // MRP - Indian Saffron
        const mrpGradient = ctx.createLinearGradient(boxX, boxY, boxX, boxY+mrpHeight)
        mrpGradient.addColorStop(0, colors.mrpGradient[0])
        mrpGradient.addColorStop(1, colors.mrpGradient[1])
        ctx.fillStyle = mrpGradient
        ctx.beginPath()
        ctx.roundRect(boxX, boxY, boxWidth, mrpHeight-10, 12)
        ctx.fill()
        ctx.fillStyle = colors.mrpTextColor
        ctx.textAlign = "center"
        // Increased MRP font size from 28px to 38px
        ctx.font = "bold 43px 'Segoe UI'"
        ctx.fillText(`MRP ₹${mrp||"0"}`, boxX+boxWidth/2, boxY+mrpHeight/2+10)

        // Our Price - Indian White with EXTREMELY LARGE text
        const priceY = boxY+mrpHeight
        const priceGradient = ctx.createLinearGradient(boxX, priceY, boxX, priceY+ourPriceHeight)
        priceGradient.addColorStop(0, colors.priceGradient[0])
        priceGradient.addColorStop(1, colors.priceGradient[1])
        ctx.fillStyle = priceGradient
        ctx.beginPath()
        ctx.roundRect(boxX, priceY, boxWidth, ourPriceHeight-10, 12)
        ctx.fill()
        
        // Add blue border to Our Price box for Modern Orange style
        ctx.strokeStyle = colors.priceBorderColor
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(boxX, priceY, boxWidth, ourPriceHeight-10, 12)
        ctx.stroke()
        
        ctx.fillStyle = colors.priceTextColor
        ctx.textAlign = "center"
        
        // Very large "Our Price" text - increased from 36px to 44px
        ctx.font = "bold 50px 'Segoe UI'"
        ctx.fillText("Our Price", boxX+boxWidth/2, priceY+ourPriceHeight/2-40)
        
        // EXTREMELY large price text - "₹" and price on same line - increased from 70px to 85px
        ctx.font = "bold 90px 'Segoe UI'"
        ctx.fillText(`₹${ourPrice||"0"}`, boxX+boxWidth/2, priceY+ourPriceHeight/2+40)

        // Save - Indian Green
        const saveY = priceY+ourPriceHeight
        const saveGradient = ctx.createLinearGradient(boxX, saveY, boxX, saveY+saveHeight)
        saveGradient.addColorStop(0, colors.saveGradient[0])
        saveGradient.addColorStop(1, colors.saveGradient[1])
        ctx.fillStyle = saveGradient
        ctx.beginPath()
        ctx.roundRect(boxX, saveY, boxWidth, saveHeight-10, 12)
        ctx.fill()
        ctx.fillStyle = colors.saveTextColor
        ctx.textAlign = "center"
        // Increased Save font size from 28px to 38px
        ctx.font = "bold 43px 'Segoe UI'"
        ctx.fillText(`You Save ₹${save||"0"}`, boxX+boxWidth/2, saveY+saveHeight/2+10)

        // Footer
        ctx.fillStyle = colors.footerColor
        ctx.font = "600 26px 'Segoe UI'"
        ctx.textBaseline = "bottom"
        ctx.textAlign = "center"
        ctx.fillText("Akshaya Super Market, Perambalur", width/2, height-50 - borderWidth)
        ctx.fillStyle = colors.phoneColor
        ctx.font = "500 22px 'Segoe UI'"
        ctx.fillText("📞 9500 080808", width/2, height-20 - borderWidth)
        ctx.fillStyle = colors.continentalColor
        ctx.font = "italic 22px 'Segoe UI'"
        ctx.textAlign = "right"
        ctx.fillText("Conditions Apply", width-30 - borderWidth, height-20 - borderWidth)
      }
    },
    [productName, mrp, ourPrice, save, selectedStyle]
  )

  const handleCreateImage = useCallback(() => {
    if(!image){ setError("Please upload an image first"); return }
    if(!productName){ setError("Please enter a product name"); return }
    setError("")
    setIsCreating(true)
    setTimeout(()=>{
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      const width = 800
      const height = 650
      canvas.width = width
      canvas.height = height
      const imgObj = new Image()
      imgObj.src = image
      imgObj.onload = () => {
        drawOnCanvas(ctx,width,height,imgObj)
        setPreviewUrl(canvas.toDataURL("image/png"))
        setIsCreating(false)
        document.getElementById("preview-section").scrollIntoView({behavior:"smooth"})
      }
    },500)
  },[image, productName, drawOnCanvas])

  const handleDownload = useCallback(() => {
    if(previewUrl){
      const link = document.createElement("a")
      const fileName = (productName || "offer-card").replace(/\s+/g,"_")+".png"
      link.download = fileName
      link.href = previewUrl
      link.click()
    }
  },[previewUrl, productName])

  const handleReset = useCallback(()=>{
    setImage(null)
    setProductName("")
    setMrp("")
    setOurPrice("")
    setSave("0")
    setPreviewUrl(null)
    setError("")
    setSelectedStyle("style1")
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-8">
        <h2 className="text-center mb-6 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">
          🛒 Offer Card Generator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-5 rounded-lg">
            <label className="block font-medium text-gray-700 mb-2">Upload Product Image</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all duration-300">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF (Max 5MB)</p>
                </div>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden"/>
              </label>
            </div>
            {image && <div className="mt-4 text-center"><img src={image} alt="Preview" className="mx-auto h-32 object-contain rounded-lg border"/></div>}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700 mb-2">Product Name (max 30 characters)</label>
              <input 
                type="text" 
                placeholder="Enter product name" 
                value={productName} 
                onChange={handleProductNameChange} 
                maxLength={30}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {productName.length}/30 characters
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">MRP (₹)</label>
                <input type="text" placeholder="0" value={mrp} onChange={(e)=>handleNumericInput(e,setMrp)} className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"/>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-2">Our Price (₹)</label>
                <input type="text" placeholder="0" value={ourPrice} onChange={(e)=>handleNumericInput(e,setOurPrice)} className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"/>
              </div>
            </div>

            {/* Style selection */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">Card Style</label>
              <div className="grid grid-cols-5 gap-2">
                {styleOptions.map((style)=>(
                  <button key={style.id} onClick={()=>setSelectedStyle(style.id)} className={`h-10 rounded-md flex items-center justify-center transition-all ${selectedStyle===style.id ? "ring-2 ring-offset-2 ring-orange-500" : "opacity-70 hover:opacity-100"}`} title={style.name}>
                    <div className={`w-8 h-8 rounded-full ${style.previewColor}`}></div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">Selected: {styleOptions.find(s=>s.id===selectedStyle)?.name}</p>
            </div>

            {error && <div className="text-red-500 p-3 bg-red-50 rounded-lg">{error}</div>}

            <div className="flex gap-3 justify-center pt-4">
              <button onClick={handleCreateImage} disabled={isCreating} className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-lg transition-all shadow-md hover:shadow-lg">
                {isCreating ? <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>Creating...</> : <>Create Offer Card</>}
              </button>
              <button onClick={handleReset} className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-all">Reset</button>
            </div>
          </div>
        </div>

        {previewUrl && (
          <div id="preview-section" className="mt-8 bg-gray-50 p-5 rounded-lg">
            <h3 className="text-center text-xl font-semibold text-gray-800 mb-4">Offer Card Preview</h3>
            <div className="flex justify-center">
              <div className="relative w-full max-w-lg">
                <img src={previewUrl} alt="Offer Card" className="w-full rounded-lg"/>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button onClick={handleDownload} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium">Download</button>
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>
    </div>
  )
}

export default ImageCreator