import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation2} from 'react-icons/im'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Cookie from 'js-cookie'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    skillsList: [],
    similarJobsList: [],
    inCompany: {},
    apistatus: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apistatus: 'loading'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookie.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const snakeCaseJobDetails = fetchedData.job_details
      console.log(snakeCaseJobDetails)
      const updatedData = {
        companyLogo: snakeCaseJobDetails.company_logo_url,
        companyWebsite: snakeCaseJobDetails.company_website_url,
        employmentType: snakeCaseJobDetails.employment_type,
        jobDescription: snakeCaseJobDetails.job_description,
        id: snakeCaseJobDetails.id,
        skills: snakeCaseJobDetails.skills,
        lifeAtCompany: snakeCaseJobDetails.life_at_company,
        similarJobs: fetchedData.similar_jobs,
        location: snakeCaseJobDetails.location,
        packagePerAnnum: snakeCaseJobDetails.package_per_annum,
        rating: snakeCaseJobDetails.rating,
        title: snakeCaseJobDetails.title,
      }
      const newSkills = updatedData.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))

      const lifeAtCompany = {
        imageUrl: updatedData.lifeAtCompany.image_url,
        description: updatedData.lifeAtCompany.description,
      }

      const simiJobs = updatedData.similarJobs.map(each => ({
        companyLogo: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobDetails: updatedData,
        skillsList: newSkills,
        inCompany: lifeAtCompany,
        similarJobsList: simiJobs,
        apistatus: 'success',
      })
    } else {
      this.setState({apistatus: 'failure'})
    }
  }

  renderSuccessView = () => {
    const {jobDetails, skillsList, inCompany, similarJobsList} = this.state
    const {
      companyLogo,
      companyWebsite,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
      packagePerAnnum,
    } = jobDetails
    const {imageUrl, description} = inCompany
    return (
      <div className="homeContainer bgContainer">
        <div className="jobsMainContainer">
          <Header />
          <div className="jobListElement1">
            <div className="subContainer1">
              <img
                src={companyLogo}
                className="companyLogoCSS"
                alt=" job details company logo"
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
              <p
                className="detailsText"
                style={{display: 'flex', flexGrow: '1'}}
              >
                {employmentType}
              </p>
              <p className="salaryText">{packagePerAnnum}</p>
            </div>
            <hr />
            <div className="descriptionAndWebsiteContainer">
              <h1 className="descriptionTitle" style={{fontSize: '28px'}}>
                Description
              </h1>
              <Link
                className="linkWeb"
                to={{pathname: `${companyWebsite}`}}
                target="_blank"
              >
                <div className="websiteContainer">
                  <p className="websiteText" style={{marginRight: '8px'}}>
                    Visit
                  </p>
                  <BiLinkExternal />
                </div>
              </Link>
            </div>
            <p
              className="description"
              style={{
                fontSize: '18px',
                lineHeight: '25px',
                color: 'whitesmoke',
                width: '100%',
              }}
            >
              {jobDescription}
            </p>
            <h1 className="descriptionTitle">Skills</h1>
            <ul className="skillsList">
              {skillsList.map(each => (
                <li className="skillElement" key={each.name}>
                  <img src={each.imageUrl} className="skillImage" alt="skill" />
                  <p className="skillName">{each.name}</p>
                </li>
              ))}
            </ul>
            <h1 className="descriptionTitle" style={{fontSize: '28px'}}>
              Life At Company
            </h1>
            <div className="lifeAtCompanyContainer">
              <p
                className="description"
                style={{
                  fontSize: '18px',
                  lineHeight: '25px',
                  color: 'whitesmoke',
                }}
              >
                {description}
              </p>
              <img
                src={imageUrl}
                className="companyImage"
                alt="life at company"
              />
            </div>
          </div>
          <div className="similarJobContainer">
            <h1 className="descriptionTitle" style={{fontSize: '28px'}}>
              Similar Jobs
            </h1>
            <ul className="similarJobListContainer">
              {similarJobsList.map(each => (
                <li className="similarJobElement jobListElement1" key={each.id}>
                  <div className="subContainer1">
                    <img
                      src={each.companyLogo}
                      className="companyLogoCSS"
                      alt="similar job company logo"
                    />
                    <div className="titleAndRatingContainer">
                      <h1 className="roleCSS">{each.title}</h1>
                      <div className="ratingContainer">
                        <AiFillStar className="starImage" />
                        <p className="number">{(each, rating)}</p>
                      </div>
                    </div>
                  </div>
                  <h1
                    className="descriptionTitle"
                    style={{fontSize: '20px', marginTop: '10px'}}
                  >
                    Description
                  </h1>
                  <p
                    className="description"
                    style={{
                      fontSize: '18px',
                      lineHeight: '30px',
                      color: 'whitesmoke',
                      width: '100%',
                    }}
                  >
                    {each.jobDescription}
                  </p>
                  <div className="jobDetailsContainer">
                    <ImLocation2 className="locationSymbol" />
                    <p className="detailsText">{each.location}</p>
                    <BsFillBriefcaseFill className="locationSymbol" />
                    <p
                      className="detailsText"
                      style={{display: 'flex', flexGrow: '1'}}
                    >
                      {each.employmentType}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="homeContainer bgContainer">
      <div className="jobsMainContainer">
        <Header />
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      </div>
    </div>
  )

  renderFailureView = () => (
    <div className="noJobsContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="noJobsImage"
        alt="failure view"
      />
      <h1 className="mainHeadFailure">Oops! Something Went Wrong.</h1>
      <p className="noJobsText">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="logout" type="button" onClick={this.getJobsApi}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apistatus} = this.state
    switch (apistatus) {
      case 'success':
        return this.renderSuccessView()
      case 'failure':
        return this.renderFailureView()
      case 'loading':
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default JobItemDetails
