import React from 'react'
import './Widgets.css'
import logo from '../assets/image/linkedin-logo-blue.png'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordIcons  from '@mui/icons-material/FiberManualRecord';

const Widgets = () => {
  const swih = 'https://www.linkedin.com/jobs/?trk=li_FA_global_careers_jobsgtm_jsFA_v1&mcid=6899045044465016833'

  const newsArticle = (heading, subtitle) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
       <FiberManualRecordIcons />
      </div>
      <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
  return (
    <div className='widget'>
      <div className="widget__top">
        <div className="widget__header">
         <h2>LinkedIn News</h2>
         <InfoIcon />
        </div>
        {newsArticle("ReactJs", "Top news - 9099 readers")}
        {newsArticle("Introduction to Redux", "Top news - 9099 readers")}
        {newsArticle("Material UI Icons", "Top news - 9099 readers")}
        {newsArticle("NodeJs", "Top news - 9099 readers")}
        {newsArticle("Shell Scripting", "Top news - 9099 readers")}
        {/* <span className='span'></span>
        <span className='span1'></span>
        <span className='span2'></span> */}
       
      </div>
      <div className="widget__middle">
       <span className='span'></span>
        <span className='span1'></span>
        <span className='span2'></span>
       <img src={swih} alt="" />
      </div>
      <section className='widget__links'>
        <ul className='ul1'>
          <li>About</li>
          <li>Accessibility</li>
          <li>Help Center</li>
        </ul>

        <ul className='ul2'>
          <article>
            <li>Privacy & Terms<ExpandMoreIcon className='icon'/></li>
          </article>
          <li>Ad Choices</li>
        </ul>

        <ul className='ul3'>
          <li>Advertising</li>
          <article>
            <li>Business Services<ExpandMoreIcon className='icon'/></li>
          </article>
        </ul>

        <ul className='ul4'>
          <li>Get the LinkedIn App</li>
          <li>More</li>
        </ul>

      </section>

      <div className='widget__logoCon'>
        <img src={logo} alt="" />
        <h6>LinkedIn Corporation © 2022</h6>
      </div>
     </div>
  )
}

export default Widgets