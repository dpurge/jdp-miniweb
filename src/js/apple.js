// https://dmitrybaranovskiy.github.io/raphael/reference.html
// https://www.papersizes.org/a-sizes-in-pixels.htm

// A4R canvas, 96 PPI
let canvasWidth = 1123;
let canvasHeight = 794;

// A5 paper, 96 PPI
let pageWidth = 559;
let pageHeight = 794;
let pageSeparator = 6;

// A6 paper, 96 PPI
let gridWidth = 397;
let gridHeight = 559;

// margins and grids
let marginTop = (pageHeight - gridHeight) / 3;
let marginBottom = marginTop * 2;
let marginInside = (pageWidth - gridWidth) / 3;
let marginOutside = marginInside * 2;
let gridSpacing = gridHeight / 14;

// colors
let strokeColor = "#000";
let fillColor = "#fff";

var paper = new Raphael(document.getElementById('canvas'), canvasWidth, canvasHeight);

var leftPage = paper.rect(0, 0, pageWidth, pageHeight, 10);
leftPage.attr("fill", fillColor);

var rightPage = paper.rect(pageWidth + pageSeparator, 0, pageWidth, pageHeight, 10);
rightPage.attr({stroke: strokeColor, fill: fillColor});

var apple = paper.image("img/apple.png", 0, 0, 900, 720);
apple.scale(.5,.5,0,0)
apple.translate(25, 130)

// grid lines
var leftGrid = paper.rect(marginOutside, marginTop, gridWidth, gridHeight, 10);
var rightGrid = paper.rect(pageWidth + pageSeparator + marginInside, marginTop, gridWidth, gridHeight, 10);
var line; var i;
i = marginTop + gridSpacing;
while (i < pageHeight - marginBottom) {
	line = paper.path( ["M", marginOutside, i, "L", pageWidth - marginInside , i ] );
	line = paper.path( ["M", pageWidth + pageSeparator + marginInside, i, "L", pageWidth * 2 + pageSeparator - marginOutside , i ] );
	i += gridSpacing;
};
i = marginOutside + gridSpacing;
while (i < pageWidth - marginInside) {
	var b = pageHeight - marginBottom;
	line = paper.path( ["M", i, marginTop, "L", i, b ] );
	var i2 = pageWidth * 2 - i + pageSeparator;
	line = paper.path( ["M", i2, marginTop, "L", i2, b ] );
	i += gridSpacing;
};
