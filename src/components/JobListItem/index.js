import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation2} from 'react-icons/im'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobListItem = props => {
  const {details} = props
  const {
    companyLogo,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = details
  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="jobListElement">
        <div className="subContainer1">
          <img
            src={companyLogo}
            className="companyLogoCSS"
            alt="company logo"
          />
          <div className="titleAndRatingContainer">
            <h1 className="roleCSS">{title}</h1>
            <div className="ratingContainer">
              <AiFillStar className="starImage" />
              <p className="number">{rating}</p>
            </div>
          </div>
        </div>
        <div className="jobDetailsContainer">
          <ImLocation2 className="locationSymbol" />
          <p className="detailsText">{location}</p>
          <BsFillBriefcaseFill className="locationSymbol" />
          <p className="detailsText" style={{display: 'flex', flexGrow: '1'}}>
            {employmentType}
          </p>
          <p className="salaryText">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="descriptionTitle">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobListItem
