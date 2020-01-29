// <<<<<<< john
//adding the gradient background

var granimInstance = new Granim({
    element: '#canvas-basic',
    direction: 'left-right',
    // isPausedWhenNotInView: true,
    states: {
        "default-state": {
            gradients: [
                ['#E7BF2D', '#FFD848'],
                ['#FFF3C4', '#E7CA56'],
                ['#FECC08', '#E5BB16']
            ]
        }
    }
});