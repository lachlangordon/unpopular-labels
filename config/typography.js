import Typography from 'typography';

const typography = new Typography({
  title: 'MAAS',
  // baseFontSize: '18px',
  baseFontSize: 1.2,
  baseLineHeight: 1.45,
  includeNormalize: false,
  /* Use the system font stack as fallback */
  headerFontFamily: [
    'Circular',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
  bodyFontFamily: [
    'Circular',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
  scaleRatio: 2.441,
  headerWeight: 700,
  overrideStyles: () => ({
    img: {
      marginBottom: 0,
    },
  }),
});

export default typography;
