import {} from 'react-icons'

function header() {
  const islogin = true
  return (
    <div className="flex justify-between p-5 text-black">
      <div>
        <h1 className="text-2xl font-bold"><span>UC</span> Classified</h1>
      </div>
      <div>
        {
          islogin?
            <button>Profile</button> : 
            <button>Login</button>
        }
      </div>
    </div>
  )
}

export default header
