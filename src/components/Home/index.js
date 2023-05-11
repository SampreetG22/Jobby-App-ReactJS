import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'

const Home = () => (
  <div className="homeContainer">
    <Header />
    <div className="homeContainer2">
      <h1 className="mainHead" style={{width: '50%', fontSize: '50px'}}>
        Find The Job That Fits Your Life
      </h1>
      <p
        className="mainPara"
        style={{
          width: '60%',
          fontSize: '17px',
          lineHeight: '27px',
          color: '#cbd5e1',
        }}
      >
        Millions of people are searching for jobs,salary, information and
        company reviews. Find the job that fits your ability and potential.
      </p>
      <Link to="/jobs" className="linkCSS">
        <button className="jobsBtn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
