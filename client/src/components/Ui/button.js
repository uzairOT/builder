
import "../../App.css"

const YellowBtn = {
  backgroundColor: '#FFAC00',
  color: '#ffffff',
  border: 'none',
  padding: '0.9rem 2.5rem',
  fontSize: { lg: '1.25rem', md: "1.25rem", sm: "1.1rem", xs: "1rem" },
  borderRadius: { lg: '2.5rem', md: '2.5rem', sm: '2.5rem', xs: '0.5rem' },
  cursor: 'pointer',
  width: { lg: 'auto', md: 'auto', sm: 'auto', xs: '100%' },
  minWidth: "9.5rem",
  // maxWidth: "19.5rem",
  display: "flex",
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'none',
  gap: '0.625rem',
  '&:hover': {
    backgroundColor: '#FFAC00',
  },
  fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
  lineHeight: 'normal',

};

export default YellowBtn;