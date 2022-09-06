const SpecialButton = ({ image, info, Icon, click, className }) => {
	return (
   <>
     <div onClick={click} className={className}>
         {Icon && <Icon/>}
         {image && <img src={image} alt="" />}
         {info && <h6>{info}</h6>}
      </div>
   </>
 );
};

export default SpecialButton;