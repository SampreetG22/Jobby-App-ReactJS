import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobListItem from '../JobListItem'
import EmploymentsList from '../EmploymentsList'
import SalariesList from '../SalariesList'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
    id: 0,
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
    id: 1,
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
    id: 2,
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
    id: 3,
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const employeeFilterIds = []

class Jobs extends Component {
  state = {
    profileDetails: {},
    searchValue: '',
    initialList: [],
    jobsList: [],
    employmentType: '',
    minimumPackage: '',
    apiStatus: '',
  }

  componentDidMount() {
    this.getJobsApi()
    this.profileDetails()
  }

  employmentFilter = id => {
    employeeFilterIds.push(id)
    employeeFilterIds.join(',')
    this.setState(
      {
        employmentType: employeeFilterIds.toString(),
      },
      this.getJobsApi,
    )
  }

  salaryFilter = id => {
    this.setState({minimumPackage: id}, this.getJobsApi)
  }

  searchValue = event => {
    this.setState({searchValue: event.target.value})
  }

  profileDetails = async () => {
    const jwtToken = Cookie.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseProfile = await fetch(url, options)
    const profileData = await responseProfile.json()
    this.setState({profileDetails: profileData.profile_details})
  }

  getJobsApi = async () => {
    const {employmentType, minimumPackage, searchValue} = this.state
    this.setState({apiStatus: 'loading'})
    const jwtToken = Cookie.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const jobsResponse = await fetch(jobsUrl, options)
    if (jobsResponse.ok === true) {
      const jobsListData = await jobsResponse.json()
      const newJobData = jobsListData.jobs.map(each => ({
        companyLogo: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        initialList: newJobData,
        jobsList: newJobData,
        apiStatus: 'success',
      })
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  renderNonLoadingView = () => {
    const {apiStatus} = this.state
    if (apiStatus === 'success') {
      return this.renderSuccessView()
    }
    return this.renderFailureView()
  }

  renderLoadingView = () => (
    <div className="loader-container noJobsContainer " data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length !== 0) {
      return this.renderJobsList()
    }
    return this.renderNoJobs()
  }

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

  renderNoJobs = () => (
    <div className="noJobsContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="noJobsImage"
        alt="no jobs"
      />
      <h2>No Jobs Found</h2>
      <p className="noJobsText">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsList = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobsListContainer">
        {jobsList.map(eachJob => (
          <JobListItem key={eachJob.id} details={eachJob} />
        ))}
      </ul>
    )
  }

  searchClicked = async () => {
    const {initialList} = await this.state
    await this.setState({jobsList: initialList})
    const {searchValue, jobsList} = await this.state
    const filteredJobs = await jobsList.filter(eachJob =>
      eachJob.title.toLowerCase().includes(searchValue.toLowerCase()),
    )
    await this.setState({jobsList: filteredJobs}, this.getJobsApi)
  }

  render() {
    const {profileDetails, searchValue, apiStatus, initialList} = this.state
    return (
      <div className="homeContainer bgContainer">
        <div className="jobsMainContainer">
          <Header />
          <div className="bottomPart">
            <div className="profileAndJobCategoryContainer">
              <div className="profileContainer">
                <img
                  src={profileDetails.profile_image_url}
                  className="profileCSS"
                  alt="profile"
                />
                <h1 className="profileName">{profileDetails.name}</h1>
                <p className="description">{profileDetails.short_bio}</p>
              </div>
              <hr className="lineCSS" />
              <h1 className="employmentTypes">Type of Employment</h1>
              <ul className="typesList">
                {employmentTypesList.map(each => (
                  <EmploymentsList
                    key={each.employmentTypeId}
                    details={each}
                    employmentFilter={this.employmentFilter}
                  />
                ))}
              </ul>
              <hr className="lineCSS" />
              <h1 className="employmentTypes">Salary Range</h1>
              <ul className="typesList">
                {salaryRangesList.map(eachSalary => (
                  <SalariesList
                    key={eachSalary.salaryRangeId}
                    details={eachSalary}
                    salaryFilter={this.salaryFilter}
                  />
                ))}
              </ul>
            </div>
            <div className="searchAndJobContainer">
              <div className="searchBoxAndImage">
                <input
                  type="search"
                  className="searchBoxCSS"
                  placeholder="Search"
                  value={searchValue}
                  onChange={this.searchValue}
                />
                <button
                  type="button"
                  className="searchBtn"
                  onClick={this.searchClicked}
                  data-testid="searchButton"
                >
                  <BsSearch className="searchIcon" />
                </button>
              </div>
              {apiStatus === 'loading'
                ? this.renderLoadingView()
                : this.renderNonLoadingView()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
