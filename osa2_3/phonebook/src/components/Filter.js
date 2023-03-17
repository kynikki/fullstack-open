
const Filter = (props) => {
    return (
      <div>
            filter shown with:
            <input 
              value={props.newFilter}
              onChange={props.handleFilterChange}/>
      </div>
    )
}
export default Filter
