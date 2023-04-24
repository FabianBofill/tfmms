// Add disbled class to titleHeatmapContainer if there is no items
const titleHeatmapContainer = document.querySelector('.container-heatmap-list .title-h2');
const hasHeatmapItems = document.querySelectorAll('.container-no-heatmap-items').length;

if (hasHeatmapItems) {
    titleHeatmapContainer.classList.add("disabled");
}

// CreateHeatmap onclick listener
const buttonCreateHeatMap = document.querySelector('.button-create-heatmap');
const heatmapView = document.querySelector('.wrapper-heatmap-view');
const heatmapCreateView = document.querySelector('.wrapper-create-heatmap-view')

buttonCreateHeatMap.addEventListener('click', () => {
    // remove old animation classes
    document.querySelectorAll('.animation').forEach(el => {
        el.classList.remove('animation', 'fade-in', 'fade-out')
    });

    // Animation 
    heatmapView.classList.add('animation', 'fade-out');
    heatmapCreateView.classList.add('animation', 'fade-in');

    // display:block and display:none to containers
    setTimeout(() => {
        heatmapView.classList.add('hide');
        heatmapCreateView.classList.remove('hide');
    }, 400);
});