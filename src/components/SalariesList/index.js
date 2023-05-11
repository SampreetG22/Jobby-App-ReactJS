const SalariesList = props => {
  const {details, salaryFilter} = props
  const {salaryRangeId, label} = details
  const salaryChanged = () => {
    salaryFilter(salaryRangeId)
  }
  return (
    <li className="listElement" id={salaryRangeId}>
      <input
        type="radio"
        id={salaryRangeId}
        name="salary"
        value={salaryRangeId}
        onChange={salaryChanged}
      />
      <label htmlFor={salaryRangeId} className="labelCSS">
        {label}
      </label>
    </li>
  )
}
export default SalariesList
