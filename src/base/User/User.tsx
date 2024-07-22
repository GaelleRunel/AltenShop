const User = () => {

  return (
    <div className='d-flex justify-content-end p-2'>
      <div className="form-check form-switch me-3 pt-3">
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
      </div>
      <div className="d-inline me-3 pt-3">John Doe</div>
      <i className="bi bi-person-circle fs-2"></i>
    </div>
  )
}

export default User;