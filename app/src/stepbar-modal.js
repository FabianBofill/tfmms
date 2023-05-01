// Close create heat modal
const stepbarClose = document.querySelector('.icon-close');
stepbarClose.addEventListener('click', () => {
    // remove old animation classes
    document.querySelectorAll('.animation').forEach(el => {
        el.classList.remove('animation', 'fade-in', 'fade-out')
    });

    // Animation 
    heatmapCreateView.classList.add('animation', 'fade-out');
    heatmapView.classList.add('animation', 'fade-in');

    // display:block and display:none to containers    
    setTimeout(() => {
        heatmapCreateView.classList.add('hide');
        heatmapView.classList.remove('hide');
    }, 400);
});

// Continue button
const nextStepButton = document.querySelector('.modal-footer-button');
nextStepButton.addEventListener('click', (e) => {
    e.preventDefault();
    const currentStepItem = document.querySelector('.step--current');

    let currentStep = parseInt(currentStepItem.getAttribute('attr-step-number'));
    let nextStep = currentStep + 1;
    const nextStepItem = document.querySelector('.step[attr-step-number="' + nextStep + '"]');

    if (nextStep === 2) {
        backStepButton.classList.remove('opacity-0');
        SERVICE_ENDPOINT = 'escenario/saveEscenario';
    } else if (nextStep === 4) {
        continueButton.classList.add('opacity-0');
    }

    nextStepItem.classList.add('step--current');
    currentStepItem.classList.remove('step--current');

    // Content
    const currentContent = document
        .querySelector('.container-stepbar-body[attr-content-number="' + currentStep + '"]');
    const nextContent = document
        .querySelector('.container-stepbar-body[attr-content-number="' + nextStep + '"]');

    currentContent.classList.add('hide');
    nextContent.classList.remove('hide');
    nextContent.classList.add('fade-in');
});

// Back button onclick
const backStepButton = document.querySelector('.back-wrapper');
const continueButton = document.querySelector('.continue-button');
backStepButton.addEventListener('click', (e) => {
    e.preventDefault();
    const currentStepItem = document.querySelector('.step--current');

    let currentStep = parseInt(currentStepItem.getAttribute('attr-step-number'));
    let prevtStep = currentStep - 1;
    const prevtStepItem = document.querySelector('.step[attr-step-number="' + prevtStep + '"]');

    if (prevtStep === 1) {
        backStepButton.classList.add('opacity-0');
    } else if (prevtStep === 2) {
        SERVICE_ENDPOINT = 'escenario/saveEscenario';
    } else if (prevtStep === 3) {
        continueButton.classList.remove('opacity-0');
    }

    prevtStepItem.classList.add('step--current');
    currentStepItem.classList.remove('step--current');

    // Content
    const currentContent = document
        .querySelector('.container-stepbar-body[attr-content-number="' + currentStep + '"]');
    const prevContent = document
        .querySelector('.container-stepbar-body[attr-content-number="' + prevtStep + '"]');

    currentContent.classList.add('hide');
    prevContent.classList.remove('hide');
    prevContent.classList.add('fade-in');
});