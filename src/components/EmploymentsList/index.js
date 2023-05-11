import './index.css'

const EmploymentsList = props => {
  const {details, employmentFilter} = props
  const {employmentTypeId, label} = details
  const inputChanged = () => {
    employmentFilter(employmentTypeId)
  }
  return (
    <li className="listElement">
      <input type="checkBox" id={employmentTypeId} onClick={inputChanged} />
      <label htmlFor={employmentTypeId} className="labelCSS">
        {label}
      </label>
    </li>
  )
}
export default EmploymentsList
