
const fileInput = document.getElementById("fileInput");
const brightnessSlider = document.getElementById("brightnessSlider");
const brightnessValue = document.getElementById("brightnessValue");
const saturationSlider = document.getElementById("saturationSlider");
const saturationValue = document.getElementById("saturationValue");
const contrastSlider = document.getElementById("contrastSlider");
const contrastValue = document.getElementById("contrastValue");
const imageContainer = document.getElementById("imageContainer");
const recomBtn=document.getElementById('recombtn1')
const recomBtn2=document.getElementById('recombtn2')
const recomBtn3=document.getElementById('recombtn3')
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

let currentIndex = 0;
let images = [];

recomBtn.addEventListener('click', () => applyRecommendation(170, 200,89));
recomBtn2.addEventListener('click', () => applyRecommendation(150, 120,125));
recomBtn3.addEventListener('click', () => applyRecommendation(130, 100,105));
resetBtn.addEventListener('click', resetAll);
prevBtn.addEventListener("click", showPreviousImage);
nextBtn.addEventListener("click", showNextImage);
fileInput.addEventListener("change", handleImageChange);
brightnessSlider.addEventListener("input", handleBrightnessChange);
saturationSlider.addEventListener("input", handleSaturationChange);
contrastSlider.addEventListener("input", handleContrastChange);

function handleImageChange() {
    currentIndex = 0;
    images = [];
    imageContainer.innerHTML = "";

    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;
            img.alt = file.name;
        
            
            img.style.filter = "brightness(100%) saturate(100%)";

            images.push(img);

            img.addEventListener('click', () => toggleZoom(img));

            if (i === files.length - 1) {
                showImage(currentIndex);
            }
        };
        reader.readAsDataURL(file);
    }
}

function showPreviousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function showImage(index) {
    imageContainer.innerHTML = "";
    imageContainer.appendChild(images[index]);

    const currentImage = images[index];
    const brightness = brightnessSlider.value;
    const saturation = saturationSlider.value;

    currentImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%)`;

    brightnessValue.textContent = `${brightness}%`;
    saturationValue.textContent = `${saturation}%`;
}

function handleBrightnessChange() {
    const brightness = brightnessSlider.value;
    const currentImage = images[currentIndex];
    currentImage.style.filter = `brightness(${brightness}%) saturate(${saturationSlider.value}%) contrast(${contrastSlider.value}%)`;
    brightnessValue.textContent = `${brightness}%`;
}

function handleSaturationChange() {
    const saturation = saturationSlider.value;
    const currentImage = images[currentIndex];
    currentImage.style.filter = `brightness(${brightnessSlider.value}%) saturate(${saturation}%) contrast(${contrastSlider.value}%)`;
    saturationValue.textContent = `${saturation}%`;
}
function handleContrastChange() {
    const contrast = contrastSlider.value;
    const currentImage = images[currentIndex];
    currentImage.style.filter = `brightness(${brightnessSlider.value}%) saturate(${saturationSlider.value}%) contrast(${contrast}%)`;
    contrastValue.textContent = `${contrast}%`;
}

function toggleZoom(img) {
    img.classList.toggle('zoomed');
}

function applyRecommendation(recommendedBrightness, recommendedSaturation, recommendedContrast) {
    brightnessSlider.value = recommendedBrightness;
    saturationSlider.value = recommendedSaturation;
    contrastSlider.value=recommendedContrast;

    brightnessValue.textContent = `${recommendedBrightness}%`;
    saturationValue.textContent = `${recommendedSaturation}%`;
    contrastValue.textContent = `${recommendedContrast}%`;

    const currentImage = images[currentIndex];
    currentImage.style.filter = `brightness(${recommendedBrightness}%) saturate(${recommendedSaturation}%) contrast(${recommendedContrast}%)`;
    
}

function resetAll() {
    const recommendedBrightness = 100;
    const recommendedSaturation = 100;
    const recommendedContrast=100;
    applyRecommendation(recommendedBrightness, recommendedSaturation,recommendedContrast);
}


const filterImagesByName = (name) => {
    const filteredImages = images.filter(image => image.alt.toLowerCase().includes(name.toLowerCase()));
    return filteredImages;
};

const updateImages = () => {
    const searchTerm = searchInput.value.trim();
    const filteredImages = filterImagesByName(searchTerm);

    if (filteredImages.length === 0) {
        imageContainer.innerHTML = '<p>No matching images found.</p>';
    } else {

        const firstMatchingImage = filteredImages[0];
        const index = images.indexOf(firstMatchingImage);

        if (index !== -1) {
            currentIndex=index
            showImage(currentIndex); 
        }
    }
};


searchInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        updateImages();
    }
});
