import Typography from 'typography';

const options = {
  title: 'MAAS',
  // baseFontSize: '18px',
  baseFontSize: 1.2,
  baseLineHeight: 1.45,
  includeNormalize: false,
  /* Use the system font stack as fallback */
  headerFontFamily: [
    'Bebas-Neue',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
  bodyFontFamily: [
    'Circular-Pro-Book',
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
};

const typography = new Typography(options);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography;
export const scale = typography.scale;
export const rhythm = typography.rhythm;
