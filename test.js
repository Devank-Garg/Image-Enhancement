// DOM elements
const fileInput = document.getElementById("fileInput");
const brightnessSlider = document.getElementById("brightnessSlider");
const brightnessValue = document.getElementById("brightnessValue");
const saturationSlider = document.getElementById("saturationSlider");
const saturationValue = document.getElementById("saturationValue");
const contrastSlider = document.getElementById("contrastSlider");
const contrastValue = document.getElementById("contrastValue");
const imageContainer = document.getElementById("imageContainer");
const recomBtn = document.getElementById('recombtn1');
const recomBtn2 = document.getElementById('recombtn2');
const recomBtn3 = document.getElementById('recombtn3');
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const switchBtn = document.getElementById("SwitchBtn");
const prevBtn2 = document.getElementById("prevBtn2");
const nextBtn2 = document.getElementById("nextBtn2");
const grayscaleBtn = document.getElementById('GrayscaleBtn');
const rotateBtn = document.getElementById('RotateBtn');
const mirrorBtn = document.getElementById('MirrorBtn');

// Variables
let currentIndex = 0;
let images = [];
let advanceFeaturesMode = false;

// Event listeners
recomBtn.addEventListener('click', () => applyRecommendation(170, 200, 89));
recomBtn2.addEventListener('click', () => applyRecommendation(150, 120, 125));
recomBtn3.addEventListener('click', () => applyRecommendation(130, 100, 105));
resetBtn.addEventListener('click', resetAll);
resetBtn2.addEventListener('click', resetAll);
prevBtn.addEventListener("click", showPreviousImage);
nextBtn.addEventListener("click", showNextImage);
fileInput.addEventListener("change", handleImageChange);
brightnessSlider.addEventListener("input", handleBrightnessChange);
saturationSlider.addEventListener("input", handleSaturationChange);
contrastSlider.addEventListener("input", handleContrastChange);
mirrorBtn.addEventListener('click', toggleMirrorImage);

searchInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        updateImages();
    }
});

switchBtn.addEventListener("click", toggleAdvanceFeatures);
prevBtn2.addEventListener("click", showPreviousImage);
nextBtn2.addEventListener("click", showNextImage);
grayscaleBtn.addEventListener('click', grayscale);
rotateBtn.addEventListener('click', rotateImage);

// Functions
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

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image-div');

    const currentImage = images[index];
    const brightness = brightnessSlider.value;
    const saturation = saturationSlider.value;

    currentImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%)`;

    brightnessValue.textContent = `${brightness}%`;
    saturationValue.textContent = `${saturation}%`;

    const imageNameElement = document.createElement('p');
    imageNameElement.textContent = `Image Name: ${currentImage.alt}`;

    imageDiv.appendChild(imageNameElement);
    imageDiv.appendChild(currentImage);

    imageContainer.appendChild(imageDiv);
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
    contrastSlider.value = recommendedContrast;

    brightnessValue.textContent = `${recommendedBrightness}%`;
    saturationValue.textContent = `${recommendedSaturation}%`;
    contrastValue.textContent = `${recommendedContrast}%`;

    const currentImage = images[currentIndex];
    currentImage.style.filter = `brightness(${recommendedBrightness}%) saturate(${recommendedSaturation}%) contrast(${recommendedContrast}%)`;
}

function resetAll() {
    const recommendedBrightness = 100;
    const recommendedSaturation = 100;
    const recommendedContrast = 100;

    applyRecommendation(recommendedBrightness, recommendedSaturation, recommendedContrast);
}

function toggleAdvanceFeatures() {
    var container1 = document.getElementById("container-1");
    var container2 = document.getElementById("container-2");

    if (!advanceFeaturesMode) {
        container1.style.display = "none";
        container2.style.display = "";
        container2.classList.add("container-2");
        advanceFeaturesMode = true;
    } else {
        container1.style.display = "";
        container2.style.display = "none";
        container2.classList.remove("container-2");
        advanceFeaturesMode = false;
    }
}

function grayscale() {
    const currentImage = images[currentIndex];
    const grayvalue = 100;
    currentImage.style.filter = `grayscale(${grayvalue}%)brightness(${brightnessSlider.value}%) saturate(${saturationSlider.value}%) contrast(${contrastSlider.value}%)`;
}

function rotateImage() {
    const currentImage = images[currentIndex];
    const rotateAngle = -45;

    const grayvalue = currentImage.style.grayscale || '';
    const currentTransform = currentImage.style.transform || '';

    currentImage.style.transform = `${currentTransform} rotate(${rotateAngle}deg)`;
    currentImage.style.filter = `grayscale(${grayvalue}%)brightness(${brightnessSlider.value}%) saturate(${saturationSlider.value}%) contrast(${contrastSlider.value}%)`;
}



function toggleMirrorImage() {
    const currentImage = images[currentIndex];

    const currentTransform = currentImage.style.transform || '';
    const grayvalue = currentImage.style.grayscale || '';

    if (currentTransform.includes('scaleX(-1)')) {
        
        currentImage.style.transform = currentTransform.replace('scaleX(-1)', '');
    } else {
        
        currentImage.style.transform = `${currentTransform} scaleX(-1)`;
    }

    currentImage.style.filter = `grayscale(${grayvalue}%) brightness(${brightnessSlider.value}%) saturate(${saturationSlider.value}%) contrast(${contrastSlider.value}%)`;
}

