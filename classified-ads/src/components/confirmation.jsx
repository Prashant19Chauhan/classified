import { useNavigate } from "react-router-dom"

function confirmation() {
    const navigate = useNavigate();

    const next = () => {
        navigate('/dashboard');
    }
  return (
    <div>
      payment confirmed
      <button onClick={next}>Next</button>
    </div>
  )
}

export default confirmation
